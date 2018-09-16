// pages/commodityDetails/commodityDetails.js
var { globalData} = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:{},
    selectCommodity:{},
    specifications:false,
    quantity:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData({ goodsId:options.id})
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
  getData: function (params){ //获取信息
    wx.http.postReq('appletClient?m=findClientBuildingMaterialsGoodsByIdInfo', params, (res) => {
      let { success ,value}=res;
      if (success) {
        let selectCommodity = !value.modelList[0] ? {} : value.modelList[0];
        selectCommodity.quantity=1;
        this.setData({ 
          data: value,
          selectCommodity
        });
      }
    })
  },
  handleSpecifications:function(){
    let specifications = this.data.specifications;
    this.setData({ specifications: !specifications});
  },
  /**
   * 选择规格
   */
  changeSpecifications:function(e){
    let itemdata = e.currentTarget.dataset.itemdata;
    itemdata.quantity = this.quantity;
    this.setData({ selectCommodity:itemdata});
  },
  purchase:function(){ //立即购买
    global.selectCommodity = this.data.selectCommodity;
    wx.navigateTo({
      url: '../order-submit/submit?merchantId=' + this.data.data.merchantId
    });
  }
})