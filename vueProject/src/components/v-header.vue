<template>
 <header>
   <div class="logo">
     海贼王集团后台系统
   </div>
   <div class="header-list">
      <p class="my-plate">
        <i :class="icon"></i>
        <b v-text="header"></b>
      </p>
     <div class="plate-list">
       <p>
          <span class="plate-menu">
            <b>你好 ,</b> <i>{{userName}}</i>
          </span>
          <span class="iconfont  icon-tongzhi"><b>通知</b></span>
          <span class="iconfont icon-tuichu" @click="loginOut"><b>退出</b></span>
       </p>
     </div>
   </div>
 </header>
</template>
<style lang="less">
  header{
    display: flex!important;
    flex-direction: row;
    align-items: center;
    padding: 0 20px 0 0;
    height: 100%;
    position: relative;
  }
  .logo{
    height:59px;
    float:left;
    min-width:235px;
    display: flex;
    align-items: center;
    box-sizing: content-box;
    box-shadow: 3px 0 5px #101318;
    padding:6px 0 0 25px;
    img{
      width:205px;
      height:35px;
      cursor:pointer;
    }
  }
  .header-list{
    float: left;
    height:100%;
    flex:1;
    display: table;
  }
  .my-plate{
    display: table-cell;
    vertical-align: middle;
    padding-left:40px;
    height:100%;
    width:300px;
    i{
      margin-right:15px;
      font-size:25px;
    }
    b{
      font-size:16px;
    }
  }
  .plate-list{
    float: right;
    display: table;
    width:350px;
    height:100%;
    position:absolute;
    right:0;

    p{
      display: table-cell;
      vertical-align: middle;
      font-size:25px;
      cursor: pointer;
      b{
        margin:0 10px 0 5px;
      }
    }
    span{
      font-size:25px;
      cursor: pointer;
    }
    b{
      font-size:16px;
      margin-right:20px;
    }
  }
  .plate-menu{
    color: #fff;
    font-size:16px;
    margin-right:20px;
    i,b{
      font-size:15px;
    }
  }
  .loginOut{
    cursor:pointer;
  }
</style>
<script>
  import store from "store";
  export default{
    methods:{
      loginOut:function () {
        store.remove('isLoginAuto');
        store.remove('userId');
        store.remove('token');
        this.$emit("loginOut");
      }
    },
    data(){
      return {
        userName:sessionStorage.getItem("userName")
      }
    },
    props:{
      header:{
        type:String,
        default:"我的工作台"
      },
      icon:{
        type:String,
        default:"iconfont icon-yibiaopan"
      }
    }
  }
</script>
