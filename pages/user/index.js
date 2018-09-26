// pages/user/index.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    couponsCount: 0,
    platformRedBagCount: 0,
    userInfo: null,
    phone: null
  },
  tel(e) { //打电话
    let phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
      success() {
      },
      fail() {
      }
    })
  },
  getCoupon() {
    let param = {
      isDisabled: 0,
      businessType: 12,
      start: 0,
      size: 10,
    }
    wx.http.postReq('appletClient?m=queryCouponsListPage', param, (data) => {
      if (data.success) {
        this.setData({
          couponsCount: data.value.couponsCount
        })
      }
    }, true)
  },
  getCollec() {
    var param = {
      start: 0,
      size: 10,
      merchantType: 6
    }
    wx.http.postReq('userClient?m=queryRedBagList', param, (data) => {
      if (data.success) {
        this.setData({
          platformRedBagCount: data.value.platformRedBagCount
        })
      }
    })
  },
  getPhoneNumber(e) {
    let params = {
      userId: app.globalData.userInfo.id,
      mobile: 15111111111
    }

    wx.http.postReq('appletClient?m=bindingMobile', params, (res) => {
      let { success, value } = res;
      if (success) {
        wx.setStorageSync('token', value.token)
        app.globalData.token = value.token
      } 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCoupon();
    this.getCollec();
    let _this = this
    let userInfo = wx.getStorageSync('wxInfo')
    userInfo.balance = wx.getStorageSync('userInfo').balance
    userInfo.mobile = wx.getStorageSync('userInfo').mobile
    //userInfo.redBagCount = wx.getStorageSync('userInfo').redBagCount
    //userInfo.couponsCount = wx.getStorageSync('userInfo').couponsCount
    this.setData({
      userInfo
    })
    if (!userInfo) {
      wx.navigateTo({
        url: '../user-login/index'
      });
      return false
    }
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
    userInfo.balance = wx.getStorageSync('userInfo').balance
    userInfo.redBagCount = wx.getStorageSync('userInfo').redBagCount
    userInfo.couponsCount = wx.getStorageSync('userInfo').couponsCount
    userInfo.mobile = wx.getStorageSync('userInfo').mobile
    this.setData({
      userInfo,
      phone: app.globalData.phone
    }) 
    this.getCoupon();
    this.getCollec();
  
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