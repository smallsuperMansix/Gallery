// pages/user/review/review.js
import pageState from '../../public/pagestate/pagestate.js';

const app = getApp();
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: util.local + '/Gallery/review/showImg.do?filename=',
    unpassimg : null,
    currentImg : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const $this = this;
    wx.request({
      url: util.local + '/Gallery/review/init.do?start=' + 1 + "&end=" + 10,
      method: 'GET',
      header: {
        'content-type': 'application/json; charset=UTF-8'
      },
      success: ret => {
        console.log(ret);
        if(ret.data.length>0){
          $this.setData({
            unpassimg: ret.data,
            currentImg: 0,
            imgUrl: util.local + '/Gallery/review/showImg.do?filename=' + ret.data[0].filename + "&openid=" + ret.data[0].openid
          })
        }else{
          wx.showToast({
            title: '没有待审批的图片',
            icon: 'success',
            duration: 1000,
            mask: true
          });
          console.log("comple");
          setTimeout(function () {
            wx.navigateBack({

            });
          }, '1100');
        }
      },
      fail: () => {
        console.log("图片获取失败！");
      },
      complete : ()=>{
        
      }
    });
  },
  passImg : function(e){
    var $this = this;
    if (this.data.unpassimg == null) {
      wx.showToast({
        title: '审批成功，已经没有待审批的图片啦',
        icon: 'success',
        duration: 1000,
        mask: true
      })
      return;
    }
    var currentIndex = this.data.currentImg;
    var curImg = this.data.unpassimg[currentIndex];
    curImg.ispass=e.currentTarget.dataset.ispass;
    wx.request({
      url: util.local + '/Gallery/review/pass.do' ,
      method: 'GET',
      header: {
        'content-type': 'application/json; charset=UTF-8'
      },
      data: { uploadinfo: curImg},
      success : ret => {
        if(ret.data.data == "success"){
          if (currentIndex < $this.data.unpassimg.length-1){
            currentIndex++;
            var filename = $this.data.unpassimg[currentIndex].filename;
            var openid = $this.data.unpassimg[currentIndex].openid;
            wx.showToast({
              title: '审批成功',
              icon: 'success',
              duration: 1000,
              mask: true
            })
            $this.setData({
              imgUrl: util.local + '/Gallery/review/showImg.do?filename=' + filename + "&openid=" + openid,
              currentImg: currentIndex
            });
          }else{
            console.log("success");
            wx.showToast({
              title: '已经没有待审批的图片啦',
              icon: 'success',
              duration: 1000,
              mask: true
            });
            console.log("comple");
            setTimeout(function () {
              wx.navigateBack({

              });
            }, '1100');
          }
        }
      },
      fail : ()=>{
        wx.showToast({
          title: '审批失败',
          icon: 'none',
          duration: 2000,
          mask: true
        })
      },
      complete: () => {
        
      }
    });
   
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