var http = require('./request/request.js')
wx.http = http
//app.js
App({
  /**
  // 获取经纬度
  getlocation() {
    var _this = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        //console.log(!wx.getStorageSync('localPosition'))
        //if (!wx.getStorageSync('localPosition')) {
          _this.globalData.localPosition = res;
          wx.setStorageSync('localPosition', res)
        //}
        console.log(res)
        wx.http.postReq('appletClient?m=findAgentByUserXY', {
          longitude: _this.globalData.localPosition.longitude,
          latitude: _this.globalData.localPosition.latitude
        }, (data) => {
          _this.globalData.agentId = data.value && data.value.id
          wx.setStorageSync('agentId', data.value && data.value.id)
          //wx.setStorageSync('localPosition', res)
          //_this.globalData.localPosition = wx.getStorageSync('localPosition');
        })
      },
      fail(err) {
        wx.showToast({
          title: '授权失败',
          icon: 'none'
        })
      }
    })
  },
   */
  // 是否可以请求数据 需要获取用户地理位置
  isInit(cb){
    var _this = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        _this.globalData.localPosition = _this.globalData.localPosition || res;
        wx.http.postReq('appletClient?m=findAgentByUserXY', {
          longitude: _this.globalData.localPosition.longitude,
          latitude: _this.globalData.localPosition.latitude
        }, (data) => {
          //_this.globalData.userInfo = data.value && data.value.id 
          _this.globalData.agentId = data.value && data.value.id
          _this.globalData.phone = data.value && data.value.phone
          wx.setStorageSync('agentId', data.value && data.value.id)
          //if (!wx.getStorageSync('localPosition')) {
            _this.globalData.localPosition = res;
            //wx.setStorageSync('localPosition', res)
          //}
          //wx.setStorageSync('localPosition', res)
          //_this.globalData.localPosition = wx.getStorageSync('localPosition');
          //console.log(_this.globalData)
          cb && cb(res)
        })
      },
      fail(err) {
        wx.showToast({
          title: '授权失败',
          icon: 'none'
        })
      }
    })
  },
  isMobile(cb){ //是否绑定手机号
    let mobile = wx.getStorageSync('userInfo').mobile
    if (!mobile){
      wx.showToast({
        title: '没有绑定手机号，去绑定！',
        icon: 'none'
      })
      setTimeout(()=>{
        wx.navigateTo({
          url: '../bindPhone/bindPhone'
        });
      },500)
      return false;
    }else{
      cb();
    }
  },
  onLaunch: function () {
    this.isInit();
    //this.globalData.userInfo = wx.getStorageSync('userInfo');
    //this.globalData.localPosition = wx.getStorageSync('localPosition');
    this.globalData.userInfo = wx.getStorageSync('userInfo')
    //console.log(this.globalData.userInfo)
  },
  globalData: {
    localPosition: null,
    userInfo: wx.getStorageSync('userInfo') || null,
    isRed:false,
    cart:[],
  },
})