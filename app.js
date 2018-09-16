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
  
  onLaunch: function () {
    this.getlocation();
    this.globalData.userInfo = wx.getStorageSync('userInfo');
    this.globalData.userInfo.agentId = 265
    this.globalData.localPosition = wx.getStorageSync('localPosition');
  },
  globalData: {
    localPosition: null,
    userInfo: null,
    isRed:false
  },
})