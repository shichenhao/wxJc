// pages/order-submit/submit.js
var { globalData } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMap:true,
    isShow:"1,3",
    latitude: 23.099994,
    longitude: 113.324520,
    markers: [{
      latitude: 23.099994,
      longitude: 113.324520,
      name: 'T.I.T 创意园'
    }],
    addressData:null,
    shipmentType:1,
    chooseSort:null,
    isCashCoupon:false,
    isRedPacket:false,
    promotionCouponsId:null,
    promotionCouponsData:null,
    cashCouponData:[],
    redBagJson: null,
    isRedNone: true, //默认勾选 不使用红包
    isCouNone: true, //默认勾选 不使用优惠券
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mapCtx = wx.createMapContext('myMap')
    this.setData({ merchantId: options.merchantId});
    this.getAddress();
    this.initData();
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
    let { 
      merchantId, shipmentType, addressData,
      promotionCouponsData, orderItems, redBagJson, chooseSort
      }=this.data;
    let orderItemsReq={};
    if (orderItems){
      orderItemsReq = {...orderItems};
    }
    orderItemsReq.goodsId= globalData.selectCommodity[0].goodsId,
    orderItemsReq.goodsModelId = globalData.selectCommodity[0].goodsModelId,
    orderItemsReq.quantity = globalData.selectCommodity[0].quantity,
    orderItemsReq.price = globalData.selectCommodity[0].price
    let params={
      agentId: globalData.agentId,
      userId: globalData.userInfo.id,
      merchantId,
      chooseSort: redBagJson && promotionCouponsData ? chooseSort : 0,
      shipmentType: globalData.receivingWayValue || 1,
      latitude: globalData.localPosition.latitude,
      longitude: globalData.localPosition.longitude,
      orderItems: JSON.stringify(globalData.selectCommodity),
      userAddressId: addressData && addressData.id,
      //orderItems: JSON.stringify([orderItemsReq]),
      redBagJson: !redBagJson ? null : JSON.stringify([redBagJson]),
      promotionCouponsId: !promotionCouponsData ? null : promotionCouponsData.id,
    }
    wx.http.postReq('appletClient?m=buildingMaterialsOrderServicePreview', params, (res) => {
      let { success, value } = res;
      if (success) {
        let isShow = value.buildingMaterialsMerchant.receivingWayValue
        let shipmentType = this.data.shipmentType
        if (isShow == 1) {
          isShow = 1
        }else if (isShow == 3) {
          isShow = 3
          shipmentType = 3
        }else{
          isShow = '1,3'
        }
        let markers = this.data.markers
        markers[0].latitude = value.buildingMaterialsMerchant.latitude
        markers[0].longitude = value.buildingMaterialsMerchant.longitude
        markers[0].name = value.buildingMaterialsMerchant.name
        this.setData({
          isShow,
          shipmentType,
          orderItems: value,
          latitude: value.buildingMaterialsMerchant.latitude,
          longitude: value.buildingMaterialsMerchant.longitude,
          markers
        });
      } else {
        wx.showToast({
          title: value,
          icon: 'none'
        })
        if (chooseSort == 1) {
          this.setData({
            promotionCouponsData: null
          })
        }
        if (chooseSort == 2) {
          this.setData({
            redBagJson: null
          })
        }
      }
    })
  },
  changeType(e){
    let id=e.currentTarget.dataset.id;
    this.setData({ shipmentType:id});
  },
  orderSubmit(){
    let { 
        merchantId, shipmentType, addressData, promotionCouponsData, orderItems, redBagJson
      } = this.data;
    let orderItemsReq={
      ...orderItems,
      goodsId: globalData.selectCommodity[0].goodsId,
      goodsModelId: globalData.selectCommodity[0].goodsModelId,
      quantity: globalData.selectCommodity[0].quantity,
      price: globalData.selectCommodity[0].price
    }
    let params = {
      agentId: globalData.agentId,
      userId: globalData.userInfo.id,
      merchantId,
      shipmentType,
      latitude: globalData.localPosition.latitude,
      longitude: globalData.localPosition.longitude,
      userAddressId: addressData.id,
      orderItems: JSON.stringify(globalData.selectCommodity),
      //orderItems: JSON.stringify(orderItemsReq),
      redBagJson: !redBagJson?null:JSON.stringify([redBagJson]),
      promotionCouponsId: !promotionCouponsData?null:promotionCouponsData.id,
    }
    wx.http.postReq('appletClient?m=buildingMaterialsOrderServiceSubmit', params, (res) => {
      let { success, value } = res;
      if (success) {
        globalData.orderDetail = value;
        wx.navigateTo({
          url: '../payment/payment',
        })
      } 
    })
  },
  changeAddress(){
    globalData.orderBackUrl = `/${this.route}?merchantId=${this.data.merchantId}`;
    wx.navigateTo({
      url: `../user-address/address`,
    })
  },
  seeRedPacket(){
    let { merchantId, shipmentType, addressData } = this.data;
    let params = {
      agentId: globalData.agentId,
      businessType: 12,
      latitude: globalData.localPosition.latitude,
      longitude: globalData.localPosition.longitude,
      userAddressId: addressData.id,
      itemsPrice: globalData.selectCommodity[0].price,
      merchantId
    }
    wx.http.postReq('userClient?m=queryPlatformRedBagList', params, (res) => {
      let { success, value } = res;
      if (success) {
        this.setData({
          isMap:false,
          isRedPacket: true,
          redPacketData: value
        });
      }
    })
  },
  getRedPacket(e){
    this.setData({
      isMap: true,
      isRedPacket: false,
      redBagJson: e.currentTarget.dataset.record,
      chooseSort: !this.data.chooseSort ? 1 : 2
    },()=>{
      this.initData();
    })
  },
  seeCashCoupon(){
    let { merchantId, shipmentType } = this.data;
    let params = {
      agentId: globalData.agentId,
      userId: globalData.userInfo.id,
      merchantId,
      businessType:12,
      totalPrice: globalData.selectCommodity[0].price,
    }
    wx.http.postReq('appletClient?m=queryCouponsList', params, (res) => {
      let { success, value } = res;
      if (success) {
        this.setData({
          isMap: false,
          isCashCoupon: true,
          cashCouponData:value
         });
      }
    })
  },
  noCashCoupon(){
    this.setData({
      isMap: true,
      isCashCoupon: false,
      isRedPacket:false
    });
  },
  getCashCoupon(e){
    this.setData({
      isMap: true,
      isCashCoupon: false,
      promotionCouponsData:e.currentTarget.dataset.record,
      chooseSort: !this.data.chooseSort?2:1
    }, () => {
      this.initData();
    })
  },
  why(e){ // 不可用原因
    let id = e.currentTarget.dataset.why;
    let cashCouponData = this.data.cashCouponData
    cashCouponData.noUsableCouponsList = cashCouponData.noUsableCouponsList.map((item, index) => {
      if(index === id ){
        item.isWhy = !item.isWhy
      }
      return item
    })


    this.setData({
      cashCouponData
    })
  },
})