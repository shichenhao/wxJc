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
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      return typeof cb == "function" && cb(false)
    }
  })
}

function postReq(url, data, cb) {

  var params = {
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
          wx.showModal({
            title: '错误',
            content: res.data.value,
            showCancel: false
          })
        }
        return typeof cb == "function" && cb(res.data)
      },
      fail: function () {
        wx.hideLoading();
        wx.showModal({
          title: '网络错误',
          content: '网络出错，请刷新重试',
          showCancel: false
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