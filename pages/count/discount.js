// pages/discount/discount.js
let { globalData } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null
  },
  getInit(){
    let param = {
      businessType: 12,
      agentId: globalData.agentId || 1
    }
    wx.http.postReq('appletClient?m=findCouponsAllByBusinessType', param, (data) => {
      if (data.success) {
        var list = data.value;
        this.setData({
          list
        })
      }
    })
  },
  receive(e) { //领取
    let couponsRulesId = e.currentTarget.dataset.id;
    wx.http.postReq('/appletClient?m=getCouponsGetRecord', { couponsRulesId }, (data) => {
      if (data.success) {
        wx.showToast({
          title: '领取成功',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInit();
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