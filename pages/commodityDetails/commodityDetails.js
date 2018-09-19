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
    quantity:1,
    merchantName: null,
    isSelectCommodity: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData({ goodsId:options.id})
  },
  getData: function (params){ //获取信息
    wx.http.postReq('appletClient?m=findClientBuildingMaterialsGoodsByIdInfo', params, (res) => {
      let { success ,value}=res;
      if (success) {
        let merchantName = value.buildingMaterialsMerchant
        let selectCommodity = !value.modelList[0] ? {} : value.modelList[0];
        selectCommodity.quantity = 1;
        selectCommodity.goodsModelId = selectCommodity.id;
        selectCommodity.price = selectCommodity.discountPrice - selectCommodity.platformSubsidiesPrice;
        this.setData({ 
          merchantName,
          data: value,
          selectCommodity
        });
      }
    })
  },
  handleSpecifications:function(){
    this.setData({ specifications: !this.data.specifications});
  },
  /**
   * 选择规格
   */
  changeSpecifications:function(e){
    let itemdata = e.currentTarget.dataset.itemdata;
    itemdata.quantity = this.quantity;
    itemdata.goodsModelId = itemdata.id;
    itemdata.price = itemdata.discountPrice - itemdata.platformSubsidiesPrice;
    this.setData({ selectCommodity: itemdata, isSelectCommodity:true});
  },
  cartNum(e) { //增加减少数量 1 减少 2增加
    var carType = e.currentTarget.dataset.type;
    var selectCommodity = this.data.selectCommodity;
    var num = parseInt(this.data.quantity);
    if(carType == 2){
      num = num + 1
    } else {
      num = num - 1 <= 1 ? 1 : num -1
    }
    selectCommodity.quantity = num;
    this.setData({
      quantity:num,
      selectCommodity
    });
  },
  purchase: function () { //立即购买
    let { isSelectCommodity } = this.data;
    if (!isSelectCommodity) {
      this.setData({ specifications: !isSelectCommodity });
      wx.showToast({
        title: '请选择型号',
        icon:'none'
      })
    }else{
      globalData.selectCommodity = this.data.selectCommodity;
      wx.navigateTo({
        url: '../order-submit/submit?merchantId=' + this.data.data.merchantId
      });
    }
  },
  pushCart: function () { //加入购物车
    let { isSelectCommodity}=this.data;
    if (!isSelectCommodity) {
      this.setData({ specifications: !isSelectCommodity });
      wx.showToast({
        title: '请选择型号',
        icon: 'none'
      })
    } else {
      globalData.cart = wx.getStorageSync('cart') || []
      // 查询商家
      var isMerchant = globalData.cart.some(merchant => {
        return merchant.merchant.id == this.data.merchantName.id
      })
      if (isMerchant) {
        globalData.cart.filter((merchant, index)=>{
          // 查询商品
          var isYes = globalData.cart[index].list.some(item => {
            return item.id === this.data.selectCommodity.id || item.goodsId === this.data.selectCommodity.id
          })
          if (isYes) {
            var cartItem = globalData.cart[index].list.filter(item => {
              if (item.id === this.data.selectCommodity.id) {
                item.quantity = item.quantity + this.data.quantity
              }
              return item
            })
          } else {
            globalData.cart[index].list.push(this.data.selectCommodity)
          }
        })
      }else{
        globalData.cart.push({
          merchant: this.data.merchantName,
          list: [this.data.selectCommodity]
        })
      }




      /**
       *



      var isYes = globalData.cart.some(item => {
        return item.id === this.data.merchantName.id
      })
      if (isYes){
        var cartItem = globalData.cart.filter(item => {
          if (item.id === this.data.selectCommodity.id) {
            item.quantity = item.quantity + this.data.quantity
          }
          return item
        })
      } else {
        globalData.cart.push({
          merchant: this.data.merchantName,
          list:this.data.selectCommodity
        })
      }
      */
      wx.setStorageSync('cart', globalData.cart)

      this.setData({
        quantity: 1,
        specifications: false,
      });
      wx.showToast({
        title: '成功加入购物车!',
        icon: 'none'
      })
    }
  }
})