<template>
  <div>
    <div v-if="isNotLogin" class="login-con">
      <!--登录模块-->
        <div class="login option-con" v-if="isNotForget">
          <p class="login-tit">海贼王集团后台系统</p>
            <input type="tel"
                    class="form-control login-user"
                    v-model="userName"
                    placeholder="请输入账号"
                    autocomplete="on"
                    name="mobile"
                    v-validate="'required|mobile'"
                    :class="{'is-danger': errors.has('mobile') }"
                    required>
            <input type="password"
                   class="form-control login-pwd"
                   v-model="userPwd"
                   placeholder="请输入密码"
                   name="userPassword"
                   v-validate="'required'"
                   :class="{'is-danger': errors.has('userPassword') }"
                   autocomplete="off"
                   @keyup.enter ="goLogin"
                   required>

            <p class="login-opt">
              <input class="remberPwd" v-model="isLoginAuto" type="checkbox" @click="saveRember">
              <b>下次自动登录</b>
              <span @click="goForget">忘记密码</span>
            </p>
            <!--<input type="submit"  @click="goLogin" class="goLogin" value="登录"/>-->
            <button @click="goLogin" class="goLogin">登录</button>
        </div>
      <!--找回密码模块-->
      <div :class="optionPwd"  v-else="isNotForget">
        <!--找回密码第一步-->
        <div class="for-pwd1" v-if="isForgetOne">
          <p class="login-tit">忘记密码</p>
            <p class="for-grop1">
              <label for="phoneNum">登录账号</label>
              <input type="text"
                     class="form-control forget-user"
                     placeholder="请输入手机"
                     id="phoneNum"
                     v-model="forgetPhone"
                     title="请输入11位电话号码"
                     pattern="^1(3|4|5|7|8)\d{9}$"
                     autocomplete
                     name="forgetMobile"
                     v-validate="'required|mobile'"
                     :class="{'is-danger':errors.has('forgetMobile')}"
                     required>
            </p>
            <p class="for-grop1 for-grop2">
              <label for="code1">验证码</label>
              <input type="text"
                     class="form-control forget-vali"
                     placeholder="请输入验证码"
                     id="code1"
                     v-model="forgetCode"
                     name="imgValidate"
                     v-validate="'required'"
                     :class="{'is-danger':errors.has('imgValidate')}"
                     required>
              <img :src="dataImg" v-if="change" alt="" class="img-validate">
              <span class="reGetVali" @click="changeImg">换一张</span>
            </p>
            <button @click="goForget2" class="goLogin">下一步</button>
        </div>
        <!--找回密码第二步-->
        <div v-else="isForgetOne" id="getModefinePwd">
          <p class="login-tit">忘记密码</p>
          <p class="msg-success"><span class="iconfont icon-right_line" style="color:#74c38c;margin:-5px 10px 0 0 "></span>短信验证码已发送到 <span>{{forgetPhone}}</span></p>
            <p class="for-grop1 for-grop3">
              <label for="phoneCode">短信验证码</label>
              <input type="text" class="form-control forget-user" v-model="msgCode" placeholder="请输入短信验证码" id="phoneCode">
              <button @click="reGetCode">重新获取</button>
            </p>
            <div id="for-newpwd1">
              <span>设置新密码</span>
              <input type="password" class="form-control" v-model="setNewPwd" name="setNewPwd" v-validate="'pwd'" :class="{'is-danger': errors.has('setNewPwd') }">
            </div>

            <div id="for-newpwd2">
              <span>确认新密码</span>
              <input type="password" class="form-control" v-model="newPwd" name="newPwd" v-validate="'pwd'" :class="{'is-danger': errors.has('newPwd') }">
            </div>
            <button class="submitPwd" @click="submitPwd">提交</button>

        </div>
      </div>
    </div>

    <!--登录slogin信息-->
    <div v-if="isNotLogin" class="login-con login-info">

    </div>

    <div v-else="isNotLogin">
        <div class="head">
          <v-header @loginOut="loginOut" :header="header" :icon="icon"></v-header>
        </div>
        <div class="menu-side">
          <menu-side :menuList="menus" @changeHeader="changeHeader"></menu-side>
        </div>
        <div id="main-right">
          <router-view keep-alive @addModal="addModal" :freshTable="freshTable" @modalShow="modalShow"></router-view>
        </div>
    </div>
    <div class="modal-tip">{{modalTip}}</div>
  </div>
