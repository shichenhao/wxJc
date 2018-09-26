// pages/couplet/couplet.js
let WxParse = require('../../wxParse/wxParse.js');
let { globalData } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null
  },
  getInit() {
    wx.http.postReq('appletClient?m=findBuildingMaterialsKuponoActivityByAgentId', {
      agentId: globalData.agentId
    }, (data) => {
      if (data.success) {
        let info = data.value
        this.setData({
          info: data.value
        })
        WxParse.wxParse('info', 'html', info.content, this, 5);
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