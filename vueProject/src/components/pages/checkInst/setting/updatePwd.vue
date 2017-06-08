<template>
  <div class="device-mange table-com">
    <p class="con-tit">
      <i>修改密码</i>
    </p>
    <div class="changPwd-con">
      <div class="pwd-list">
        <b>*</b><span>当前密码</span>
        <input type="password" v-model="password" @blur="checkPwd">
        <span v-show="isShow" class="invaild">密码必须大于六位</span>
      </div>
      <div class="pwd-list">
        <b>*</b><span>新密码</span>
        <input type="password" v-model="pwdNew" @blur="checkPwd2">
        <span v-show="isShow2" class="invaild">密码必须大于六位</span>
      </div>
      <div class="pwd-list">
        <b>*</b><span>确认密码</span>
        <input type="password" v-model="newPassword">
      </div>
    </div>
    <button class="pwd-btn" @click="comitPwd">确定</button>
    <button class="pwd-btn pwd-btn-cancel" @click="cancelPwd">取消</button>
  </div>
</template>

<script>
  import store from "store";
  import md5 from 'blueimp-md5';

  export default{
    data(){
      return{
        password:"",
        pwdNew:"",
        newPassword:"",
        isShow:false,
        isShow2:false,
        userInfo:{},
        id:sessionStorage.getItem("id")
      }
    },
    methods:{
      comitPwd:function () {
        if( this.newPassword && this.pwdNew && !this.isShow){
          if(this.newPassword==this.pwdNew){

            this.$http.get(API+"/api/bottle/loginAdmin",{
              params:{
                id:this.id
              }
            }).then(function(res){
              if(res.body[0].pwd==md5(this.password)){
                this.userInfo = res.body[0];
                this.userInfo.pwd = md5(this.pwdNew);
                this.$http.delete(API+"/api/bottle/loginAdmin/"+this.id).then(function(res){
                  this.$http.post(API+"/api/bottle/loginAdmin",this.userInfo).then(function(res){
                     this.password = "";
                    this.pwdNew = "";
                    this.newPassword = "";
                    this.isShow = false;
                    this.isShow2 = false;
                     this.$emit("modalShow",["修改密码成功"]);
                  })
                })
              }else{
                this.$emit("modalShow",['当前密码不正确'])
              }
              
            })

          }else{
            this.$emit("modalShow",['两次输入的密码不一致，请重新输入'])

          }
        }else{
          this.$emit("modalShow",['输入信息不完全'])
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
