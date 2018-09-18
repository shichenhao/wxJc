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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo)
    var params = {
      userId: app.globalData.userInfo.id,
      start: 0,
      size: 10
    };
    wx.http.postReq('appletClient?m=findBuildingMaterialsOrderList', params, (data) => {
      if (data.success) {
        var info = data.value;
        this.setData({
          info
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我的订单'
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})