
<template>
  <div class="device-mange table-com">
    <p class="con-tit">
      <i>填写项目发布基本信息</i>
    </p>
    <div class="mange-con table-con regist-con">
      <!--填写设备基本信息-->
      <div class="regist-tit">
        填写设备基本信息
      </div>
      <div class="regist-detail">
        <div class="regist-row">
          <span><b>*</b>类别</span>
          <input type="text" v-model="basic.deviceName" name="deviceName" v-validate="'required'" :class="{'is-danger':errors.has('deviceName')}" placeholder="请填写无线安全/Android/Windows/Linux" style="width:400px">
        </div>
         <div class="regist-row">
        <span><b>*</b>测评周期</span>
          <input type="text" v-model="basic.deviceNo" name="deviceNo" v-validate="'required|numeric'" :class="{'is-danger':errors.has('deviceNo')}" style="width:400px" placeholder="天数">
          </div>
      </div>
      <div class="regist-detail">
        <div class="regist-row">
          <span><b>*</b>rank值</span>
          <input type="text" v-model="basic.qualityLicenseNo" name="qualityLicenseNo" v-validate="'required|numeric'" :class="{'is-danger':errors.has('qualityLicenseNo')}" placeholder="rank值" style="width:400px">
        </div>
      </div>
    

      <!--<div class="add-more">
        继续添加技术参数
      </div>-->
    <!--填写设备说明事项-->
      <div class="regist-tit">
        填写测评注意事项
      </div>
      <textarea name="" id="" v-model="basic.memo"></textarea><br />
      <button @click="submitDev" class="regist-but">确定</button>
     <!--  <button @click="submitDev('notComit')" class="regist-but">确定并继续添加</button> -->
      <button @click="cancelDev" class="cancelDev regist-but">取消</button>
    </div>
  </div>
</template>

<script>
  import store from "store";
  import {Calendar} from 'vue-date-range';
  import moment from "moment"
  export default{
    data(){
      return{
        basic:{}
      }
    },
    components:{
     
    },
    mounted(){
      
    },
    created(){
      this.basic.deviceNo="",
      this.basic.deviceName="",
      this.basic.qualityLicenseNo=""
    },
    methods:{
      submitDev:function (notComit) {
//        this.basic.instId = JSON.parse(sessionStorage.getItem("instVos"))[0].instId;
      this.$validator.validateAll().then((res)=>{
        var id = Math.ceil(Math.random()*100000);
          this.$http.post(API+"/api/bottle/info",{
                "createTime": moment().add('days',this.basic.deviceNo).format('YYYY-MM-DD'),
                "deviceName": "0%",
                "deviceNo": this.basic.deviceName,
                "deviceType": moment().format("YYYY-MM-DD"),
                "memo": this.basic.memo,
                "qualityLicenseNo": this.basic.qualityLicenseNo,
                "useUnit": moment().add('days',this.basic.deviceNo).format('YYYY-MM-DD'),
                "rankless":39,
                "rank":5,
                "id":id
            }).then(function(res){
               this.$http.post(API+"/api/bottle/canApplyProject",{
                  "createTime": moment().add('days',this.basic.deviceNo).format('YYYY-MM-DD'),
                  "deviceName": "0%",
                  "deviceNo": this.basic.deviceName,
                  "deviceType": moment().format("YYYY-MM-DD"),
                  "memo": this.basic.memo,
                  "qualityLicenseNo": this.basic.qualityLicenseNo,
                  "useUnit": moment().add('days',this.basic.deviceNo).format('YYYY-MM-DD'),
                  "rankless":39,
                  "rank":5,
                  "id":id
                }).then(function(res){
                  this.$emit("modalShow",["添加成功！"]);
                },function(err){

                })
             
        },function(err){

        })
      }).catch((err)=>{
        this.$emit("modalShow",["请将信息输入完整！"]);
      })
        //根据code拼接出厂地址name
      },
      cancelDev:function () {
        this.$router.go(-1);
      }
    }
  }

</script>

<style lang="less" scoped>
  .regist-con{
    padding:32px 20px 0 76px;
    color: #6f7580;
    font-size:18px;
    min-width:1300px;
    textarea{
      border:1px solid #74c38c;
      width:430px;
      height:200px;
      margin-left:100px;
    }
    button{
      width:160px;
      height:45px;
      border-radius: 6.5px;
      background-color: #74c38c;
      color: #fff;
      font-size: 22px;
      margin-left:80px;
      margin-right:80px;
      margin-top:50px;
      margin-bottom:40px;
    }
    .cancelDev{
      background: #CCC;
    }
  }
  .table-con .regist-but{
    font-size:20px;
    margin:50px 40px;
  }
  .regist-tit{
    color: #333;
    margin-bottom:40px;
    margin-left:-30px;
    font-weight:bold;
  }
  .regist-row{
    margin-bottom:25px;
    height:40px;
    position:relative;
    .weight-kg{
      position: absolute;
      left:935px;
      top:6px;
    }
    b{
      color: #be3636;
      margin-right:10px;
    }
    &>span{
      width:155px;
      display: inline-block;
      height:60px;
      text-align: center;
    }
    input[type="text"],.deviceType{
      width:290px;
      height: 37px;
      border:1px solid #ccc;
      text-indent:20px;
      -webkit-border-radius:6.5px;
      -moz-border-radius:6.5px;
      border-radius:6.5px;
      margin-right:60px;
    }
    input:focus{
      border-radius: 6.5px;
      background-color: #ffffff;
      box-shadow: 0 0 18px 0 rgba(116, 195, 140, 0.77);
      border: solid 1px #74c38c;
    }
    select{
      border:1px solid #ccc;
      width:140px;
      height: 43px;
      border-radius:6.5px;
      text-align: center;
      font-size:15px;
    }
    .district{
      margin-right:60px;
    }
    i{
      text-align: right;
    }
    input[type="radio"]{
      width:25px;
      height:25px;
      float: left;
      margin-right:10px;
    }

    em{
      display: inline-block;
      margin-top:5px;
      float: left;
      margin-right:60px;
    }
  }
  .regist-add{
    height:120px;
    position: relative;
    span{
      width:155px;
      display: inline-block;
      height:35px;
      text-align: center;
    }
  }
  .add-details{
    position: absolute;
    bottom:0;
    left:160px;
    top:65px;
    font-size:18px;
  }
  .right-unit{
    width:520px;
    height: 30px;
    float:left;
    position:relative;
    span{
      width:155px;
      display: inline-block;
      height:35px;
      text-align: center;
    }
    i{
      position: absolute;
      top:5px;
      right:80px;
    }
    .right-unit-select{
      width:290px;
      height:37px;
    }
  }
  .add-more{
    height:100px;
    padding-top:30px;
    color:#74c38c;
    font-size:26px;
    cursor:pointer;
  }
  .regist-row2{
    width:630px;
  }
  .time-main{
    width:290px;
    position:relative;
    display:inline-block;
    margin-right:60px;
  }
  .time-con{
    position:absolute;
    z-index:9999;
    display:none;
  }

  .use-ul{
    width:380px;
    overflow: hidden;
    min-height:43px;
    border:1px solid #CCC;
    border-top:0;
    position: absolute;
    top:37px;
    z-index:99999;
    background:#eee;
    display:none;
    li{
      min-height:40px;
      text-indent:20px;
      line-height:40px;
      cursor:pointer;
      &:hover{
         background: #74c38c;
         color:#FFF;
       }
    }
  }
  #unit-chose{
    width:380px;
  }

</style>
