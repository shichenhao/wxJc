// pages/searchResult/searchResult.js
var { globalData } = getApp();
Page({
  data: {
    searchValue: '',
    list:[],
    page: { //分页
      limit: 10,
      start: 0,
      isMore: true
    },
  },
  searchValueInput(e) { //改变搜索框内容
    let value = e.detail.value;
    this.setData({
      searchValue: value,
    });
    this.search(value)
  },
  search(queryString) { // 搜索
    let page = this.data.page
    let param = {
      queryString,
      //agentId: globalData.userInfo.agentId,
      start: this.data.page.start,
      limit: this.data.page.limit
    }
    wx.http.postReq('appletClient?m=searchBuildingMaterialsMerchantList', param, (data) => {
      if (data.success) {
        let list = this.data.list;
        list = data.value;
        page.start = 0;
        if (list.length >= this.data.page.limit) {
          page.start += 1;
          page.isMore = true;
        } else {
          page.isMore = false;
        }
        this.setData({
          list,
          page,
        })
      }
    })
  },
  searchMore(queryString) {
    let page = this.data.page
    let param = {
      queryString,
      //agentId: globalData.userInfo.agentId,
      start: this.data.page.start,
      limit: this.data.page.limit
    }
    wx.http.postReq('appletClient?m=searchBuildingMaterialsMerchantList', param, (data) => {
      if (data.success) {
        let list = this.data.list
        if (data.value.length > 0) {
          list = [...list, ...data.value]
        }
        if (list.length >= this.data.page.limit) {
          page.start += 1;
          page.isMore = true;
        } else {
          page.isMore = false;
        }
        this.setData({
          list,
          page,
        })
      }
    })
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
    if (this.data.page.isMore) {
      this.searchMore(this.data.searchValue)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})