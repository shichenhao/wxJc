// pages/accredit/accredit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  login(e) {
    if (e.detail.errMsg === "getUserInfo:ok") {
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function (resAdd) {
          console.log(resAdd)
          wx.login({ //登录
            success: ress => {
              var key = null
              wx.http.postReq('appletClient?m=appletLoginBefore', { code: ress.code }, (getKey) => { // 获取key
                if (getKey.success) {
                  key = getKey.value.key;
                  app.globalData.openId = key;
                  var params = {
                    encryptedData: e.detail.encryptedData,
                    iv: e.detail.iv,
                    key,
                    code: key,
                    longitude: resAdd.longitude,
                    latitude: resAdd.latitude
                  };
                  console.log(e)
                  // 存储code
                  wx.setStorageSync('code', ress.code)
                  wx.http.postReq('appletClient?m=appletLogin', params, (data) => {
                    wx.switchTab({
                      url: '../index/index',
                    });
                    if (data.success) {
                      /**
                       *
                      wx.navigateBack({
                        delta: 2
                      })
                       */
                      /*wx.redirectTo({
                        url: '/pages/user/index'
                      })*/
                      // 存储登录信息
                      app.globalData.userInfo = data.value
                      wx.setStorageSync('userInfo', data.value)
                      app.globalData.userInfo = wx.getStorageSync("userInfo")
                      wx.setStorageSync('token', data.value.token)
                    }
                  })
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId



                }
              })
            }
          })
        },
        fail(err) {
          wx.showToast({
            title: '授权失败',
            icon: 'none'
          })
        }
      })
    } else {
      wx.showModal({
        title: '授权失败',
        showCancel: false
      })
    }
    return false
    // 登录
  },
})