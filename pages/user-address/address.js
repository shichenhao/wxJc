// pages/user-address/address.js
var { globalData } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
  },
  getData(){
    wx.http.postReq('appletClient?m=findUserAddress', {}, (res) => {
      let { success, value } = res;
      if (success) {
        console.log(value);
        this.setData({
          dataList:value
        })
      }else{
        wx.showToast({
          title: '出错了',
        })
      }
    })
  },
  addAddress(e){
    let item = e.currentTarget.dataset.item;
    globalData.backUrl = `/${this.route}`;
    globalData.editAddress = item;
    wx.navigateTo({
      url: '/pages/user-add-list/list'
    })
  }
})