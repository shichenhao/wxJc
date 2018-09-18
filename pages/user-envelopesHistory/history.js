var app = getApp();
// pages/user-envelopes/envelopes.js
Page({
  data: {
    list: [],
    page: {
      limit: 10,
      start: 0,
      isMore: true
    }
  },
  getList() { //查询红包
    let page = this.data.page
    var params = {
      isDisabled: 1,
      businessType: 12,
      start: this.data.page.start,
      limit: this.data.page.limit
    };
    wx.http.postReq('appletClient?m=queryRedBagList', params, (data) => {
      if (data.success) {
        let list = this.data.list
        if (data.value.platformRedBagList.length > 0) {
          list = [...list, ...data.value.platformRedBagList]
        }
        if (list.length >= this.data.page.limit) {
          page.start += 1;
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
    wx.setNavigationBarTitle({
      title: '我的红包'
    })

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
    console.log(1)
    console.log(this.data.page.isMore)
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