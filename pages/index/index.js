//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    schoolList:['北京大学'],
    schoolSelected: '北京大学',
    refectoryList:{
      '北京大学': ['农园一层', '农园二层', '燕南', '学一', '学五', '勺园', '艺园', '畅春新园']
    },
    refectorys: ['农园一层', '农园二层', '燕南', '学一', '学五', '勺园', '艺园', '畅春新园'],
    selectedRefectory: null,
    userInfo: {}
  },
  //事件处理函数
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  // 选择学校
  onSchoolChange: function(e){
    var selectedSchool = this.data.schoolList[e.detail.value];
    this.setData({
      schoolSelected: selectedSchool,
      refectorys: this.data.refectoryList[selectedSchool]
    })
  },
  // 随机食堂
  onStartSelect: function(){
    var totalCount = this.data.refectorys.length;
    var randomNum = Math.floor(Math.random()*totalCount);
    var currentRefectory = this.data.refectorys[randomNum];
    this.setData({
      selectedRefectory: currentRefectory
    });
  },
  // 删除当前选项并重新随机
  onDeleteandSelect: function(){
    var index = this.data.refectorys.indexOf(this.data.selectedRefectory);
    var currentArr = this.data.refectorys;
    currentArr.splice(index, 1);
    this.setData({
      // 注意此处，如果重新选择学校，那么删除选项将变回来
      refectorys: currentArr
    });
    this.onStartSelect();
  },
  // 食堂列表中删除选项
  onDeleteOption: function(e){
    var index = this.data.refectorys.indexOf(e.target.dataset.refectory);
    var currentArr = this.data.refectorys;
    currentArr.splice(index, 1);
    this.setData({
      // 注意此处，如果重新选择学校，那么删除选项将变回来
      refectorys: currentArr
    });
  }
})
