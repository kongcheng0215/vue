<template>
  <div class="device-mange table-com">
    <p class="con-tit">
      <i>个人信息</i>
    </p>
    <div class="changPwd-con">
      <div class="pwd-list">
        <b>*</b><span>姓名</span>
        <input type="text" v-model="name" >

      </div>
      <div class="pwd-list">
        <b>*</b><span>rank值</span>
        <input type="text">
 
      </div>
      <div class="pwd-list">
        <b>*</b><span>联系方式</span>
        <input type="text" v-model="phone">
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
        name:JSON.parse(sessionStorage.getItem("instVos"))[0].instName,
        rank:JSON.parse(sessionStorage.getItem("instVos"))[0].rank,
        phone:JSON.parse(sessionStorage.getItem("instVos"))[0].phone
      }
    },
    methods:{
      comitPwd:function () {
        if( this.newPassword && this.pwdNew && !this.isShow){
          if(this.newPassword==this.pwdNew){
            this.$http.post(API+'/api/bottle/sys-setting/password/update',
              {
                "userId":sessionStorage.getItem('userId'),
                "password":md5(this.password),
                "newPassword":md5(this.newPassword)
              }).then(function (data) {
              if(data.body.code==200){
                this.$emit("modalShow",[data.body.message]);
                this.password = "";
                this.pwdNew = "";
                this.newPassword = "";
                this.isShow = false;
                this.isShow2 = false;
              }else if(data.body.code==600){
                this.$emit("modalShow",[data.body.message]);
              }
            },function (error) {
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
