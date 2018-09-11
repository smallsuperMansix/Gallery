// pages/user/user.js
import pageState from '../public/pagestate/pagestate.js';

//获取应用实例
const app = getApp();
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    uinfo: '登陆',
    imgurl: '../../images/user-tmp.jpg',
    unreadNum: 0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    msgs: 0,
    isChecker: null,
    reviews : 0
  },

  showuseravatar: function() {
    var _this = this;
    if (_this.data.hasUserInfo) {
      wx.previewImage({
        current: _this.data.imgurl, //当前图片地址
        urls: [_this.data.imgurl], //所有要预览的图片的地址集合 数组形式
        success: function(res) {

        },
        fail: function(res) {


        },
        complete: function(res) {


        },
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;
    const pagestate = pageState(_this);
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        uinfo: app.globalData.userInfo.nickName,
        imgurl: app.globalData.userInfo.avatarUrl,
        hasUserInfo: true,
        isChecker: app.globalData.isChecker
      });
      wx.login({
        success: function(res) {
          console.log("user onLoad:" + res.code)
          if (res.code) {
            pagestate.loading();
            setTimeout(function() {
              wx.request({
                url: util.local + '/Gallery/login.do?code=' + res.code + '&wxuser=' + util.formatWxUser(app.globalData.userInfo),
                method: 'POST',
                header: {
                  'content-type': 'application/json; charset=UTF-8'
                },
                success: function(r) {
                  if (r.data.openid) {
                    console.log("user onLoad:" + r);
                    app.globalData.openid = r.data.openid;
                    pagestate.finish();
                    _this.setData({
                      msgs: r.data.msgs,
                      reviews: r.data.upinfos
                    });
                  } else {
                    console.log("没有取到openid");
                    pagestate.error("服务器无响应,请稍后重试!");
                  }
                },
                fail: function() {
                  console.log("接口调用失败");
                  pagestate.error("服务器无响应,请稍后重试!");
                }
              })
            }, "500")
          }
        }
      })
    } else {
      pagestate.finish();
    }
  },

  getUserInfo: function(e) {
    var _this = this;
    app.globalData.userInfo = e.detail.userInfo;
    const pagestate = pageState(_this);
    this.setData({
      userInfo: e.detail.userInfo,
      uinfo: e.detail.userInfo.nickName,
      imgurl: e.detail.userInfo.avatarUrl,
      hasUserInfo: true,
      isChecker: app.globalData.isChecker
    });
    wx.login({
      success: function(res) {
        console.log("user getUserInfo:" + res.code)
        if (res.code) {
          pagestate.loading();
          wx.request({
            url: util.local + '/Gallery/login.do?code=' + res.code + '&wxuser=' + util.formatWxUser(e.detail.userInfo),
            method: 'POST',
            header: {
              'content-type': 'application/json; charset=UTF-8'
            },
            success: function(r) {
              if (r.data.openid) {
                console.log(r);
                app.globalData.openid = r.data.openid;
                app.globalData.isChecker = r.data.isChecker ? r.data.isChecker : null;
                _this.setData({
                  isChecker: app.globalData.isChecker,
                  msgs: r.data.msgs,
                  reviews: r.data.upinfos
                });
                pagestate.finish();
              } else {
                console.log("没有取到openid");
                pagestate.error("服务器无响应,请稍后重试!");
              }
            },
            fail: function() {
              console.log("接口调用失败");
              pagestate.error("服务器无响应,请稍后重试!");
            }
          })
        }
      }
    })
  },

  onRetry: function() {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var _this = this;
    if (app.globalData.userInfo) {
      wx.login({
        success: function(res) {
          console.log("user getUserInfo:" + res.code)
          if (res.code) {
            wx.request({
              url: util.local + '/Gallery/login.do?code=' + res.code + '&wxuser=' + util.formatWxUser(app.globalData.userInfo),
              method: 'POST',
              header: {
                'content-type': 'application/json; charset=UTF-8'
              },
              success: function(r) {
                if (r.data.openid) {
                  console.log(r);
                  app.globalData.openid = r.data.openid;
                  app.globalData.isChecker = r.data.isChecker ? r.data.isChecker : null;
                  _this.setData({
                    isChecker: app.globalData.isChecker,
                    msgs: r.data.msgs,
                    reviews: r.data.upinfos
                  });
                } else {
                  console.log("没有取到openid");
                }
              },
              fail: function() {
                console.log("接口调用失败");
              }
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})