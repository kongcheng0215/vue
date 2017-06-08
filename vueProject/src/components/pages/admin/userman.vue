<template>
  <div class="device-mange table-com">
    <p class="con-tit">
      <i>用户管理</i>
    </p>
    <div class="changPwd-con">
    <div class="changPwd-left">
      <div class="pwd-list">
        <b>*</b><span>账户名</span>
        <input type="text" name="forgetMobile" v-model="username" @blur="checkPwd"  v-validate="'required|mobile'" placeholder="请输入11位手机号码" 
                     :class="{'is-danger':errors.has('forgetMobile')}">
      </div>
      <div class="pwd-list">
        <b>*</b><span>密码</span>
        <input type="password" v-model="pwdNew" @blur="checkPwd2">
      </div>
      <div class="pwd-list">
        <b>*</b><span>确认密码</span>
        <input type="password" v-model="newPassword">
      </div>
      <input type="radio"  v-model="userType" name="type" value="0"/>公司用户
      <input type="radio"  v-model="userType" name="type" value="1"/>个人用户
    </div>
    
      
    </div>
    <button class="pwd-btn" @click="comitPwd">确定添加</button>
    <button class="pwd-btn pwd-btn-cancel" @click="cancelPwd">取消</button>
    <div class="table-user">
      <v-table-unit
        :titles="titles"
        :api="api"
        :isChange="isChange"
        :listName="listName">
    </v-table-unit>
    </div>
    
  </div>
</template>

