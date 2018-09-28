// pages/couplet/couplet.js
let WxParse = require('../../wxParse/wxParse.js');
let { globalData } = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: null
  },
  getInit() {
    wx.http.postReq('appletClient?m=findBuildingMaterialsKuponoActivityByAgentId', {
      agentId: globalData.agentId
    }, (data) => {
      if (data.success) {
        let info = data.value
        this.setData({
          info: data.value
        })
        WxParse.wxParse('info', 'html', info.content, this);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInit();
  },
})