// pages/order-submit/submit.js
var { globalData } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressData:null,
    shipmentType:1,
    chooseSort:null,
    isCashCoupon:false,
    isRedPacket:false,
    promotionCouponsId:null,
    promotionCouponsData:null,
    cashCouponData:[]
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
      orderItems: JSON.stringify([orderItemsReq]),
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
        // wx.http.postReq('appletClient?m=pingxxWxLitePay',{
        //     channel: 'wx_lite',//渠道名
        //     amount: 0.1, 
        //     orderId: value.id,
        //     openId: globalData.openId,
        //     balanceCost: globalData.userInfo.balance
        //   },  (res2)=> {
        //     var charge = res2.value;
        //     Pingpp.createPayment(charge, function (result, err) {
        //       console.log(result);
        //       console.log(err.msg);
        //       console.log(err.extra);
        //       if (result == "success") {
        //         // 只有微信小程序 wx_lite 支付成功的结果会在这里返回
        //         console.log('success');
        //       } else if (result == "fail") {
        //         // charge 不正确或者微信小程序支付失败时会在此处返回
        //         console.log('fail');
        //       } else if (result == "cancel") {
        //         // 微信小程序支付取消支付
        //       }
        //     });
        //   }
        // )
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
          isRedPacket: true,
          redPacketData: value
        });
      }
    })
  },
  getRedPacket(e){
    this.setData({
      isRedPacket: false,
      redBagJson: e.currentTarget.dataset.record,
      chooseSort: !this.data.chooseSort ? 1 : 2
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
          isCashCoupon: true,
          cashCouponData:value
         });
      }
    })
  },
  noCashCoupon(){
    this.setData({
      isCashCoupon: false,
      isRedPacket:false
    });
  },
  getCashCoupon(e){
    this.setData({
      isCashCoupon: false,
      promotionCouponsData:e.currentTarget.dataset.record,
      chooseSort: !this.data.chooseSort?2:1
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
  }
})