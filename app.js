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
        _this.globalData.localPosition = res;
      }
    })
  },
  onLaunch: function () {
    var _this = this;
    _this.getlocation();
    _this.globalData.userInfo = wx.getStorageSync('userInfo');
    
  },
  globalData: {
    localPosition: null,
    userInfo: null
  },
})