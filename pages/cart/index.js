// pages/cart/index.js
Page({
  data: {
    // 编辑
    edit: true,
    // 弹窗
    cartPop: false,
    // 全选
    checkAll: false,
    carNum: 0, //数量
    carMoney: 0, //金额
    cartList: wx.getStorageSync('cart'),
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
    this.getCarNum();
    this.getCarMoney();
  },
  // 删除
  delAll(){
    let cartList = this.data.cartList;
    cartList = cartList.filter(item => {
      item.list = item.list.filter(son => {
        return !son.check
      })
      return item
    }).filter(item=>{
      return !item.check
    }).filter(item=>{
      return item.list.length>0
    })
    this.setData({
      cartList
    })
    wx.setStorageSync('cart', cartList)
  },
  // 选中
  checkItem(e) {
    let itemIndex = e.currentTarget.dataset.itemindex;
    let objIndex = e.currentTarget.dataset.objindex;
    let cartList = this.data.cartList;
    cartList[itemIndex].list[objIndex].check = !cartList[itemIndex].list[objIndex].check;

    let checkAll = cartList.some((item, index) => {
      cartList[index].check = !cartList[index].list.some(son => {
        return !son.check
      })
      if(item.check){
        return !item.list.some(son=>{
          return !son.check
        })
      }
      else{
        return false
      }
    })
    this.setData({
      cartList,
      checkAll
    });
    this.getCarMoney();
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


    let checkAll = !cartList.some((item, index) => {
      return !item.check
    })

    this.setData({
      cartList,
      checkAll
    });
    this.getCarMoney();
  },
  // 选中所有
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
    this.getCarMoney();
  },
  getCarNum() { //获取商品总数
    let carNum = 0;
    this.data.cartList.map(item => {
      item.list.map(son => {
        carNum += son.quantity;
      })
    })
    this.setData({
      carNum,
    })
  },
  getCarMoney() { //获取商品总数
    let carMoney = 0;
    this.data.cartList.map(item => {
      item.list.map(son => {
        if(son.check){
          carMoney += son.quantity * son.price;
        }
      })
    })
    this.setData({
      carMoney
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCarNum();
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