// pages/user-add-list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender:'男',
    detailedAddress:false,
    agentId: false,
    id:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.agentId){
      this.setData({
        agentId,
        id
      })
    }
  },
  changeGender(e){
    let gender = e.currentTarget.dataset.gender;
    this.setData({ gender});
  },
  formSubmit(e){
    let { gender, detailedAddress, latitude, longitude, agentId,id}=this.data;
    let params=e.detail.value;
    if (agentId){
      params.agentId = agentId;
      params.id = id;
    }
    params.gender = gender;
    params.detailedAddress =detailedAddress;
    params.address = detailedAddress + params.houseNumber;
    params.latitude = latitude; 
    params.longitude = longitude; 
    wx.http.postReq('appletClient?m=editUserAddress', params, (res) => {
      let { success, value } = res;
      if (success) {
        wx.navigateTo({
          url: '../user-address/address',
        })
      }else{
        wx.showToast({
          title: '出错了',
        })
      }
    })
  },
  // 选择位置
  getMap() {
    let _this=this;
    wx.chooseLocation({
      success(res) {
        _this.setData({
          detailedAddress: res.address,
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    })
  },
})