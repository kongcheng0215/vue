<template>
  <div class="device-mange table-com">
    <p class="con-tit">
      <i>我的钱包管理</i>
    </p>
    <div class="qcapply">
          <div class="qc-list">
        <span>&nbsp;&nbsp;&nbsp;可用金额：&nbsp;&nbsp;&nbsp;</span> <i>￥</i> <i>3000</i>
      </div>
      <!-- <div class="qc-list">
        <button class="aliPay qc-btn" @click="aliPay">支付宝支付</button>
        <button class="downPay qc-btn" @click="downPay">线下转账</button>
      </div> -->

      <div class="pay-info">
        <p>请您联系公司客服进行提款操作：</p>
        <br><br>
        木叶安全众测平台 <br><br>
        联系电话：028-8712398 <br><br>
        让安全众测合法可信<br><br>
        让天下没有难做的安全生意  
      </div>
     <!--  <div class="btn-show">
       <button class="qc-btn" @click="comitOrder">完成</button>
       <button class="qc-btn qc-btn-cancel" @click="cancelOrder">取消</button>
     </div> -->
    </div>
  </div>
</template>
<script>
  import store from "store";
  export default{
    data(){
      return {
        
        isShowPay:true
      }
    },
    props:{
      number:{
        type:Number,
        default:0
      }
    },
    mounted(){
      $(".downPay").click(function () {
        $(".pay-info").toggle();
        $(".btn-show").toggle();
      })
    },
    methods:{
      comitOrder:function () {
        var date = new Date();
        this.order.userName = sessionStorage.getItem("userName");
        this.order.userId = sessionStorage.getItem("userId");
        this.order.instId = JSON.parse(sessionStorage.getItem("instVos"))[0].instId;
        this.$http.post(API+"/api/bottle/check/inst/qrcode/batch/apply",this.order)
          .then(function (data) {
            if(data.body.code==200){
              this.$emit("modalShow",["申请成功"]);
              this.$router.push({name:"unitIdentityApplyManager"});
            }
          },function (error) {

          })
      },
      cancelOrder:function () {
        this.$router.go(-1);
      },
      downPay:function () {

      },
      aliPay:function () {
        this.$emit("modalShow",["暂时不支持支付宝"]);
      }
    }
  }
</script>
<style lang="less">
  .qc-list{
    width:100%;
    height:68px;
    font-size:22px;
    span{
      color:#666;
      line-height:40px;
    }
    i{
      color: #74c38c;
      font-size:26px;
      margin-left:15px;
    }
  }
  .qc-btn{
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
  .qc-btn-cancel{
    background: #d5dae4;
  }
  .aliPay{
    background: aqua;
    width:200px;
    color: #000;
  }
  .pay-info{
    /*display:none;*/
    border:1px solid #ccc;
    padding:30px 10px;
    width:500px;
    height:300px;
    margin-top:40px;
    margin-left:100px;
    margin-bottom:30px;
  }
  .qc-btn{
    margin-bottom:30px;
  }
</style>
