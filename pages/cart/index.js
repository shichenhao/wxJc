// pages/cart/index.js
Page({
  data: {
    // 编辑
    edit: true,
    // 弹窗
    cartPop: false,
    // 全选
    checkAll: false,
    cartList: wx.getStorageSync('cart'),
    cartNun:0
  },
  // 编辑
  editFun() {
    this.setData({
      edit: !this.data.edit
    })
  },
  // 关闭结算弹窗
  closePop() {
    this.setData({
      cartPop: !this.data.cartPop
    })
  },
  // 计算数量
  cartNum(e) { //增加减少数量 1 减少 2增加
    var carType = e.currentTarget.dataset.type;
    var itemIndex = e.currentTarget.dataset.itemindex;
    var objIndex = e.currentTarget.dataset.objindex;
    var cartList = this.data.cartList;
    var num = parseInt(cartList[itemIndex].list[objIndex].quantity);
    if (carType == 2) {
      num = num + 1
    } else {
      num = num - 1 <= 1 ? 1 : num - 1
    }
    this.data.cartList[itemIndex].list[objIndex].quantity = num;
    this.setData({
      cartList
    });
  },
  // 选中
  checkItem(e) {
    var itemIndex = e.currentTarget.dataset.itemindex;
    var objIndex = e.currentTarget.dataset.objindex;
    var cartList = this.data.cartList;
    cartList[itemIndex].list[objIndex].check = !cartList[itemIndex].list[objIndex].check
    this.setData({
      cartList
    });
  },
  // 选中
  checkMerchant(e) {
    var itemIndex = e.currentTarget.dataset.itemindex;
    var cartList = this.data.cartList;
    cartList[itemIndex].check = !cartList[itemIndex].check
    cartList[itemIndex].list = cartList[itemIndex].list.map(i=>{
      i.check = cartList[itemIndex].check
      return i
    })
    this.setData({
      cartList
    });
  },
  checkChangeAll() {
    var checkAll = !this.data.checkAll;
    var cartList = this.data.cartList;
    cartList = cartList.map(i => {
      i.list = i.list.map(item=>{
        item.check = checkAll
        return item
      })
      i.check = checkAll
      return i
    })
    this.setData({
      checkAll,
      cartList
    });
    console.log(checkAll)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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