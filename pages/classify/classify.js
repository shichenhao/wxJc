// pages/classify/classify.js
var app = getApp();
Page({
  data: {
    id:null,
    leftData: [],
    rightData:[],
    classify: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
  },
  getList() {
    var param = {
      agentId: app.globalData.userInfo.agentId,
      parentId: 0,
      longitude: app.globalData.localPosition.longitude,
      latitude: app.globalData.localPosition.latitude
    }
    wx.http.postReq('appletClient?m=findUserClassification', param, (res) => {
      if (res.success) {
        var leftData = res.value.oneCategoryList;
        var classify = res.value.twoCategoryList;
        var rightData = res.value.merchantList;
        this.setData({
          id: res.value.oneCategoryList[0].id,
          leftData,
          classify,
          rightData,
          allClassify: classify
        })
      }
    })
  },
  changeClassify(e){
    let id=e.currentTarget.dataset.id;
    let allClassify = this.data.allClassify;
    this.setData({
      id,
      classify: allClassify.filter(item=>item.parentId==id)
    })
  }
})