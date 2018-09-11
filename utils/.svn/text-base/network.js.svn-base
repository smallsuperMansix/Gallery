var requestHandler = {
  url: '',
  data: {},
  header:{},
  method: '',
  success: function (res) {
  },
  fail: function () {
  },
  complete: function () {
  }
}

function request(requestHandler) {
  var data = requestHandler.data;
  var url = requestHandler.url;
  var method = requestHandler.method;
  var header = requestHandler.header;
  wx.showLoading({
    title: '',
  })
  wx.request({
    url: url,
    data: data,
    method: method,
    header: header,
    success: function (res) {
      requestHandler.success(res)
    },
    fail: function () {
      requestHandler.fail()
    },
    complete: function () {
      wx.hideLoading();
      requestHandler.complete()
    }
  })
}

module.exports = {
  request: request
}
