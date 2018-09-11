// pages/home/classification/classification.js
const app = getApp();
const util = require('../../../utils/util.js');
var flag = true;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgbaseurl: util.local + '/Gallery/showImg.do?filename=',
    choose: 0,
    piclist: [],
    page: 1,
    hidden: true,
    hasMore: false,
    refresh: false,
    none: false
  },

  previewImg: function(e) {
    console.log("url: " + e.currentTarget.dataset.url);
    var url = e.currentTarget.dataset.url;
    var urlArray = new Array();
    urlArray = [url];
    wx.previewImage({
      current: url, //当前图片地址
      urls: urlArray, //所有要预览的图片的地址集合 数组形式
      success: function(res) {

      },
      fail: function(res) {

      },
      complete: function(res) {

      },
    })
  },

  collect: function(e) {
    var _this = this;
    wx.request({
      url: util.local + '/Gallery/doCollect.do?fname=' + e.currentTarget.dataset.fname + '&openid=' + app.globalData.openid,
      method: 'GET',
      header: {
        'content-type': 'application/json; charset=UTF-8'
      },
      success: res => {
        console.log(res.data);
        if (res.data == "OK") {
          wx.showToast({
            title: '收藏成功',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        } else if (res.data == null) {
          wx.showToast({
            title: '请先登录',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        } else {
          wx.showToast({
            title: '已收藏',
            icon: 'none',
            duration: 1500,
            mask: true
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log("classification: " + options.id);
    this.setData({
      choose: options.id,
      page: 1,
      piclist: [],
      refresh: true
    });
    this.getPicList();
  },

  chooseHandle: function(e) {
    console.log("chooseHandle:" + e.currentTarget.dataset.id);
    this.setData({
      choose: e.currentTarget.dataset.id,
      page: 1,
      piclist: [],
      none: false
    });
    this.getPicList();
  },

  getPicList: function() {
    var _this = this;
    wx.request({
      url: util.local + '/Gallery/showClass.do?type=' + _this.data.choose + '&page=' + _this.data.page,
      method: 'GET',
      header: {
        'content-type': 'application/json; charset=UTF-8'
      },
      success: res => {
        var l = _this.data.piclist;
        var resArr = res.data.retList;
        console.log("res.data.length: " + res.data.retList.length);
        for (var i = 0; i < resArr.length; i++) {
          l.push(resArr[i]);
        }
        if (res.data.retList.length > 0) {
          _this.setData({
            piclist: l
          });
        } else {
          _this.setData({
            none: true
          });
        }
      },
      fail: res => {
        _this.setData({
          hidden: false,
          piclist: []
        });
      },
      complete: res => {
        flag = true;
        _this.setData({
          hasMore: false,
          refresh: false
        });
      }
    })
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
    console.log("下拉刷新.....");
    var that = this;
    this.setData({
      page: 1,
      piclist: [],
      refresh: true
    });
    setTimeout(function () {
      that.getPicList();
      wx.stopPullDownRefresh();
    }, "1000");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log("上拉加载更多!");
    if (flag) {
      flag = false;
      this.setData({
        page: this.data.page + 1,
        hasMore: true
      });
      var that = this;
      setTimeout(function () {
        that.getPicList();
      }, "1000");
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})