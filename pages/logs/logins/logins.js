//logs.js
const util = require('../../../utils/util.js')

Page({
  data: {
    share: true,
    shares: false
  },
  onLoad: function () {

  },
  onShareAppMessage: function (ops) {
    var that = this;
    that.setData({
      share: false,
      shares: true
    })
    if (ops.from == 'button') {
      
    }
    return {
      title: '小程序',
      path: '/logs/logs',
      success: function () {
        console.log('成功')
        that.setData({
          share: true,
          shares: false
        })
      },
      fail: function () {
        that.setData({
          share: true,
          shares: false
        })
      }
    }
  }
})
