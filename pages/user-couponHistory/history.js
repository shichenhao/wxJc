// pages/user-couponHistory/history.js
var app = getApp();
var dataStr = require('../../utils/data.js')
Page({
  data: {
    list: [],
    page: {
      limit: 10,
      start: 0,
      isMore: true
    }
  },
  getList() {
    let page = this.data.page
    var params = {
      type: 0,
      businessType: 12,
      start: this.data.page.start,
      limit: this.data.page.limit
    };
    wx.http.postReq('appletClient?m=queryCouponsListPage', params, (data) => {
      if (data.success) {
        let list = this.data.list
        if (data.value.couponsList.length > 0) {
          list = [...list, ...data.value.couponsList]
        }
        if (data.value.couponsList.length >= this.data.page.limit) {
          page.start += 10;
          page.isMore = true;
        } else {
          page.isMore = false;
        }
        this.setData({
          list,
          page
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
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
    if (this.data.page.isMore) {
      this.getList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})