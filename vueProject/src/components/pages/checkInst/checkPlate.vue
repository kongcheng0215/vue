<template>
  <div style=" min-width:1064px;">
    <div class="plate" v-if="instType==0||instType==1?false:true">
      <p class="con-tit" v-if="instType==0?false:true">
          <i>便捷操作</i>
      </p>
      <div class="con-menu">
        <ul v-if="instType==2?true:false">
          <!-- <li style="background: #ef5664;" @click="goMenu('unitDeviceRegist')">
            <i class="iconfont icon-51"></i>
            <p>发布项目</p>
          </li> -->
          <li  style="background: #9ec4a6; "@click="goMenu('unitDeviceInfo')">
            <i class="iconfont icon-chaxun"></i>
            <p>查看所有已发布项目</p>
          </li>
        
          <!--<li style="background: #fd7d36; margin-right:0">
            <i class="iconfont icon-fabu"></i>
            <p>发布通知</p>
          </li>-->
        </ul>
          <!--<li style="background: #fd7d36; margin-right:0">
            <i class="iconfont icon-fabu"></i>
            <p>发布通知</p>
          </li>-->
        </ul>

      </div>
    </div>
    <div style="padding:0;height: 372px;background:#FFF;min-width: 1151px" class="container-fluid">
      <div class="con-msg col-lg-7 col-md-7">
        <p class="con-tit">
          <i>当前月项目明细</i>
        </p>
        <div v-if="instType==2?false:true">
          <div id="device-warn-all" class="device-warn" style="border-color: #a61592;">10</div>
          <div id="device-warn-all" class="device-warn" style="border-color: #51da91;">22</div>
        </div>
        <div v-if="instType==2?true:false">
          <div id="device-warn-all" class="device-warn" style="border-color: #a61592;">96</div>
        <div id="device-warn-all" class="device-warn" style="border-color: #51da91;">31</div>
        </div>
       <!--  后台获取代码 用上面的写死 -->
        <!-- <div id="device-warn-all" class="device-warn" style="border-color: #a61592;">{{optionWarn1}}</div>
        <div id="device-warn-check" class="device-warn" style="border-color: #51da91;">{{optionWarn2}}</div> -->
        <p class="device-info">
          <span>待完成项目</span>
          <span>已完成项目</span>

        </p>
      </div>
      <div class="con-list col-lg-5 col-md-5">
        <p class="con-tit">
          <i>月度统计报表</i>
          <!-- <button class="prev-year" @click="prevYear">上半年</button>
          <span class="show-years">{{halfYear}}</span>
          <button class="next-year" @click="nextYear">下半年</button> -->
        </p>
        <div id="conList"></div>
      </div>
    </div>

  </div>
</template>

