// pages/evaluate/evaluate.js
var { globalData } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    widthS: 0,
    widthC: 0,
    valuateContent:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  changeWidthS(e) {
    let width = e.currentTarget.dataset.width;
    this.setData({ widthS: width });
  },
  changeWidthC(e) {
    let width = e.currentTarget.dataset.width;
    this.setData({ widthC: width });
  },
  changeEvaluateContent(e){ //评价内容
    this.setData({
      valuateContent: e.detail.value
    })
  },
  submit(){
    let { widthS, widthC, valuateContent}=this.data;
    let params={
      orderId: globalData.orderDetail.id,
      orderItemId: globalData.orderDetail.buildingMaterialsOrderItemList[0].id,
      content: valuateContent,
      goodsScore: widthC,
      merchantScore: widthS
    };
    wx.http.postReq('appletClient?m=createBuildingMaterialsGoodsComments', params, (res) => {
      let { success, value } = res;
      if (success) {
        this.setData({
          addressData: value[0]
        })
        wx.showToast({
          title: '评价成功',
        })
        wx.navigateBack({
          delta: 1
        })

      } else {
        wx.showToast({
          title: value,
          icon: 'none'
        })
      }
    })
  },
})