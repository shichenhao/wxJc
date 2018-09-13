// pages/user-login/index.js
var app = getApp();
Page({
  login() {
    // 登录
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              wx.login({
                success: ress => {
                  var params = {
                    ...res,
                    code: ress.code,
                    longitude: app.globalData.localPosition.longitude,
                    latitude: app.globalData.localPosition.latitude
                  };
                  //console.log(ress)
                  // 存储code
                  wx.setStorageSync('code', ress.code)
                  wx.http.postReq('appletClient?m=appletLogin', params, (data) => {
                    if (data.success) {
                      wx.redirectTo({
                        url: '/pages/user/index'
                      })
                      // 存储登录信息
                      app.globalData.userInfo = data.value
                      wx.setStorageSync('userInfo', data.value)
                      wx.setStorageSync('token', data.token)
                    }
                  })
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                }
              })
              

            }
          })
        }
      }
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '登录注册'
    })
    // 登录过则跳转到用户中心
    wx.login({
      success: res => {
        if (res.code) {
          wx.redirectTo({
            url: '/pages/user/index'
          })
        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})