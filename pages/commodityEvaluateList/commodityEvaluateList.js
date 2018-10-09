// pages/commodityEvaluateList/commodityEvaluateList.js
var { globalData } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page: {
      limit: 10,
      start: 0,
      isMore: true
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ goodsScore: options.goodsScore, merchantId: options.merchantId, goodsId:options.goodsId})
    this.getData(options.merchantId, options.goodsId);
  },
  getData(merchantId, goodsId){
    let { page}=this.data;
    var params = {
      start:page.start,
      limit: page.limit,
      merchantId: merchantId || this.data.merchantId,
      goodsId: goodsId || this.data.goodsId,
    };
    wx.http.postReq('appletClient?m=findBuildingMaterialsGoodsCommentsList', params, (data) => {
      let { success, value } = data;
      if (success) {
        let list = this.data.list
        if (data.value.length > 0) {
          list = [...list, ...data.value]
        }
        if (data.value.length >= this.data.page.limit) {
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.page.isMore) {
      this.getData(this.data.merchantId, this.data.goodsId)
    }
  },
})