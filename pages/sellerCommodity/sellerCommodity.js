// pages/sellerCommodity/sellerCommodity.js
Page({
  data: {
    sellerInfo: false,
    info: {}, //信息
    list: [], //数据
    page: { //分页
      limit: 10,
      start: 0,
      isMore: true
    },
    queryType: 0, //0：全部商品，1：促销商品，2：上新商品
    sortType: 0, // 0, "默认升" ，1, "默认降" ，2, "销量升" ，3, "销量降"，4, "价格升"，5, "价格降"
  },
  getInit(merchantId = '834') { //商家信息
    var param = {
      merchantId
    }
    wx.http.postReq('appletClient?m=findClientMerchantHome', param, (data) => {
      if (data.success) {
        var info = data.value;
        console.log(data)
        this.setData({
          info
        })
      }
    })
  },
  getList(merchantId = '834', queryType = 0, sortType = 0) { //商家列表
    let page = this.data.page
    let param = {
      merchantId,
      queryType,
      sortType,
      start: this.data.page.start,
      limit: this.data.page.limit
    }
    wx.http.postReq('appletClient?m=searchBuildingMaterialsGoodsList', param, (data) => {
      if (data.success) {
        let list = this.data.list
        if (data.value.length > 0) {
          list = [...list,...data.value]
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
          queryType,
          sortType,
        })
        console.log(list)
      }
    })
  },
  queryTypeList(e) { // 通过类型查商品
    let queryType = e.currentTarget.dataset.type-0;
    let page = {
      limit: 10,
      start: 0,
      isMore: true
    }
    this.setData({
      page,
    })
    this.getList(this.data.info.id, queryType, 0)
  },
  sortTypeList(e) { // 通过排序查商品
    let sortType = e.currentTarget.dataset.type-0;
    let page = {
      limit: 10,
      start: 0,
      isMore: true
    }
    this.setData({
      page,
    })
    this.getList(this.data.info.id, this.data.queryType, sortType)
  },
  // 收藏
  collection() {
    var param = {
      merchantId: this.data.info.id,
      merchantType: 6
    }
    wx.http.postReq('userClient?m=createUserFavorites', param, (data) => {
      if (data.success) {
        /**
         *
        this.info.collectionNum + 1
        var info = this.info;
        this.setData({
          info
        })
         */
        wx.showToast({
          title: '收藏成功！',
          icon: 'none'
        })
      }
    })

  },
  seeSellerInfo: function () {
    this.setData({ sellerInfo: !this.data.sellerInfo });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInit(options.id)
    this.getList(options.id, options.queryType)
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