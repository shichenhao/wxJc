var http = require('./request/request.js')
wx.http = http
//app.js
App({
  // 获取经纬度
  getlocation() {
    var _this = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        wx.setStorageSync('localPosition', res)
        _this.globalData.localPosition = res;
      }
    })
  },
  // 是否可以请求数据
  isInit(cb){
    var _this = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        _this.globalData.localPosition = res;
        cb && cb()
      }
    })
  },
  onLaunch: function () {
    this.getlocation();
    //this.globalData.userInfo = wx.getStorageSync('userInfo');
    //this.globalData.localPosition = wx.getStorageSync('localPosition');
    
    if (this.globalData.userInfo === null){
      this.globalData.userInfo = { agentId: 265 }
    }else{
      this.globalData.userInfo.agentId = 265
    }
    //console.log(this.globalData)
  },
  globalData: {
    localPosition: null,
    userInfo: null,
    isRed:false
  },
})