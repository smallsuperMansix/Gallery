// pages/dynamic/dynamic.js

const util = require('../../utils/util.js');
var flag = true;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    hasMore: false,
    refresh: false,
    none: false,
    dynamicArr: [],
    imgbaseurl: util.local + '/Gallery/showDynamicImg.do',
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      page: 1,
      refresh: true
    });
    this.getDataFromServer(this.data.page);
  },

  previewImg: function (e) {
    console.log("url: " + e.currentTarget.dataset.url);
    var url = e.currentTarget.dataset.url;
    var urlArray = new Array();
    urlArray = [url];
    wx.previewImage({
      current: url, //当前图片地址
      urls: urlArray, //所有要预览的图片的地址集合 数组形式
      success: function (res) {

      },
      fail: function (res) {

      },
      complete: function (res) {

      },
    })
  },
  
  refreshData: function(e) {
    //下拉
    console.log("下拉刷新1.....");
    var that = this;
    this.setData({
      page: 1,
      refresh: true
    });
    setTimeout(function() {
      //调用网络请求
      wx.request({
        url: util.local + '/Gallery/getDynamic.do?page=' + that.data.page,
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function(res) {
          if (res.data.length > 0) {
            that.setData({
              dynamicArr: util.formatDateList(res.data)
            });
          } else {
            that.setData({
              none: true
            });
          }
        },
        fail: function() {
          that.setData({
            hidden: false
          });
        },
        complete: function() {
          console.log("that.data.dynamicArr.length: " + that.data.dynamicArr.length);
          that.setData({
            refresh: false
          });
        }
      });
    }, "1000");
  },

  loadMore: function(e) {
    if (flag) {
      flag = false;
      this.setData({
        page: this.data.page + 1,
        hasMore: true
      });
      //上拉F
      console.log("上拉加载更多...." + this.data.page);
      var that = this;
      setTimeout(function() {
        that.getDataFromServer(that.data.page);
      }, "1000");
    }
  },

  //获取网络数据的方法
  getDataFromServer: function(p) {
    var that = this;
    //调用网络请求
    wx.request({
      url: util.local + '/Gallery/getDynamic.do?page=' + p,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        var l = that.data.dynamicArr;
        var resArr = util.formatDateList(res.data);
        console.log("res.data.length: " + res.data.length);
        for (var i = 0; i < resArr.length; i++) {
          l.push(resArr[i]);
        }
        if (res.data.length > 0) {
          that.setData({
            dynamicArr: l
          });
        } else {
          that.setData({
            none: true
          });
        }
      },
      fail: function() {
        that.setData({
          hidden: false
        });
      },
      complete: function() {
        flag = true;
        console.log("that.data.dynamicArr.length: " + that.data.dynamicArr.length);
        that.setData({
          hasMore: false,
          refresh: false
        });
      }
    });
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