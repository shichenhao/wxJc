// pages/user-login/index.js
var app = getApp();
Page({
  login(e) {
    if (e.detail.errMsg === "getUserInfo:ok"){
      wx.login({
        success: ress => {
          console.log(e.detail,ress)
          var params = {
            ...e.datail,
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            code: ress.code,
            longitude: app.globalData.localPosition.longitude,
            latitude: app.globalData.localPosition.latitude
          };
          //console.log(ress)
          // 存储code
          wx.setStorageSync('code', ress.code)
          wx.http.postReq('appletClient?m=appletLogin', params, (data) => {
            if (data.success) {

              wx.navigateBack({
                delta:2
              })
              /*wx.redirectTo({
                url: '/pages/user/index'
              })*/
              // 存储登录信息
              app.globalData.userInfo = data.value
              wx.setStorageSync('userInfo', data.value)
              wx.setStorageSync('token', data.value.token)
            }
          })
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
    }else{
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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