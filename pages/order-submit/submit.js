// pages/order-submit/submit.js
var { globalData } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shipmentType:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ merchantId: options.merchantId});
    this.initData();
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
  initData(){
    let { merchantId, shipmentType}=this.data;
    let params={
      agentId: global.userInfo.agentId,
      userId :global.userInfo.userId,
      merchantId,
      shipmentType,
    }
    wx.http.postReq('appletClient?m=buildingMaterialsOrderServicePreview', params, (res) => {
      let { success, value } = res;
      if (success) {
        console.log(value);
      }
    })
  }
})