<script>
  echarts.registerTheme('color0', {
    // 默认色板
    color: [
      '#feceab', '#ff847c', '#e84a5f', '#a42a3a', '#d87a80',
      '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
      '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
      '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
    ],
    categoryAxis: {
      axisLine: {            // 坐标轴线
        lineStyle: {       // 属性lineStyle控制线条样式
          color: '#dadada'
        }
      },
      splitLine: {           // 分隔线
        show:false,
        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
          color: ['#eee']
        }
      }
    },
  });
  import store from "store";
  import echarts from"echarts";
  import moment from "moment";
  var option = {
      "tooltip": {
        "trigger": "axis",
        "axisPointer": {
          "type": "shadow",
          textStyle: {
            color: "#fff"
          }

        },
      },
      "grid": {
        "borderWidth": 0,
        "top": 110,
        "bottom": 95,
        textStyle: {
          color: "#fff"
        }
      },
      "calculable": true,
      "xAxis": [{
        "type": "category",
        "axisLine": {
          lineStyle: {
            color: '#90979c'
          }
        },
        "splitLine": {
          "show": false
        },
        "axisTick": {
          "show": false
        },
        "splitArea": {
          "show": false
        },
        "axisLabel": {
          "interval": 0,

        },
        "data": ['1月', '2月', '3月', '4月', '5月', '6月'],
      }],
      "yAxis": [{
        "type": "value",
        "splitLine": {
          "show": false
        },
        "axisLine": {
          lineStyle: {
            color: '#90979c'
          }
        },
        "axisTick": {
          "show": false
        },
        "axisLabel": {
          "interval": 0,

        },
        "splitArea": {
          "show": false
        },

      }],
      "series": [{
        "name": "已完成项目",
        "type": "bar",
        "stack": "总量",
        "barMaxWidth": 35,
        "barGap": "10%",
        "itemStyle": {
          "normal": {
            "color": "rgba(46,167,212,1)",
            "label": {
              "show": true,
              "textStyle": {
                "color": "#fff"
              },
              "position": "inside",
              formatter: function(p) {
                return p.value > 0 ? (p.value) : '';
              }
            }
          }
        },
        "data": [
          17,
          19,
          24,
          26,
          17,
          14
        ],
      },
      {
        "name": "未完成项目",
        "type": "bar",
        "stack": "总量",
        "barMaxWidth": 35,
        "barGap": "10%",
        "itemStyle": {
          "normal": {
            "color": "rgba(220,167,20,1)",
            "label": {
              "show": true,
              "textStyle": {
                "color": "#fff"
              },
              "position": "inside",
              formatter: function(p) {
                return p.value > 0 ? (p.value) : '';
              }
            }
          }
        },
        "data": [
          1,
          10,
          4,
          6,
          7,
          1
        ],
      }
      ]
    }
  export default{
    methods:{
      goMenu:function (routerName) {
        this.$router.push({name:routerName});
      }
      
      
      
    },
    data(){
      return {
        instType:sessionStorage.getItem("instType"),
        userId:sessionStorage.getItem("userId"),
        option:option,
        halfYear:"",
        instId:"",
        startMonth:"",
        endMonth:"",
        apiCharts:"",
        optionWarn1:0,
        optionWarn2:0,
        optionWarn3:0
      }
    },
    updated(){
        var myConList = echarts.init(document.getElementById('conList'));
              myConList.setOption(this.option);
    },
    created(){
      //监管部门不显示控制台
      if(sessionStorage.getItem("instType")){
        this.instType = sessionStorage.getItem("instType");
        if(this.instType==4){
          this.$router.push({name:"regulatorDeviceInfo"})
        }else{
          if(sessionStorage.getItem("instType")==0){

              this.option.series[0].data = [94,32,23,123,43,64];
              this.option.series[1].data = [64,72,65,168,32,33];
              this.option.series[2].data = [194,32,45,62,86,53];
              this.option.series[3].data = [64,38,29,186,47,62];

              var myConList = echarts.init(document.getElementById('conList'));
              myConList.setOption(this.option);
            this.apiCharts = "/api/bottle/device/over/view/trend/statistics/0";
          }else{
            this.instId = JSON.parse(sessionStorage.getItem("instVos"))[0].instId;
            this.apiCharts = "/api/bottle/device/over/view/trend/statistics/"+this.instId;
          }
          //初始化获取时间
          var nowDate = new Date();
          if(moment(nowDate).format("M")<7){
            this.halfYear = moment(nowDate).format("YYYY")+"-01-"+moment(nowDate).format("YYYY")+"-06";
            this.startMonth = moment(nowDate).format("YYYY")+"-01";
            this.endMonth = moment(nowDate).format("YYYY")+"-06";
          }else{
            this.halfYear = moment(nowDate).format("YYYY")+"-07-"+moment(nowDate).format("YYYY")+"-12";
            this.startMonth = moment(nowDate).format("YYYY")+"-07";
            this.endMonth = moment(nowDate).format("YYYY")+"-12";
          }
          
        }
      }
    },
    mounted(){
      //初始化设备统计报表
      var myConList = echarts.init(document.getElementById('conList'));
      myConList.setOption(this.option);

     /* var warnAll = echarts.init(document.getElementById('device-warn-all'));
      warnAll.setOption(this.optionWarn1);

      var checkAll = echarts.init(document.getElementById('device-warn-check'));
      checkAll.setOption(this.optionWarn2);

      var damageAll = echarts.init(document.getElementById('device-warn-damage'));
      damageAll.setOption(this.optionWarn3);*/
    }
  }
</script>

<style lang="less" scoped>
  .plate{
    font-size:26px;
    background: #fff;
    height:350px;
    padding:0;
    margin-bottom:30px;
  }
  .con-menu{
    padding:36px 0 0 35px;
    text-align:center;
    li{
      height:135px;
      width:175px;
      float: left;
      margin-right:35px;
      margin-top:30px;
      position: relative;
      padding:0;
      cursor:pointer;
      color:#FFF;
      i{
        position: absolute;
        text-align:center;
        top:15px;
        left:40%;
        font-size:34px;
      }
      p{
        position: absolute;
        bottom:15px;
        width:100%;
        text-align: center;
        font-size:18px;
      }
    }
  }
  .con-list{
    height:372px;
    padding:0;
    font-size:26px;
    width:571px;
    float: left;
    background: #fff;
    position: relative;
  }
  .con-msg{
    height:372px;
    background: #fff;
    float: left;
    width:526px;
    font-size:26px;
    padding:0;
    border-right:23px solid #d5dae4;
   }
  #conList{
    width:120%;
    height:120%;
    position: absolute;
    top:-20px;
  }
  .con-tit{
    position: relative;
    button{
      border-radius:6.5px;
      position: absolute;
      width:60px;
      height:32px;
      color:#fff;
      font-size:14px;
      line-height:32px;
      font-weight:100;
      top:10px;
      cursor: pointer;
      z-index: 9999999;
    }
    .show-years{
      position: absolute;
      width:120px;
      height:32px;
      border-bottom:1px solid #17b4a3;
      right:85px;
      top:10px;
      font-size:14px;
      font-weight:100;
      text-align: center;
      line-height:30px;
    }
    .prev-year{
      right:210px;
      background: #f89091;
    }
    .next-year{
      right:20px;
      background: #08c6a4;
    }
  }
  .device-warn{
    margin-top:50px;
    width:120px;
    height:120px;
    float: left;
    margin-right:20px;
    margin-left:25px;
    border:15px solid #CCC;
    box-sizing: border-box;
    border-radius: 100%;
    text-align: center;
    line-height:100px;
    margin-bottom:25px;
    color:#999;
    font-size:36px;
  }
  .device-info{
    float:left;
    padding-left:45px;
    font-size:18px;
    color:#999;
    span{
      margin-right:78px;
    }
  }
</style>
