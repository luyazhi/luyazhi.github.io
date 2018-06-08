//index.js  
const app = getApp()
var pos = 0
var moveFlag = false
var nextIndex = 1
var flag = true

Page({
  data: {
    img_width_three: 80,
    img_width_one: 0,
    showModalStatus: false,
    imageCanMove: true,
    distance: 0,
    clubs: [],
    urls: [],
    swiperanimate: "",
    test_animate: ""
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.animationtop = wx.createAnimation({
    //   duration: 500,
    //   timingFunction: "linear",
    // })
  },
  image_click: function (e) {
    this.setData({
      swiperanimate: "swiperanimate"
    })
    setTimeout(() => {
      wx.navigateTo({

      //  url: '../index/banner_detail/banner_detail?id=' + this.data.clubs[1].id + "&name=" + this.data.clubs[1].name,

       // url: '../index/detail/detail'?id=' + this.data.clubs[1].id + "&name=" + this.data.clubs[1].name',

      })
    }, 500),
      setTimeout(() => {
        this.setData({
          swiperanimate: ""
        })
      }, 1500)

    wx.navigateTo({
      url: '../index/detail/detail',
    })
  },
  url_click: function () {
    wx.navigateTo({
      url: '../index/detail/detail',

//      url: '../index/banner_detail/banner_detail?id=' + this.data.clubs[1].id + "&name=" + this.data.clubs[1].name,

    })
  },
  onLoad: function () {
    //console.log(app)
    wx.request({

      url: "https://flightvip.huyue-tech.com/fly/travelPackagePic/getAll",

      data: { imageCanMove: true, swiperanimate: "" },
      header: {
        'content-type': 'application/json' // 默认值
      }, success: (res) => {
        var pics = [];
        var urlArray = [];
        for (var i = 0; i < 5; i++) {
          pics.push({
            name: res.data.data[i].travelName,
            src: res.data.data[i].travelPic,
            id: res.data.data[i].id,
            des: res.data.data[i].travelRef
          });
         // urlArray.push("../index/banner_detail/banner_detail?id=" + res.data.data[i].id + "&name=" + res.data.data[i].travelName);
        }
        this.setData({
          clubs: pics,
          urls: urlArray,
        })
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    this.setData({
      imageCanMove: true,
      swiperanimate: ""
    });
  },

  getUserInfo: function (e) {
    console.log("ewrewrwerew" + e)

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },  
  own_event: function _EventHandle(e) {
    switch (e.type) {
      case 'touchstart':
        // console.log("touchstart")
        pos = e.changedTouches[0].pageX
        // console.log(pos)
        moveFlag = false
        break;
      case 'touchmove':
       // console.log("touchmove")
        moveFlag = true
        break;
      default:

        var imageCanMove = this.data.imageCanMove;
        // console.log("defaut1:" + e.changedTouches[0].pageX)
        // console.log("defaut2:" + pos)
        // console.log("defaut3:" + (pos - e.changedTouches[0].pageX))
        if (imageCanMove && moveFlag && pos - e.changedTouches[0].pageX >= 50) {
          //   stage.removeChild(stage.children[0])

          //在这里操作的是,先声明一个新的数据,将先划走一张就放在数组的最后一个,然后将新的数组覆盖原来的数组
          var club_tmp = [];
          // club_tmp[0] = this.data.clubs[1];
          // club_tmp[1] = this.data.clubs[2];
          // club_tmp[2] = this.data.clubs[3];
          // club_tmp[3] = this.data.clubs[4];
          // club_tmp[4] = this.data.clubs[0];
          // club_tmp.push(this.data.clubs[1]);
          // club_tmp.push(this.data.clubs[2]);
          // club_tmp.push(this.data.clubs[3]);
          // club_tmp.push(this.data.clubs[4]);
          // club_tmp.push(this.data.clubs[0]);

          var clubvalue1 = this.data.clubs[2];
          var clubvalue2 = this.data.clubs[3];
          var clubvalue3 = this.data.clubs[4];
          var clubvalue4 = this.data.clubs[0];
          var clubvalue5 = this.data.clubs[1];



          var club0 = "clubs[1]";
          var club1 = "clubs[2]";
          var club2 = "clubs[3]";
          var club3 = "clubs[4]";
          var club4 = "clubs[0]";

          this.setData({
            imageCanMove: false,
            test_class: "pt-page-moveToRight",
            test_animate: "test_animateRight"
          })
          //  this.translate();


          setTimeout((() => {
            this.setData({
              [club0]: clubvalue1,


              [club4]: clubvalue5,

              [club3]: clubvalue4
            });
          }).bind(this), 400);

          setTimeout((() => {
            this.setData({
              imageCanMove: true,
              [club2]: clubvalue3,
              [club1]: clubvalue2,

              test_class: "",
              test_animate: ""
            });
          }).bind(this), 500);

        } else if (imageCanMove && moveFlag && e.changedTouches[0].pageX - pos >= 50) {
          //   stage.removeChild(stage.children[0])
          //在这里操作的是,先声明一个新的数据,将先划走一张就放在数组的最后一个,然后将新的数组覆盖原来的数组
          var club_tmp = []
          club_tmp[0] = this.data.clubs[4]
          club_tmp[1] = this.data.clubs[0]
          club_tmp[2] = this.data.clubs[1]
          club_tmp[3] = this.data.clubs[2]
          club_tmp[4] = this.data.clubs[3]

          // var clubvalue1 = this.data.clubs[2];
          // var clubvalue2 = this.data.clubs[3];
          // var clubvalue3 = this.data.clubs[4];
          // var clubvalue4 = this.data.clubs[0];
          // var clubvalue5 = this.data.clubs[1];

          // var club0 = "clubs[1]";
          // var club1 = "clubs[2]";
          // var club2 = "clubs[3]";
          // var club3 = "clubs[4]";
          // var club4 = "clubs[0]";

          this.setData({
            imageCanMove: false,
            test_class: "pt-page-moveToLeft",
            test_animate: "test_animateLeft"
          })

          setTimeout((function callback() {
            this.setData({
              imageCanMove: true,
              clubs: club_tmp,
              test_class: "",
              test_animate: ""
            });
          }).bind(this), 500);
          //   let li = document.createElement('li')
          //   li.style.backgroundImage = `url(${list[nextIndex]})`
          //   stage.appendChild(li)

        }
        break;
    }
  },

})
