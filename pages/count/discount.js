// pages/discount/discount.js
let { globalData } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:null
  },
  getInit(){
    let param = {
      businessType: 12,
      agentId: globalData.agentId || 1
    }
    wx.http.postReq('appletClient?m=findCouponsAllByBusinessType', param, (data) => {
      if (data.success) {
        var list = data.value;
        this.setData({
          list
        })
      }
    })
  },
  receive(e) { //领取
    let couponsRulesId = e.currentTarget.dataset.id;
    wx.http.postReq('/appletClient?m=getCouponsGetRecord', { couponsRulesId }, (data) => {
      if (data.success) {
        wx.showToast({
          title: '领取成功',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInit();
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '马管家建材',
      path: '/pages/accredit/accredit'
    }
  }
})