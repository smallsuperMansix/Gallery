// pages/user/inform/inform.js
import pageState from '../../public/pagestate/pagestate.js';

const app = getApp();
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: [],
    informs: [],
    isnone: false,
    isAuth: 'N',
    answerMsg: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const pagestate = pageState(this);
    pagestate.loading();
    this.setData({
      userInfo: app.globalData.userInfo
    });
    setTimeout(this.getInform, "1000");
  },

  viewDetails: function (e) {
    var filename = e.currentTarget.dataset.filename;
    var url = util.local + '/Gallery/loading.do?openid=' + app.globalData.openid + '&filename=' + filename;
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

  formSubmit: function(e) {
    console.log(e);
    var answer = e.detail.value.answer;
    var informid = e.currentTarget.dataset.informid;
    const $this = this;
    const pagestate = pageState(this);
    pagestate.loading();
    setTimeout(function() {
      wx.request({
        url: util.local + '/Gallery/inform/doInform.do?openId=' + app.globalData.openid + '&answer=' + answer + '&informid=' + informid,
        method: 'GET',
        header: {
          'content-type': 'application/json; charset=UTF-8'
        },
        success: ret => {
          console.log(ret);
          $this.getInform();
        },
        fail: ret => {
          pagestate.error();
        },
        complete: res => {
          console.log("e.detail.value.answer: " + $this.data.answerMsg);
          $this.setData({
            answerMsg: ""
          });
          console.log("e.detail.value.answer: "+e.detail.value.answer);
        }
      })
    }, "1000");
  },

  getInform: function() {
    const $this = this;
    const pagestate = pageState(this);
    wx.request({
      url: util.local + '/Gallery/inform/init.do?openId=' + app.globalData.openid,
      method: 'GET',
      header: {
        'content-type': 'application/json; charset=UTF-8'
      },
      success: ret => {
        console.log(ret);
        if (ret.data != null && ret.data.length != 0) {
          ret.data.infos.forEach(item => {
            item.createtime = util.datetimeFormat(item.createtime);
          })
          $this.setData({
            informs: ret.data.infos,
            isAuth: ret.data.isAuth
          });
        } else {
          $this.setData({
            isnone: true,
            informs: []
          });
        }
        pagestate.finish();
      },
      fail: ret => {
        pagestate.error();
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