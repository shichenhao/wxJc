// pages/sellerHome/sellerHome.js
Page({
  data: {
    sellerInfo:false,
    info:{}
  },
  getInit(merchantId) {
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
    console.log(options)
    this.getInit(options.id)
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