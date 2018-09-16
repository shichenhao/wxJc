// pages/classify/classify.js
var app = getApp();
Page({
  data: {
    leftData: [
      { name: '汽车', id: 4 },
    ],
    rightData:[
      { url: '../../lib/images/brandDefault.png',id:1},
    ],
    classify: [
      { url: '../../lib/images/commodityDefault.png', name: "1", id: 1 }
    ]
  },
  getList() {
    var param = {
      agentId: app.globalData.userInfo.agentId,
      parentId: 0,
      longitude: app.globalData.localPosition.longitude,
      latitude: app.globalData.localPosition.latitude
    }
    wx.http.postReq('appletClient?m=findUserClassification', param, (res) => {
      if (res.success) {
        var leftData = res.value.oneCategoryList;
        var classify = res.value.twoCategoryList;
        var rightData = res.value.merchantList;
        this.setData({
          leftData,
          classify,
          rightData,
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})