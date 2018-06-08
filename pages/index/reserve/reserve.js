var app = getApp()
var pics = [];

Page({
  data: {
    banners: [],//轮播图数据源,
    swiperCurrent:1, 
    interval: 2000,
    circular:true,
    current:"",
    loadText: '查看更多',
    contentInfo: [],
    num: 1,
    // 设置样式名  
    minusStatus: 'disabled',   
    totalMony:"",
    // 总价，初始为0
    totalPrice: 0,     
  },
   
  onLoad: function (options) {
    var that = this    
    //获取套餐页面轮播图
    wx.request({
      url: 'https://flightvip.huyue-tech.com/fly/travelPackagePic/getAll',
      success: function (res) {
        console.log("请求成功" + res.data)
        for (var i = 0; i < res.data.data.length; i++) {
          pics.push(res.data.data[i]);
        }
        that.setData({
          banners: res.data.data,
        })
      },
      fail: function () {
        wx.showModal({
          title: '加载出错',
          showCancel: false
        })
      }
    })  
    //初始化请求 内容
    wx.request({
      url: 'http://xxxxx.com/index.php?m=Industry&a=getDuanziInfo',
      data: { token: 1 },
      method: 'GET',
      success: function (res) {
        console.log(res.data.result) //打印初始化数据  
        that.setData({
          duanziInfo: res.data.result
        })
      }
    })
  }, 
  //图片下标分式器
  swiperChange: function (e) {
   // console.log(e);
    this.setData({
      swiperCurrent: e.detail.current+1   //获取当前轮播图片的下标
    })
  }, 
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  //合计
  countCart: function () {
    
  }, 

  //加载更多  
  setLoading: function (e) {
    var content = this.data.contentInfo
    var that = this
    wx.showToast({ //期间为了显示效果可以添加一个过度的弹出框提示“加载中”  
      title: '加载中',
      icon: 'loading',
      duration: 200
    })
    wx.request({
      url: '',
      data: {},
      method: 'GET',
      success: function (res) {
        console.log(content.concat(res.data.result)) //打印拼接之后数据  
        that.setData({
          contentInfo: content.concat(res.data.result),
          loadText: "查看更多",
          loading: false,
        })
      }
    })
  },




  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },

  //选择车辆
  showlogingBtn: function () {
    this.setData({
      show_Modal: true
    })
  },
  /* 隐藏模态对话框*/
  hide_Modal: function () {
    this.setData({
      show_Modal: false
    });
  },
  //日期
  bindDateChange: function (e) {
    
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //感兴趣和已感兴趣
  onChangeShowState: function () {
    var that = this;
    that.setData({
      ShowState: false,
      ShowStates: true,
    })
  },

  /* 弹窗*/
  showDialogBtn: function () {
    
    this.setData({
      showModal: true,
      
    })
  },
  /* 隐藏模态对话框*/
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },

  /* 对话框取消按钮点击事件*/
  onCancel: function () {
    this.hideModal();
  },

  /*对话框确认按钮点击事件*/
  onConfirm: function () {
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function (res) {
      },
      'fail': function (res) {
      }
    })
  },

  /*用户点击右上角分享*/
  onShareAppMessage: function () {

  },
})
