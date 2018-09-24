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
    let params={
      merchantId: options.merchantId,
      goodsId: options.goodsId,
    };
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
    wx.http.postReq('appletClient?m=findBuildingMaterialsGoodsCommentsList', params, (res) => {
      let { success, value } = res;
      if (success) {
        let list = this.data.list
        if (data.value.couponsList.length > 0) {
          list = [...list, ...data.value.couponsList]
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
  }
})