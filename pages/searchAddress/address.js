// pages/searchAddress/address.js
var QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'R6XBZ-7B5AJ-YROFI-FVQII-DUY35-DEF5X'
});
var { globalData } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    list: [],
    dataList: [],
    items: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    this.getItemAddress();
  },
  getData() {
    wx.http.postReq('appletClient?m=findUserAddress', {}, (res) => {
      let { success, value } = res;
      if (success) {
        this.setData({
          dataList: value
        })
      }
    })
  },
  searchValueInput(e) { //改变搜索框内容
    let value = e.detail.value;
    this.setData({
      searchValue: value,
    });
    this.search(value)
  },
  search(queryString) { // 搜索
    wx.showLoading({
      title: '加载中',
    })
    let _this = this;
    qqmapsdk.getSuggestion({
      keyword: queryString,
      success: function (res) {
        _this.setData({
          list: res.data
        })
      },
      complete: function (res) {
        wx.hideLoading();
      }
    })
  },
  getItemAddress() { //查询当前位置
    let _this = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        wx.showLoading({
          title: '加载中',
        })
        qqmapsdk.reverseGeocoder({
          location: {
            longitude: res.longitude,
            latitude: res.latitude
          },
          success: function (res) {
            _this.setData({
              items:{
                location: res.result.location,
                title: res.result.formatted_addresses.recommend
              },
              itemAddress: res.result.formatted_addresses.recommend
            })
          },
          complete: function (res) {
            wx.hideLoading();
          }
        });
      }
    })
  },
  getAds(e){ // 获取位置传递到全局
    let item = e.currentTarget.dataset.item;
    let localPosition = wx.getStorageSync('localPosition')
    globalData.localPosition.longitude = item.location.lng
    globalData.localPosition.latitude = item.location.lat
    localPosition.longitude = item.location.lng;
    localPosition.latitude = item.location.lat;
    wx.setStorageSync('localPosition', localPosition)
    globalData.addressSel = item
    wx.switchTab({
      url: '../index/index',
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      }
    });
  }
})