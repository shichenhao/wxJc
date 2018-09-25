// pages/evaluateList/evaluateList.js
var { globalData } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dataList: globalData.orderDetail.buildingMaterialsOrderItemList
    })
  },
  initData(){

  }
})