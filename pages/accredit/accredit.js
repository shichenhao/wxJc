// pages/accredit/accredit.js
var app = getApp();
Page({
  login(e) {
    if (e.detail.errMsg === "getUserInfo:ok") {
      wx.login({ //登录
        success: ress => {
          var key = null
          wx.http.postReq('appletClient?m=appletLoginBefore', { code: ress.code }, (getKey) => { // 获取key
            if (getKey.success) {
              key = getKey.value.key;
              app.globalData.openId = key;
              var params = {
                encryptedData: e.detail.encryptedData,
                iv: e.detail.iv,
                key,
                code: key,
                longitude: app.globalData.localPosition.longitude,
                latitude: app.globalData.localPosition.latitude
              };
              wx.setStorageSync('wxInfo', e.detail.userInfo)
              //console.log(e.detail.userInfo)
              // 存储code
              wx.setStorageSync('code', ress.code)
              wx.http.postReq('appletClient?m=appletLogin', params, (data) => {
                //console.log(data)
                wx.switchTab({
                  url: '../index/index',
                });
                if (data.success) {
                  /**
                   *
                  wx.navigateBack({
                    delta: 2
                  })
                   */
                  /*wx.redirectTo({
                    url: '/pages/user/index'
                  })*/
                  // 存储登录信息
                  app.globalData.userInfo = data.value
                  wx.setStorageSync('userInfo', data.value)
                  app.globalData.userInfo = wx.getStorageSync("userInfo")
                  wx.setStorageSync('token', data.value.token)
                }
              })
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
          })
        }
      })
    } else {
      wx.showModal({
        title: '授权失败',
        showCancel: false
      })
    }
    return false
    // 登录
  },
  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '马管家建材',
      path: '/pages/accredit/accredit'
    }
  }
})