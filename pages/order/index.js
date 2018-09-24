var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info:[],
    status: {
      "-1": "已取消",
      "1": "待付款",
      "2": "待确认",
      "7": "已完成"
    },
    page: { //分页
      limit: 10,
      start: 0,
      isMore: true
    },
  },
  getList() {
    let page = this.data.page
    var params = {
      userId: app.globalData.userInfo.id,
      start: this.data.page.start,
      limit: this.data.page.limit
    };
    wx.http.postReq('appletClient?m=findBuildingMaterialsOrderList', params, (data) => {
      if (data.success) {
        let info = this.data.info
        if (data.value.length > 0) {
          info = [...info, ...data.value]
        }
        if (info.length >= this.data.page.limit) {
          page.start += 1;
          page.isMore = true;
        } else {
          page.isMore = false;
        }
        this.setData({
          info,
          page,
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
  goPay(e) { // 支付
    let record = e.currentTarget.dataset.record;
    app.globalData.orderDetail = record;
    wx.navigateTo({
      url: '../payment/payment',
    })
  },
  orderDetail(e){//查看详情
    wx.navigateTo({
      url: `../order-detail/detail?orderId=${e.currentTarget.dataset.orderid}`,
    })
  },
  goEvaluate(e) { // 评价
    let record = e.currentTarget.dataset.record;
    app.globalData.orderDetail = record;
    wx.navigateTo({
      url: '../evaluate/evaluate',
    })
  }
})