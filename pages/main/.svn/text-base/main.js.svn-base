// pages/main/main.js
import pageState from '../public/pagestate/pagestate.js';
const util = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recList:{},
    hotList:{},
    imgUrl: util.local + '/Gallery/showImg.do?filename='
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    const pagestate = pageState(_this);
    pagestate.loading();
    setTimeout(function () {
      wx.request({
        url: util.local + '/Gallery/showMain.do',
        method: 'POST',
        header: {
          'content-type': 'application/json; charset=UTF-8'
        },
        success: function (r) {
          if (r.data) {
            console.log("后台返回 r.data: " + r.data);
            _this.setData({
              hotList: r.data.hotList,
              recList: r.data.recList
            });
            pagestate.finish();
          } else {
            console.log("后台无返回!");
            pagestate.error("服务器无响应,请稍后重试!");
          }
        },
        fail: function () {
          console.log("接口调用失败");
          pagestate.error("服务器无响应,请稍后重试!");
        }
      })
    }, "500");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})