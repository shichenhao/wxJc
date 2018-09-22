var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info:null,
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
        var info = data.value;
        info = data.value;
        page.start = 0;
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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