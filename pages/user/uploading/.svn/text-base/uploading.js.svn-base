// pages/user/uploading/uploading.js
import pageState from '../../public/pagestate/pagestate.js';

const app = getApp();
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgbaseurl: util.local + '/Gallery/loading.do',
    img_noPassArr: {},
    img_passArr: {},
    showList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const pagestate = pageState(this);
    pagestate.loading();
    var _this = this;
    setTimeout(function (){wx.request({
      url: util.local + '/Gallery/downloading.do?openid=' + app.globalData.openid,
      method: 'POST',
      header: {
        'content-type': 'application/json; charset=UTF-8'
      },
      success: function(r) {
        if (r.data) {
          console.log("r.data: ");
          _this.setData({
            img_noPassArr: r.data.noPassList,
            img_passArr: r.data.passList
          });
          pagestate.finish();
        }else{
          console.log("后台无返回!");
          pagestate.error("服务器无响应,请稍后重试!");
        }
      },
      fail: function() {
        console.log("接口调用失败");
        pagestate.error("服务器无响应,请稍后重试!");
      }
    })},"500");
  },

  onRetry: function () {
    this.onLoad();
  },

  previewImg: function (e) {
    console.log("url: "+e.currentTarget.dataset.url);
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

  newUpload: function(e) {
    var _this = this;
    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        wx.showLoading({
          title: '',
        })
        wx.uploadFile( {
          url: util.local + '/Gallery/uploading.do', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'userName': app.globalData.userInfo.nickName,
            "openid": app.globalData.openid
          },
          fail: function(res) {
            console.log("newUpload fail", res);
            wx.hideLoading();
            wx.showToast({
              title: '上传失败请重试',
              image: '/images/ico/fail.png',
              duration: 3000,
              mask: true
            })
          },
          success: function(res) {
            console.log("newUpload success", res);
            var data = res.data;
            wx.hideLoading();
            wx.showToast({
              title: '上传成功待审核',
              icon: '/images/ico/succ.png',
              duration: 3000,
              mask: true
            });
            _this.onLoad();
          },
          complete: function () {
            
          }
        })
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