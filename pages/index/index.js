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
    // 分类馆
    list: [],
    // banner
    banner: [],
    // banner
    hotList: [],
    mapXY: '选择位置'
  },
  // 选择位置
  getMap() {
    var _this = this
    wx.chooseLocation({
      success(res) {
        console.log(res)
        _this.setData({
          mapXY: res.name
        })
        app.globalData.localPosition=res
      }
    })
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

    wx.checkSession({
      success(res) {
        console.log(res)
      }
    })
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
    wx.http.postReq('appletClient?m=findBuildingMaterialsLandscapePromotion', param, (data) => {
      if (data.success) {
      }
    })
    // 首页banner
    wx.http.postReq('appletClient?m=findBuildingMaterialsBannerList', params, (data) => {
      if (data.success) {
        let banner = data.value
        this.setData({
          banner
        })
        console.log(banner)
      }
    })
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
    // 分类馆推荐
    wx.http.postReq('appletClient?m=findBuildingMaterialsRecommendCategoryList', params, (data) => {
      if (data.success) {
        var list = data.value
        this.setData({
          list
        })
      }
    })
    // 热销商品
    wx.http.postReq('appletClient?m=findBuildingMaterialsSalesGoodsList', param, (data) => {
      if (data.success) {
        var hotList = data.value
        this.setData({
          hotList
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