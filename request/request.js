var rootDocment = 'https://prelaunch.horsegj.com/merchant/';
var header = {
  'Accept': 'application/json',
  'content-type': 'application/json'
}
function getReq(url, cb) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: rootDocment + url,
    method: 'get',
    header: header,
    success: function (res) {
      wx.hideLoading();
      return typeof cb == "function" && cb(res.data)
    },
    fail: function () {
      wx.hideLoading();
      wx.showToast({
        title: '网络错误',
        icon: 'none'
      })
      return typeof cb == "function" && cb(false)
    }
  })
}

function postReq(url, data, cb) {

  var params = {
    "app": 'horsegjUser',
    "imei": wx.getStorageSync('code'),
    "params": data,
    "token": wx.getStorageSync('token') || null
  }
  wx.showLoading({
    title: '加载中',
  })
    //console.log("header=="),
    //console.log(header),
    //console.log(url, data)
    wx.request({
      url: rootDocment + url,
      header: header,
      data: params,
      method: 'post',
      success: function (res) {
        //console.log(res)
        wx.hideLoading();
        if (!res.data.success){

          if (res.code === 100000) {
            wx.showToast({
              title: '用户未登录',
              icon: 'none'
            })
            wx.navigateTo({
              url: '../user-login/index'
            });
            return false;
          }
          wx.showToast({
            title: res.data.value || '出错了，请联系客服',
            icon: 'none'
          })
        }
        return typeof cb == "function" && cb(res.data)
      },
      fail: function () {
        wx.hideLoading();
        wx.showToast({
          title: '网络出错，请刷新重试',
          icon: 'none'
        })
        return typeof cb == "function" && cb(false)
      }
    })

}
module.exports = {
  getReq: getReq,
  postReq: postReq,
  header: header,
} 