<script>
    import vTableUnit from 'components/v-table-unit';
  import store from "store";
  import md5 from 'blueimp-md5';

  export default{
    data(){
      return{
        username:"",
        pwdNew:"",
        newPassword:"",
        isShow:false,
        isShow2:false,
        isChange:true,
        userInfo:{},
        userType:"",
        titles:[
          "序号",
          "登陆账号",
          "用户类型",
          "操作"
        ],
        apiQuery:API+"/api/bottle/loginAdmin",
        api:API+"/api/bottle/loginAdmin",
        apiTime:API+"/api/bottle/loginAdmin",
        listName:"userList"
      }
    },
    components:{
      vTableUnit
    },
    created(){
      this.userType = 0;
    },
    methods:{
      comitPwd:function () {
        if( this.newPassword && this.pwdNew){
          if(this.newPassword==this.pwdNew){
            if(this.userType==0){
                this.userInfo = {
                "instType": 1,
                "user": this.username,
                 "pwd":md5(this.newPassword),
                 "id": Math.ceil(Math.random()*100000),
                "instVos": [
                  {
                    "instId": "0",
                    "instName": "普通用户",
                    "phone": "18408243594",
                    "rank": "66"
                  }
                ],
                "userId": "402881905a93ad02015a93ad75530000",
                "token": "+6lJypFuQLnS3LJgx4cPwrbCRqMdYwb96Qp9nnu9r+VBw2wUoea8DdWXVA3gINyy",
                "username": "公司用户",
                "menus": [
                  {
                    "icon": "iconfont icon-yibiaopan",
                    "id": 34,
                    "name": "我的工作台",
                    "user": "18180215976",
                    "selected": false,
                    "subMenus": []
                  },
                  {
                    "icon": "iconfont icon-dangan",
                    "id": 35,
                    "name": "我的需求发布",
                    "selected": false,
                    "subMenus": [
                      {
                        "icon": null,
                        "id": 39,
                        "name": "发布项目",
                        "routerName": "unitDeviceRegist",
                        "selected": false,
                        "subMenuFunctions": []
                      },
                      {
                        "icon": null,
                        "id": 40,
                        "name": "已发布项目",
                        "routerName": "unitDeviceInfo",
                        "selected": false,
                        "subMenuFunctions": []
                      }
                    ]
                  },
                  {
                    "icon": "iconfont icon-xitong",
                    "id": 38,
                    "name": "系统设置",
                    "selected": false,
                    "subMenus": [
                      {
                        "icon": null,
                        "id": 45,
                        "name": "我的钱包",
                        "routerName": "unitQcApplySure",
                        "selected": false,
                        "subMenuFunctions": []
                      },
                      {
                        "icon": null,
                        "id": 45,
                        "name": "修改密码",
                        "routerName": "unitUpdatePwd",
                        "selected": false,
                        "subMenuFunctions": []
                      },
                      {
                        "icon": null,
                        "id": 45,
                        "name": "个人信息",
                        "routerName": "unitPersonInfo",
                        "selected": false,
                        "subMenuFunctions": []
                      }
                    ]
                  }
                ]
              }
            }else{
              this.userInfo = {   
                "instType": 0,
                "user": this.username,
                 "pwd":md5(this.newPassword),
                 "id": Math.ceil(Math.random()*100000),
                "instVos": [
                  {
                    "instId": "0",
                    "instName": "构造总后台用户"
                  }
                ],
                "userId": "402881905a93ad02015a93ad75530000",
                "token": "+6lJypFuQLnS3LJgx4cPwrbCRqMdYwb96Qp9nnu9r+VBw2wUoea8DdWXVA3gINyy",
                "username": "个人用户",
                "menus": [
                  {
                    "icon": "iconfont icon-yibiaopan",
                    "id": 34,
                    "name": "我的工作台",
                    "user": "18180215975",
                    "selected": false,
                    "subMenus": []
                  },
                  {
                    "icon": "iconfont icon-dangan",
                    "id": 35,
                    "name": "我的众测",
                    "selected": false,
                    "subMenus": [
                      {
                        "icon": null,
                        "id": 39,
                        "name": "可申请项目",
                        "routerName": "checkDeviceMange",
                        "selected": false,
                        "subMenuFunctions": []
                      },
                      {
                        "icon": null,
                        "id": 40,
                        "name": "已申请项目",
                        "routerName": "checkUserOption",
                        "selected": false,
                        "subMenuFunctions": []
                      },
                      {
                        "icon": null,
                        "id": 41,
                        "name": "已完成项目",
                        "routerName": "checkQcOption",
                        "selected": false,
                        "subMenuFunctions": []
                      }
                    ]
                  },
                  {
                    "icon": "iconfont icon-xitong",
                    "id": 38,
                    "name": "系统设置",
                    "selected": false,
                    "subMenus": [
                      {
                        "icon": null,
                        "id": 45,
                        "name": "工资结算",
                        "routerName": "checkQcApplySure",
                        "selected": false,
                        "subMenuFunctions": []
                      },
                      {
                        "icon": null,
                        "id": 45,
                        "name": "修改密码",
                        "routerName": "checkUpdatePwd",
                        "selected": false,
                        "subMenuFunctions": []
                      },
                      {
                        "icon": null,
                        "id": 45,
                        "name": "个人信息",
                        "routerName": "checkPersonInfo",
                        "selected": false,
                        "subMenuFunctions": []
                      }
                    ]
                  }
                ]
              }
            }
            this.$validator.validateAll().then((res)=>{
              this.$http.get(API+"/api/bottle/loginAdmin",{
                params:{
                  user:this.username
                }
              }).then(function(res){
                if(!res.body[0]){
                  this.$http.post(API+"/api/bottle/loginAdmin",this.userInfo).then(function (data) {
                    this.$emit('modalShow',["添加成功"]);
                    this.isChange = ! this.isChange;
                  },function (error) {
                    this.$emit('modalShow',[error.body.message]);
                  })
                }else{
                  this.$emit('modalShow',["账号已存在"]);
                }
              })
              
            })
            
          }else{
            this.$emit('modalShow',["两次输入的密码不一致，请重新输入"]);
          }
        }else{
          this.$emit('modalShow',["输入信息不完全"]);
        }

      },
      cancelPwd:function () {
        this.password = "";
        this.pwdNew = "";
        this.newPassword = "";
        this.isShow = false;
        this.isShow2 = false;
      },
      checkPwd:function () {
        var reg = new RegExp(/^(?:(?!\s).){6,}$/);

        if(reg.test(this.password)){
          this.isShow = false;
        }else{
          this.isShow = true;
        }
      },
      checkPwd2:function () {
        var reg = new RegExp(/^(?:(?!\s).){6,}$/);

        if(reg.test(this.pwdNew)){
          this.isShow2 = false;
        }else{
          this.isShow2 = true;
        }
      }
    }
  }
</script>

<style lang="less">
  .changPwd-con{
    padding:70px 50px 0 100px;
    .invaild{
      position:absolute;
      right:-150px;
      color: red;
      font-size:12px;
    }
  }
  .table-user{
    margin-top:50px;
    margin-left:60px;
    width:60%;
  }
  .pwd-list{
    height:78px;
    width:450px;
    font-size:18px;
    position:relative;
    b{
      color:#be3636;
      margin-right:5px;
      line-height:40px;
    }
    span{
      color:#666;
      line-height:40px;
    }
    input{
      border:1px solid #CCC;
      -webkit-border-radius:6px;
      -moz-border-radius:6px;
      border-radius:6px;
      margin-left:25px;
      width:300px;
      height:44px;
      text-indent:15px;
      float:right;
      &:focus{
         border-radius: 6.5px;
         background-color: #ffffff;
         box-shadow: 0 0 18px 0 rgba(116, 195, 140, 0.77);
         border: solid 1px #74c38c;
       }
    }
  }
  .pwd-btn{
    width:170px;
    height:50px;
    border:0;
    background: #74c38c;
    font-size:18px;
    -webkit-border-radius:;
    -moz-border-radius:;
    border-radius:8px;
    color: #fff;
    margin-left:100px;
    margin-top:20px;
  }
  .pwd-btn-cancel{
    background: #d5dae4;
  }
</style>
