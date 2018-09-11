// pages/user/advise/advise.js
import pageState from '../../public/pagestate/pagestate.js';
const util = require("../../../utils/util.js");
const network = require("../../../utils/network.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: '您有什么宝贵的建议...',
    isfirst: true,
    isAct: false,
    hint: '',
    isTrue: false
  },

  clear: function() {
    if (this.data.isfirst) {
      this.setData({
        message: '',
        isfirst: false
      });
    }
  },

  formSubmit: function(e) {
    console.log("提交: " + e.detail.value);
    var _this = this;
    var msg = e.detail.value.message;
    if (!msg) {
      wx.showToast({
        title: '内容不能为空',
        image: '/images/ico/fail.png',
        duration: 2000,
        mask: true
      })
    } else {
      this.setData({
        isAct: true
      });
      network.request({
        url: util.local + '/Gallery/advise.do?openid=' + app.globalData.openid + '&msg=' + msg,
        method: 'POST',
        header: {
          'content-type': 'application/json; charset=UTF-8'
        },
        success: function(r) {
          console.log("r.data.retMsg: " + r.data.retMsg);
          if (r.data.retMsg == "ok") {
            _this.setData({
              hint: '提交成功',
              isTrue: true
            })
          } else if (r.data.retMsg == "no") {
            _this.setData({
              hint: '请先登录!'
            })
          } else {
            _this.setData({
              hint: r.data.retMsg
            })
          }
        },
        fail: function() {
          _this.setData({
            hint: '提交失败'
          })
        },
        complete: function() {
          console.log("hint: " + _this.data.hint);
          wx.showToast({
            title: _this.data.hint,
            image: _this.data.isTrue ? '/images/ico/succ.png' : '/images/ico/fail.png',
            duration: 2000,
            mask: true
          })
          console.log("formSubmit openid:" + app.globalData.openid);
          setTimeout(function() {
            wx.navigateBack({

            })
          }, "1000");
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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