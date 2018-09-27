// pages/shopProcess/shopProcess.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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