</template>

<script>
  import vHeader from 'components/v-header';
  import menuSide from 'components/menu-side';
  import md5 from 'blueimp-md5';
  import store from 'store';


  //生成UUID
  function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }
  /*var headerMsg = ["我的工作台","iconfont icon-yibiaopan"];
  store.set("headerMsg",headerMsg);*/
  export default {
    name: 'app',
    created:function (){
     if(store.get("isLoginAuto")){
       this.$http.post(API+'/api/bottle/login',{"mobile":store.get("mobile"),"password":store.get("password")}).then(function (data) {
         var msg = data.body;
         if(msg.code==200){
           sessionStorage.setItem("userId",msg.data.userId);
           sessionStorage.setItem("token",msg.data.token);
           sessionStorage.setItem("instVos",JSON.stringify(msg.data.instVos));
           sessionStorage.setItem("userName",msg.data.username);
           sessionStorage.setItem("instType",msg.data.instType);

           if(this.isLoginAuto){
             store.set("mobile",userName);
             store.set("password",userPwd);
           }
           //获取菜单列表
           this.$http.get(API+'/api/bottle/menu/main/'+msg.data.userId).then(function (data) {
             this.menus = data.body.data.menus;
             this.isNotLogin=false;
             sessionStorage.setItem("menuList",JSON.stringify(this.menus));
//                store.set("menuList",this.menus);
           },function (error) {
             alert(error.body.message)
           })
           //获取机构列表
           this.$http.get(API+'/api/bottle/user/'+msg.data.userId+'/inst/query').then(function (data) {

           },function (error) {

           })
         }else if(msg.code==600){
           alert(msg.message);
         }
       },function (error) {
         alert(error.body.message)
       })
     }
     if(sessionStorage.getItem("userId")){
       this.$http.get(API+'/api/bottle/menu/main/'+sessionStorage.getItem('userId')).then(function (data) {
         this.menus = data.body.data.menus;
         this.isNotLogin=false;
       },function (error) {

       })
     }
    },
    updated:function () {

    },
    mounted:function () {
      //正则验证
      var that = this;
      //电话号码检验
      $(".login-user").blur(function () {
        var reg = new RegExp(/^1(3|4|5|7|8)\d{9}$/);
        if(reg.test(that.userName)){
          that.phoneStatu = true;
        }else{
          that.phoneError = true;
          $(".modal-tip").slideDown();
          setTimeout(function () {
            $(".modal-tip").slideUp();
          },1500)
        }
      });
    },
    data(){
      return {
        menus: {},
        isNotLogin:true,//是否已登录
        isNotForget:true,//是否显示忘记密码模块第一步
        isForgetOne:false,
        isLoginAuto:false,//是否自动登录
        optionPwd:"option-con",//忘记密码模块中输入密码的css类名
        userName:"",//登录用户名
        userPwd:"",//登录密码
        forgetCode:"",//忘记密码图片验证码
        forgetPhone:"",//忘记密码的手机号
        uuid:"",//忘记密码过程生成唯一UUID码
        change:true,
        dataImg:'',//获取图片验证码后的图片base64字符
        phoneError:false,//电话号码格式输入校验状态
        msgCode:"",//短信验证码
        newPwd:"",//找回密码的新密码
        setNewPwd:"",//找回密码第一次输入
        isAddOrg:false,//机构设置是否弹出添加机构摸态框
        orgInfo:{},//机构信息
        isRemove:false,//设备是否弹出报废摸态框
        isGetQc:false,//设备是否弹出赋码摸态框
        isDestroy:false,//二维码是否弹出损坏摸态框
        qcCode:"",//输入的二维码唯一身份码
        modalId:0,//摸态框传入的需要操作的ID
        freshTable:false,
        icon:"",//传入header的icon
        header:"",//传入header的name
        isSetedQr:false,//判断赋码框是否赋码
        modalTip:"请输入正确的电话号码！"//摸态框提示信息
      }
    },
    methods:{
      saveRember:function () {
        //点击自动登录，保存是否自动登录状态
        if(this.isLoginAuto){
          store.set("isLoginAuto",this.isLoginAuto)
        }else{
          store.remove("isLoginAuto");
        }
      },
      loginOut:function () {
        //退出登录
        sessionStorage.clear();
        store.clearAll();
        window.location.href=APIOUT;
      },
      go:function () {
        console.log(this.isRember);
      },
      goForget:function () {
        this.uuid = uuid();
        this.isNotForget = false;
        this.isForgetOne = true;
        this.$http.get(API+'/api/bottle/validate/img',{params:{uuid:this.uuid}}).then(function (data) {
          this.dataImg="data:image/png;base64,"+data.body.image;
        });
      },
      changeHeader:function (param) {
        sessionStorage.setItem("headerMsg",JSON.stringify(param));
        this.header = JSON.parse(sessionStorage.getItem("headerMsg"))[0];
        this.icon = JSON.parse(sessionStorage.getItem("headerMsg"))[1];
      },
      changeImg:function () {
        //获取图片验证码
        this.$http.get(API+'/api/bottle/validate/img',{params:{uuid:this.uuid}}).then(function (data) {
          console.log(this.uuid);
          this.dataImg="data:image/png;base64,"+data.body.image;
        })
        this.change=false;
        this.change=true;
      },
      goForget2:function () {
        //模拟成功
//        this.isForgetOne = false;
//        this.optionPwd = "option-con2";

        //校验图片验证码

        if(
            !this.errors.has("forgetMobile")
        ){
          if(!this.errors.has("imgValidate")&& this.forgetCode){
            this.$http.post(API+"/api/bottle/check/account",
              {"mobile":this.forgetPhone,
                "imageCode":this.forgetCode,
                "uuid":this.uuid}).then(function (data) {
              if(data.body.code==200){
                //图片验证码检验成功，显示忘记密码第二部
                this.isForgetOne = false;
                this.optionPwd = "option-con2";
                //图片验证码检验成功，发送短信验证码
                this.$http.get(API+"/api/bottle/code/"+this.forgetPhone,{params:{"uuid":this.uuid}}).then(function (data) {
                  if(data.body.code==200){
                    //发送成功
                    this.modalShow(["验证码发送成功"]);
                  }else if(data.body.code==600){
                    this.modalShow([data.body.message]);
                  }
                },function (error) {
                  this.modalShow(["短信验证码发送失败！"]);
                })
              }else if(data.body.code==600){
                this.modalShow([data.body.message]);

              }
            },function () {

            });
          }else{
            this.modalShow(["请输入验证码！"]);
          }

        }else{
          this.modalShow(["请输入正确的手机号！"]);
        }


      },
      //登陆验证username查表  数据在test,json  在根目录下面
      goLogin:function () {
        /*md5加密md5(this.userPwd)*/
        //调用后台接口
        var userName = Number(this.userName);
        var userPwd2 = md5(this.userPwd);
        if(!this.errors.has('mobile') && !this.errors.has('userPassword')){
          this.$http.get(API+'/api/bottle/loginAdmin',{
            params:{
              user:userName
            }
          })
          .then(function (data) {
            console.log(data.body[0]);
              if(data.body[0]){//验证账号是否存在
                if(data.body[0].pwd==userPwd2){
                  var msg = data.body[0];

                  sessionStorage.setItem("userId",msg.userId);
                  sessionStorage.setItem("id",msg.id);
                  sessionStorage.setItem("token",msg.token);
                  sessionStorage.setItem("instVos",JSON.stringify(msg.instVos));
                  sessionStorage.setItem("userName",msg.username);
                  sessionStorage.setItem("instType",msg.instType);
                  this.modalShow(["登录成功"]);

                  this.menus = msg.menus;
                  this.isNotLogin=false;
                  sessionStorage.setItem("menuList",JSON.stringify(this.menus));
                }else{
                  this.modalShow(["密码不正确"]);
                }
              }else{
                this.modalShow(["用户名不存在"]);
              }


          },function (error) {
            this.modalShow(["用户名不存在"]);
          })
        }else{
          if(!this.errors.has('mobile')){
            this.modalShow(["请输入密码！"])
          }else{
            this.modalShow(["请输入正确的手机号码！"]);
          }

        }
      },

      reGetCode:function () {
        //重新获取验证码
        this.$http.get(API+"/api/bottle/code/"+this.forgetPhone,{params:{"uuid":this.uuid}}).then(function (data) {
          if(data.body.code==200){
            //发送成功
            this.modalShow(["验证码发送成功"]);
          }
        },function (error) {
          this.modalShow(["验证码发送失败"]);
        })
      },
      submitPwd:function () {
        if(this.newPwd && this.setNewPwd){
          if( !this.errors.has('setNewPwd')&& !this.errors.has('newPwd')){
            if(this.newPwd==this.setNewPwd){
              if(this.msgCode){
                this.$http.post(API+"/api/bottle/update/password",{"uuid":this.uuid,"mobile":this.forgetPhone,"messageCode":this.msgCode,"password":md5(this.newPwd)}).then(function (data) {
                  if(data.body.code==200){
                    this.modalShow(["密码修改成功"]);
                    this.isNotForget = true;
                    this.isForgetOne = false;
                    this.isLoginAuto = false;
                  }else{
                    this.modalShow([data.body.message]);
                  }
                },function () {

                })
              }else{
                this.modalShow(["请输入短信验证码！"]);
              }
            }else{
              this.modalShow(["两次输入的密码不一致！"]);
            }
          }else{
            this.modalShow(["密码必须大于六位！"]);
          }
        }else{
          this.modalShow(["请输入密码！"]);
        }

      },
      //弹出摸态框
      addModal:function (modal) {
        console.log(modal);
        this.modalId = modal[1];
        this[modal[0]] = true;
        if(modal[2]){
          this.isSetedQr = true;
        }else{
          this.isSetedQr = false;
        }
      },
      //提示摸态框
      modalShow:function (text) {
        if(text){
          this.modalTip = text[0];
        }
        $(".modal-tip").slideDown();
        setTimeout(function () {
          $(".modal-tip").slideUp();
        },1500)
      }
    },
    components:{
      vHeader,menuSide
    }
  }
