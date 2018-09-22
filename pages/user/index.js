// pages/user/index.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },
  tel(e) { //打电话
    wx.makePhoneCall({
      phoneNumber: '400-4000-400',
      success() {
      },
      fail() {
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let userInfo = wx.getStorageSync('wxInfo')
    if(!userInfo){
      wx.navigateTo({
        url: '../user-login/index'
      });
      return false
    }
    this.setData({
      userInfo
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
    let userInfo = wx.getStorageSync('wxInfo')
    this.setData({
      userInfo
    })
  
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