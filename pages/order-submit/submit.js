// pages/order-submit/submit.js
var { globalData } = getApp();
let Pingpp=require('../../request/pingpp.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData:null,
    shipmentType:1,
    chooseSort:null,
    isCashCoupon:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ merchantId: options.merchantId});
    this.initData();
    this.getAddress();
  },
  getAddress() {
    if (globalData.addressData){
      this.setData({ addressData: globalData.addressData});
    }else{
      wx.http.postReq('appletClient?m=findUserAddress', {}, (res) => {
        let { success, value } = res;
        if (success) {
          this.setData({
            addressData: value[0]
          })
        } else {
          wx.showToast({
            title: '出错了,请联系管理员',
          })
        }
      })
    }
  },

  initData(){
    let { merchantId, shipmentType}=this.data;
    let params={
      agentId: globalData.userInfo.agentId,
      userId: globalData.userInfo.id,
      merchantId,
      shipmentType,
      latitude: globalData.localPosition.latitude,
      longitude: globalData.localPosition.longitude,
      orderItems: JSON.stringify(globalData.selectCommodity)
    }
    wx.http.postReq('appletClient?m=buildingMaterialsOrderServicePreview', params, (res) => {
      let { success, value } = res;
      if (success) {
        console.log(value);
        this.setData({ orderItems:value});
      }
    })
  },
  changeType(e){
    let id=e.currentTarget.dataset.id;
    this.setData({ shipmentType:id});
  },
  orderSubmit(){
    let { merchantId, shipmentType, addressData, orderItems} = this.data;
    let params = {
      agentId: globalData.agentId,
      userId: globalData.userInfo.id,
      merchantId,
      shipmentType,
      latitude: globalData.localPosition.latitude,
      longitude: globalData.localPosition.longitude,
      orderItems: JSON.stringify([globalData.selectCommodity]),
      userAddressId: addressData.id,
      orderItems: JSON.stringify([orderItems]) ,
      goodsId: globalData.selectCommodity[0].goodsId,
      goodsModelId: globalData.selectCommodity[0].goodsModelId,
      quantity:2,
      price:0.01
    }
    wx.http.postReq('appletClient?m=buildingMaterialsOrderServiceSubmit', params, (res) => {
      let { success, value } = res;
      if (success) {
        console.log(value);
      }
    })
  },
  changeAddress(){
    globalData.orderBackUrl = `/${this.route}?merchantId=${this.data.merchantId}`;
    wx.navigateTo({
      url: `../user-address/address`,
    })
  },
  cashCoupon(){
    let { merchantId, shipmentType } = this.data;
    let params = {
      agentId: globalData.agentId,
      userId: globalData.userInfo.id,
      merchantId,
      businessType:12
    }
    wx.http.postReq('appletClient?m=queryCouponsList', params, (res) => {
      let { success, value } = res;
      if (success) {
        this.setData({
          isCashCoupon: true,
          cashCouponData:value
         });
      }
    })
  },
  noCashCoupon(){
    this.setData({
      isCashCoupon: false,
    });
  }
})