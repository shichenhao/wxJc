// pages/payment/payment.js
var { globalData } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price:0,
    balance:0,
    otherPrice:0,
    isBalance:false,
    isOtherPrice:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let price = globalData.orderDetail.totalGoodsPrice;
    this.getBalance();
    this.setData({
      price,
      otherPrice: price
    })
  },
  getBalance(){ //查询余额
    wx.http.postReq('appletClient?m=findUserAccountById', {}, (res) => {
      let { success, value } = res;
      if (success) {
        this.setData({
          balance: value.balance,
          isBalance: value.balance >= this.data.price,
          isOtherPrice: value.balance < this.data.price
        });
      }
    })
  },
  selectBalancePay(){
    let { isBalance, price, balance}=this.data;
    this.setData({ isBalance: !isBalance});
    if (!isBalance && balance*1<price*1){
      this.setData({ 
        otherPrice: price - balance,
      });
    }
  },
  selectOtherPay() {
    this.setData({ isOtherPrice: !this.data.isOtherPrice })
  },
  submit(){
    let { isBalance, isOtherPrice, price}=this.data;
    let params = globalData.orderParams;
    params.balanceCost = price;
    if (isOtherPrice){
      wx.http.postReq('appletClient?m=pingxxWxLitePay', {
          channel: 'wx_lite',//渠道名
          amount: globalData.orderDetail.totalGoodsPrice,
          orderId: globalData.orderDetail.id,
          openId: globalData.openId,
          balanceCost: globalData.userInfo.balance
        }, (res2) => {
          var charge = res2.value;
          Pingpp.createPayment(charge, function (result, err) {
            console.log(result);
            console.log(err.msg);
            console.log(err.extra);
            if (result == "success") {
              // 只有微信小程序 wx_lite 支付成功的结果会在这里返回
              console.log('success');
            } else if (result == "fail") {
              // charge 不正确或者微信小程序支付失败时会在此处返回
              console.log('fail');
            } else if (result == "cancel") {
              // 微信小程序支付取消支付
            }
          });
        }
      )
    }else{

    }
  }
})