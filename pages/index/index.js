//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    schoolList:['北京大学'],
    schoolSelected: '北京大学',
    refectoryList:{
      '北京大学': [{
        name: '农园一层',
        ratio: 1
      }, {
        name: '农园二层',
        ratio: 1
      },{
        name: '燕南',
        ratio: 1
      },{
        name: '学一',
        ratio: 1
      },{
        name: '学五',
        ratio: 1
      },{
        name: '勺园',
        ratio: 1
      },{
        name: '艺园',
        ratio: 1
      },{
        name: '畅春新园',
        ratio: 1
      }]
    },
    refectorys: [{
        name: '农园一层',
        ratio: 1
      }, {
        name: '农园二层',
        ratio: 1
      },{
        name: '燕南',
        ratio: 1
      },{
        name: '学一',
        ratio: 1
      },{
        name: '学五',
        ratio: 1
      },{
        name: '勺园',
        ratio: 1
      },{
        name: '艺园',
        ratio: 1
      },{
        name: '畅春新园',
        ratio: 1
      }],
    selectedRefectory: null,
    ratioList: ['1倍概率','2倍概率','3倍概率','4倍概率','5倍概率'],
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
    var totalCount = 0, selectedIndex = 0;
    var tempRefectorys = this.data.refectorys;
    tempRefectorys.forEach(
      function(item){
        totalCount += item.ratio;
      }
    );
    if(totalCount < 1){
      return;
    }
    var randomNum = Math.floor(Math.random()*totalCount) + 1;
    for(let i = 0, len = tempRefectorys.length; i < len; i++){
      randomNum -= tempRefectorys[i].ratio;
      if(randomNum <= 0){
        selectedIndex = i;
        break;
      }
    }
    var currentRefectory = tempRefectorys[selectedIndex];
    this.setData({
      selectedRefectory: currentRefectory
    });
  },
  // 删除当前选项并重新随机
  onDeleteandSelect: function(){
    var name = this.data.selectedRefectory.name;
    var index = this.data.refectorys.findIndex(function(element){return element.name == name});
    var currentArr = this.data.refectorys;
    if(currentArr.length < 1 || index < 0){
      return;
    }
    currentArr.splice(index, 1);
    this.setData({
      // 注意此处，如果重新选择学校，那么删除选项将变回来
      refectorys: currentArr
    });
    this.onStartSelect();
  },
  // 食堂列表中删除选项
  onDeleteOption: function(e){
    var name = e.target.dataset.refectory;
    var index = this.data.refectorys.findIndex(function(element){return element.name == name});
    var currentArr = this.data.refectorys;
    currentArr.splice(index, 1);
    this.setData({
      // 注意此处，如果重新选择学校，那么删除选项将变回来
      refectorys: currentArr
    });
  },
  // 更改倍率
  onRatioChange: function(e){
    var ratio = +e.detail.value + 1;
    var name = e.target.dataset.refectory;
    var tempRefectorys = this.data.refectorys;
    tempRefectorys.forEach(function(item){
      if(item.name == name){
        item.ratio = ratio;
      }
    });
    this.setData({
      refectorys: tempRefectorys
    });
  },
  // 分享
  onShareAppMessage: function(){
    return {
      title: '食堂吃哪个',
      path: '/',
      success: function(){}
    }
  }
})
