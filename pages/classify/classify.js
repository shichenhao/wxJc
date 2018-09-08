// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    leftData: [
      {
        name: '收入',
        id:1
      },
      {
        name: '厨柜',
        id: 2
      },
      {
        name: '瓷砖',
        id: 3
      },
      {
        name: '汽车',
        id: 4
      },
    ],
    rightData:{
      hot: [
        { url: '../../lib/images/brandDefault.png',id:1},
        { url: '../../lib/images/brandDefault.png', id: 2},
        { url: '../../lib/images/brandDefault.png', id:31},
        { url: '../../lib/images/brandDefault.png', id: 4},
      ],
      classify: [
        { url: '../../lib/images/commodityDefault.png', name: "1", id: 1 },
        { url: '../../lib/images/commodityDefault.png', name: "2", id: 2 },
        { url: '../../lib/images/commodityDefault.png', name: "3", id: 3 },
        { url: '../../lib/images/commodityDefault.png', name: "4", id: 4 },
      ]
    }
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