</script>

<style lang="less">
  @import 'assets/css/comStyle.less';
  .login-bottom{
    position: absolute;
    bottom:20px;
    color: #FFF;
    left:50%;
    margin-left:-130px;
  }
  .add-org{
    position: absolute;
    width:100%;
    height:100%;
    background: rgba(0,0,0,0.6);
    z-index:999;
  }
  .add-org-list{
    padding-left:61px;
    float:left;
    width:100%;
    margin-bottom:20px;
    span,input{
      font-size:18px;
    }
    input{
      float: right;
      width:312px;
      height:43px;
      color: #999;
      margin-right:40px;
      border-radius:8px;
    }
    span{
      float: left;
      color: #666;
      line-height:43px;
      margin-right:15px;
    }
    select{
      float: right;
      margin-right:40px;
      width:80px;
      height:40px;
      border:1px solid #ccc;
    }
    .org-add-detail{
      padding-left:149px;
    }
  }
  .add-org-btn{
    padding-left:130px;
  }
  .add-org-con{
    width:521px;
    height:536px;
    margin:0 auto;
    background: #fff;
    margin-top:200px;
    .add-org-inpt:focus {
      border-radius: 6.5px;
      background-color: #ffffff;
      box-shadow: 0 0 18px 0 rgba(116, 195, 140, 0.77);
      border: solid 1px #74c38c;
    }
    button{
      margin-top:40px;
      float: left;
      width:120px;
      height:42px;
      margin-right:36px;
      background: #74c38c;
      -webkit-border-radius:8px;
      -moz-border-radius:8px;
      border-radius:8px;
      color:#fff;
      font-size:18px;
    }
  }
  .remove-con,.getQc-con{
    color: #666;
    font-size:18px;
    height:300px;
    width:400px;
    position:relative;
    .modal-tit{
      height:50px;
      line-height:50px;
      text-align: center;
      font-size:24px;
    }
    .modal-bottom{
      position: absolute;
      width:100%;
      height:50px;
      bottom:0;
      button{
        margin:7px 30px 0 20px;
      }
      button:nth-child(2){
        margin-right:0;
      }
    }
  .remove-hint{
    text-align:center;
    margin:30px 0;
    padding:0 30px;
    color: #999;
    input{
      color: #999999;
      text-indent: 20px;
      border:1px solid #CCC;
      -webkit-border-radius:;
      -moz-border-radius:;
      border-radius:8px;
      height: 40px;
      width: 280px;
      margin-bottom: 38px;
      &:focus {
         border-radius: 8px;
         background-color: #ffffff;
         box-shadow: 0 0 18px 0 rgba(116, 195, 140, 0.77);
         border: solid 1px #74c38c;
       }
    }
  }

  }
  .login-con{
    position: absolute;
    left:0;
    right:0;
    bottom: 0;
    top:0;
    background: url("assets/images/bg.png") no-repeat;
    background-size: cover;
  }
  .login-info{
    position: absolute;
    width:433px;
    left:18%;

    height:395px;
    top:50%;
    margin-top:-198px;
  }
  .option-con{
    position: absolute;
    padding:0 88px;
    left:50%;
    top:50%;
    margin-top:-198px;
    width: 540px;
    height: 395px;
    background-color: #ffffff;
    box-shadow: 0 0 18px 0 rgba(21, 78, 108, 0.77);
    input {
      color: #999999;
      font-size: 18px;
      text-indent: 20px;
      height: 56px;
      width: 360px;
      margin-bottom: 24px;
      &:focus {
         border-radius: 6.5px;
         background-color: #ffffff;
         box-shadow: 0 0 18px 0 rgba(116, 195, 140, 0.77);
         border: solid 1px #74c38c;
       }
    }
    .remberPwd{
      width: 18px;
      height: 18px;
      border-radius: 6.5px;
      background-color: #fff;
      border: solid 1px #d5dae4;
      box-shadow: none;
      float: left;
      margin-right:19px;
      margin-top:4px;
      &:focus{
          box-shadow: none;
       }
    }
    .forget-user{
      width:330px;
      height:57px;
      font-size:18px;
    }
    .for-grop1{
      margin-left:-50px;
      overflow:hidden;
      label{
        float: left;
        color: #666666;
        font-size:18px;
        line-height:57px;
        font-weight:normal;
        margin-right:10px;
      }
      input{
        float: left;
      }
    }
    .for-grop2{
      margin-left:-33px;
      input{
        width:180px;
        font-size:18px;
      }
      img{
        width:82px;
        height:57px;
        margin-left:11px;
        margin-top:0px;
      }
    }
  }
  .option-con2{
    position: absolute;
    padding:0 88px;
    left:50%;
    top:50%;
    margin-top:-198px;
    /*margin-right:-270px;*/
    width: 540px;
    min-height: 395px;
    background-color: #ffffff;
    box-shadow: 0 0 18px 0 rgba(21, 78, 108, 0.77);
    input {
      color: #999999;
      font-size: 26px;
      text-indent: 20px;
      height: 57px;
      width: 380px;
      margin-bottom: 15px;
    &:focus {
       border-radius: 6.5px;
       background-color: #ffffff;
       box-shadow: 0 0 18px 0 rgba(116, 195, 140, 0.77);
       border: solid 1px #74c38c;
     }
    }
    .remberPwd{
      width: 18px;
      height: 18px;
      border-radius: 6.5px;
      background-color: #fff;
      border: solid 1px #d5dae4;
      box-shadow: none;
      float: left;
      margin-right:19px;
      margin-top:4px;
    &:focus{
       box-shadow: none;
     }
    }
    .for-grop1{
      margin-left:-50px;
      label{
        float: left;
        color: #666666;
        font-size:18px;
        line-height:57px;
        font-weight:normal;
        margin-right:10px;
      }
      input{
        float: left;
      }
    }

    .msg-success{
      color: #999;
      font-size:18px;
      padding-left:50px;
      margin-bottom:20px;
    }
    .for-grop3{
      width:470px;
      label{
        margin-right:20px;
      }
      input{
        width:202px;
        height:47px;
        font-size:18px;
      }
      button{
        width: 110px;
        height: 47px;
        border-radius: 6.5px;
        background-color: #74c38c;
        border:0;
        color: #fff;
        font-size:18px;
        margin-left:10px;
      }
    }
    #for-newpwd1,#for-newpwd2{
      width:489px;
      height:60px;
      display:block;
      margin-left:-50px;
      position:relative;
      margin-top:23px;
      span{
        float: left;
        color: #666666;
        font-size:18px;
        line-height:57px;
        font-weight:normal;
        position: absolute;
        left:0;
      }
      input{
        float: left;
        width:320px;
        height:47px;
        position: absolute;
        right:58px;
      }
    }
    #getModefinePwd{

    }
    .submitPwd{
      width: 176px;
      height: 59px;
      border-radius: 30px;
      background-color: #4dda93;
      border:0;
      color: #fff;
      font-size:18px;
      margin:20px 0 20px 100px;
    }
  }
  .reGetVali{
    float: right;
    text-decoration: underline;
    color: #38a4e1;
    font-size:18px;
    line-height:80px;
    cursor: pointer;
  }
  .login-opt{
    font-size:18px;
    color:#999;
    span{
      cursor: pointer;
      color:#74c38c;
      float: right;
    }
  }
  .login-tit{
    text-align: center;
    color: #74c38c;
    font-size:28px;
    margin-top:31px;
    margin-bottom: 30px;
  }
  .option-con .goLogin{
    width: 177px;
    height: 56px;
    border-radius: 40px;
    background-color: #4dda93;
    color: #fff;
    font-size:18px;
    margin-left:100px;
    margin-top:10px;
  }
  button{
    border:0;
  }

  /*.for-pwd2{*/
    /*color: #999;*/
    /*height:689px;*/
    /*font-size:26px;*/
    /*p:nth-child(2){*/
      /*margin-top:-20px;*/
    /*}*/

  /*}*/



  .head{
    height:65px;
    background: #21262f;
    color:#aaa;
    font-size:22px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .menu-side{
    position: absolute;
    z-index: 1;
    top: 65px;
    left: 0;
    bottom: 0;
    background: #2c313c;
    overflow: auto;
    color:#aaa;
    font-size:18px;
    width:260px;
  }
  #main-right{
    padding:20px;
    position: absolute;
    background: #d5dae4;
    z-index: 800;
    left: 260px;
    top: 65px;
    right: 0;
    bottom: 0;
    overflow: auto;
    &:after{
       content:'s';
       display: block;
       overflow: hidden;
       visibility:hidden;
       clear: both;
    }
  }
  .modal-tip{
    display: none;
    height:65px;
    width:100%;
    background: #74c38c;
    position: absolute;
    top:0;
    z-index:9999999;
    text-align: center;
    line-height:65px;
    font-size:22px;
    color: #fff;
  }

</style>
