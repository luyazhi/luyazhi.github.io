// pages/index/detail/detail.js
var app = getApp();
const innerAudioContext = '';
Page({
  /*页面的初始数据*/
  data: {
    title: '桃花潭里度周末',
    progress: false,
    isPlaying: false,
    imgSrc: '../../../images/audio-1.png',
    audioSrc: '',
    currentAudioTime: 0,
    currentAudioTimes: 0,
    audioSumTime: 0,
    audioSumTimes: 0,
    progress: 0,
    audioImg : "",
    flag : 1,
    latitude: 39.929986,
    longitude: 116.395645,
 
    // actionSheetHidden: true,
    // actionSheetItems: [
    //   { bindtap: 'Menu1', txt: '腾讯地图' },
    //   { bindtap: 'Menu2', txt: '高德地图' },
    //   { bindtap: 'Menu3', txt: '百度地图' }
    // ],
    // menu: ''
  },

  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    showView: (options.showView == "true" ? true : false)
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  openMap: function () {
    wx.getLocation({
      type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: function (res) {
        // success
        wx.openLocation({
          latitude: 39.9088600000, // 纬度，范围为-90~90，负数表示南纬
          longitude: 116.3973900000, // 经度，范围为-180~180，负数表示西经
          scale: 11, // 缩放比例
        })
      }
    })
  },
  //音频播放 
  onReady: function () {
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46';
    this.setData({
      audioSrc: this.innerAudioContext.src
    })
  },
  onMusicTap: function (event) {
    var timer = 0;
    // 1.判断播放状态 true为暂停 false为播放
    console.log("播放状态" + this.innerAudioContext.paused)
    if (this.innerAudioContext.paused) {
      if (timer == 0) {
        this.innerAudioContext.play();
        var audioImgs = this.data.audioImgs;
      } else {
        this.innerAudioContext.seek(timer);
      }
    }
    else {
      this.innerAudioContext.pause();
    }
    this.innerAudioContext.onPlay(() => {
      //console.log("正在播放")
      this.setData({
        imgSrc: '../../../images/audio-2.png',
      })
    })
    this.innerAudioContext.onPause(() => {
      //console.log("暂停")
      this.setData({
        imgSrc: '../../../images/audio-1.png'
      })
    })
    this.innerAudioContext.onTimeUpdate(() => {
      //console.log("当前音频的播放位置" + this.innerAudioContext.currentTime);
      timer = this.innerAudioContext.currentTime;
      this.setData({
        currentAudioTime: parseInt(this.innerAudioContext.currentTime / 60),
        currentAudioTimes: parseInt(this.innerAudioContext.currentTime % 60),
        audioSumTime: parseInt((this.innerAudioContext.duration) / 60),
        audioSumTimes: parseInt((this.innerAudioContext.duration) % 60),
        progress: parseInt((this.innerAudioContext.currentTime / this.innerAudioContext.duration) * 100)
      })
      
      //console.log("flag ==== " + this.data.flag)
      if (this.data.flag == 1){
        this.setData({
          audioImg: "../../../images/Group8.png",
          flag : 2
        })
        
      } else if (this.data.flag == 2){
        this.setData({
          audioImg: "../../../images/Group81.png",
          flag: 3
        })
        
      } else if (this.data.flag == 3) {
        this.setData({
          audioImg: "../../../images/Group82.png",
          flag : 1
        })
        
      }
    })
  },




   //地图选择弹出
  // actionSheetTap: function () {
  //   this.setData({
  //     actionSheetHidden: !this.data.actionSheetHidden
  //   })
  // },
  // //取消
  // actionSheetbindchange: function () {
  //   this.setData({
  //     actionSheetHidden: !this.data.actionSheetHidden
  //   })
  // },
  //选择
  // bindMenu1: function () {
  //   this.setData({
  //     menu: "腾讯地图",
  //     actionSheetHidden: !this.data.actionSheetHidden
  //   })
  // },
  // bindMenu2: function () {
  //   this.setData({
  //     menu:'高德地图',
  //     actionSheetHidden: !this.data.actionSheetHidden
  //   })
  // },
  // bindMenu3: function () {
  //   this.setData({
  //     menu:'百度地图',
  //     actionSheetHidden: !this.data.actionSheetHidden
  //   })
  // },
})