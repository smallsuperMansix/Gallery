// pages/user/collect/collect.js
import pageState from '../../public/pagestate/pagestate.js';
const util = require("../../../utils/util.js");
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgbaseurl: '',
    scList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const pagestate = pageState(this);
    pagestate.loading();
    var _this = this;
    setTimeout(function () {wx.request({
      url: util.local + '/Gallery/getCollect.do?openid=' + app.globalData.openid,
      method: 'POST',
      header: {
        'content-type': 'application/json; charset=UTF-8'
      },
      success: function (r) {
        if (r.data.scList) {
          console.log("collect onLoad:" + r.data.scList);
          _this.setData({
            imgbaseurl: util.local + '/Gallery/showImg.do',
            scList: r.data.scList
          })
          pagestate.finish();
        } else {
          console.log("没有取到scList");
          pagestate.error("服务器无响应,请稍后重试!");
        }
      },
      fail: function () {
        console.log("collect接口调用失败");
        pagestate.error("服务器无响应,请稍后重试!");
      }
    })},"500");
  },

  onRetry: function () {
    this.onLoad();
  },

  delcollect: function(e){
    console.log("filename: " + e.currentTarget.dataset.filename);
    var _this = this;
    wx.request({
      url: util.local + '/Gallery/delcollect.do?openid=' + app.globalData.openid + '&filename=' + e.currentTarget.dataset.filename,
      method: 'GET',
      header: {
        'content-type': 'application/json; charset=UTF-8'
      },
      success: function (r) {
        if (r.data=="OK") {
          wx.showToast({
            title: '取消收藏成功',
            image: '/images/ico/succ.png',
            duration: 1500,
            mask: true
          })
        } else {
          wx.showToast({
            title: '取消收藏失败',
            image: '/images/ico/fail.png',
            duration: 1500,
            mask: true
          })
        }
      },
      fail: function () {
        wx.showToast({
          title: '取消收藏失败',
          image: '/images/ico/fail.png',
          duration: 1500,
          mask: true
        })
      },
      complete: function(){
        _this.onLoad();
      }
    })
  },

  previewImg: function (e) {
    console.log("url: " + e.currentTarget.dataset.url);
    var url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url,     //当前图片地址
      urls: [url],               //所有要预览的图片的地址集合 数组形式
      success: function (res) {

      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
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