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

})