// pages/user/index.js
var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var app = getApp();
Page({
  data: {
    isLogin: app.globalData.agentId,
    //红包弹窗
    redType:false,
    redInfo:{},
    //大牌
    major: [],
    //好货
    good: [],
    // 分类馆
    list: [],
    // banner
    banner: [],
    // 横屏广告
    promotion: null,
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    // 热销
    hotList: [],
    mapXY: '选择位置',
  },
  // 选择位置
  getMap() {
    wx.navigateTo({
      url: '/pages/searchAddress/address',
    })
    /**
    var _this = this
    wx.chooseLocation({
      success(res) {
        console.log(res)
        _this.setData({
          mapXY: res.name
        })
        app.globalData.localPosition=res
      }
    }) */
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
    this.setData({
      redType:true
    })
    var param = {
      agentId: app.globalData.agentId,
      longitude: app.globalData.localPosition.longitude,
      latitude: app.globalData.localPosition.latitude
    }
    var params = {
      agentId: app.globalData.agentId,
      start: 0,
      size: 6,
    }
    // 横屏推广
    wx.http.postReq('appletClient?m=findBuildingMaterialsLandscapePromotion', param, (data) => {
      if (data.success) {
        let promotion = data.value
        this.setData({
          promotion
        })
      }
    })
    // 首页banner
    wx.http.postReq('appletClient?m=findBuildingMaterialsBannerList', params, (data) => {
      if (data.success) {
        let banner = data.value
        this.setData({
          banner
        })
        //console.log(banner)
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
  getAds(){
    let mapXY = null
    qqmapsdk = new QQMapWX({
      key: 'R6XBZ-7B5AJ-YROFI-FVQII-DUY35-DEF5X'
    });
    qqmapsdk.reverseGeocoder({
      location: {
        longitude: app.globalData.localPosition.longitude,
        latitude: app.globalData.localPosition.latitude
      },
      success: (res) => {
        if (!app.globalData.addressSel){
          mapXY = res.result.formatted_addresses.recommend
        }else{
          mapXY = app.globalData.addressSel.title
        }
        this.setData({
          mapXY
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.isInit(()=>{
      if (app.globalData.localPosition){
        this.getInit();
        if (app.globalData.isRed) {
          this.receiveRed();
        } else {
          this.closeRed();
        }
      }
    })
    this.getAds()
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
    console.log(1)
    this.getInit();
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