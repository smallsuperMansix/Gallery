//app.js
const util = require('/utils/util.js');

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log("res: " + res.userInfo);
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;
              // 登录
              wx.login({
                success: res => {
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  if (res.code) {
                    wx.request({
                      url: util.local + '/Gallery/login.do?code=' + res.code + '&wxuser=' + util.formatWxUser(this.globalData.userInfo),
                      method: 'POST',
                      header: {
                        'content-type': 'application/json; charset=UTF-8'
                      },
                      success: r => {
                        if (r.data.openid) {
                          console.log("app启动时:" + r.data.openid);
                          this.globalData.openid = r.data.openid;
                          this.globalData.isChecker = r.data.isChecker;
                        }
                      },
                      fail: function () {
                        console.log("接口调用失败");
                      }
                    })
                  }
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid:null,
    isChecker: null
  }
})