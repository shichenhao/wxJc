// pages/user/index.js
var app = getApp();
Page({
  data: {
    isLogin: app.globalData.userInfo.agentId,
    //红包弹窗
    redType:true,
    redInfo:{},
    //大牌
    major: [],
    //好货
    good: [],
  },
  //领取红包
  receiveRed(){
    var param = {
      businessType: 12,
      longitude: app.globalData.localPosition.longitude,
      latitude: app.globalData.localPosition.latitude
    }
    wx.http.postReq('userClient?m=getPlatformRedBag', param, (data) => {
      if (data.success) {
        this.setData({
          redInfo: data.value.redBagList || {}
        })
        this.closeRed();
      }
    })
  },
  //关闭红包弹窗
  closeRed(){
    this.setData({
      redType:false
    })
  },
  getInit(){
    var param = {
      agentId: app.globalData.userInfo.agentId,
      longitude: app.globalData.localPosition.longitude,
      latitude: app.globalData.localPosition.latitude
    }
    var params = {
      agentId: app.globalData.userInfo.agentId,
      start: 0,
      size: 6,
    }
    // 横屏推广
    /*
    wx.http.postReq('appletClient?m= findBuildingMaterialsLandscapePromotion', param, (data) => {
      if (data.success) {
      }
    })
    // 首页banner
    wx.http.postReq('appletClient?m = findBuildingMaterialsBannerList', params, (data) => {
      if (data.success) {
      }
    })
    */
    // 大牌推荐
    wx.http.postReq('appletClient?m=findBuildingMaterialsRecommendMerchantList', params, (data) => {
      if (data.success) {
        let major = data.value
        this.setData({
          major
        })
      }
    })
    // 好货推荐
    wx.http.postReq('appletClient?m=findBuildingMaterialsGoodGoodsRecommendList', params, (data) => {
      if (data.success) {
        let good = data.value
        this.setData({
          good
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInit();
    if (app.globalData.isRed){
      this.receiveRed();
    }else{
      this.closeRed();
    }
    
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