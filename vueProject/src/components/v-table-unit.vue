<template>
      <div class="table-responsive">
        <table class="table table-hover table-bordered table-list">
          <thead>
          <tr>
            <th v-for="title in titles">{{title}}</th>
          </tr>
          </thead>
          <tbody>
          
          <!--已发布项目-->
          <tr v-for="(data,index) in lists.deviceOptionLists" v-if="lists.deviceOptionLists">
            <td v-text="index+1"></td>
            <td v-text="data.qualityLicenseNo"></td>
            <td v-text="data.deviceNo"></td>
            <td v-text="data.deviceName"></td>
            <td v-text="data.deviceType"></td>
            <td v-text="data.createTime"></td>
            <td v-text="data.memo"></td>
            <td>
              <span @click="delList(data.id)" class="option" v-if="instType!=0">删除</span>
              <span @click="applyList(data)" class="option" v-else="instType!=0">申请</span>
            </td>
          </tr>
<!--用户列表-->
          <tr v-for="(data,index) in lists.userList" v-if="lists.userList">
            <td v-text="index+1"></td>
            <td v-text="data.user"></td>
            <td v-text="data.username"></td>
            <td>
               <span @click="delIser(data.id)" class="option">删除</span>
            </td>
          </tr>

          </tbody>
          <tfoot>
          </tfoot>
        </table>
        <br/>
        <div class="botpage">
          <boot-page
            ref="page"
            :pages="pages"
            :size="size"
            @getData="getData"
            @refresh="refresh"
          >
          </boot-page>
        </div>
      </div>
</template>

<script>
  import moment from 'moment';
  import bootPage from 'components/BootPage.vue';
  import store from 'store';
  var list = {};
  export default {
    data () {
      return {
        userId:sessionStorage.getItem('userId'),
        instType:sessionStorage.getItem("instType"),
        pageSize:10,
        page:0,
        pages:0,
        lists:{},
        instName:"",
        size:0,
        numberAll:0,
        _page:1
      }
    },
    components: {
      bootPage
    },
    props:{
      titles:{
        type:Array
      },
      api:{
        type:String
      },
      listName:{
        type:String
      },
      query:{
        type:String
      },
      flag:{

      },
      startDate:{
        type:String
      },
      endDate:{
        type:String
      },
      isChange:{
        type:Boolean
      },
      deviceBatchId:{
        type:String
      },
      status:{
        type:Number
      }
    },
    created(){
    
      this.$http.get(this.api,{
        params:{

        }
      }).then(function(res){
        this.numberAll = res.body.length;
        this.getData();
      });

    },
    updated(){
      //接收查询事件
//      this.$root.eventHub.$on('paramsQuery',this.paramsQuery);
    },
    mounted(){
      //绑定类型点击切换样式
      $(".pull-left span").click(function () {
        $(".pull-left span").removeClass("active-qc");
        $(this).addClass("active-qc");
      })
    },
    methods: {
      refresh () {
        this.$refs.page.refresh();
      },
      delList:function(id){
        this.$http.delete(this.api+"/"+id).then(function(res){
          this.getData();
        },function(err){

        })
      },
      applyList(list){
        this.$http.post(API+"/api/bottle/applyedProject",list).then(function(res){
            this.$http.delete(this.api+"/"+list.id).then(function(res){
              this.getData();
            },function(err){

            })
        },function(err){

        })
      },
      delIser(id){
        this.$http.delete(this.api+"/"+id).then(function(res){
          this.getData();
        },function(err){

        })
      },
      //从分页传入当前页触发获取信息
      getData:function (data) {
        var listName = this.listName;
        var obj = {
          listName:null
        }
        this.lists = Object.assign({}, this.lists, obj);
        if(data){
          this._page = Number(data.page)+1;
        }
        this.$http.get(this.api,{
        params:{
          "_limit":10,
          "_page":this._page
        }
      })
        .then(function (data) {
            this.size = this.numberAll;
            this.lists[this.listName]=data.body;

            //循环格式化时间
            var length = this.lists[this.listName].length;
            for(var i=0;i<length;i++){
              this.lists[this.listName][i].updateTime = moment(this.lists[this.listName][i].updateTime).format("YYYY-MM-DD");
              this.lists[this.listName][i].createTime = moment(this.lists[this.listName][i].createTime).format("YYYY-MM-DD");
              this.lists[this.listName][i].applyDate = moment(this.lists[this.listName][i].applyDate).format("YYYY-MM-DD");
              this.lists[this.listName][i].nextCheckDate = moment(this.lists[this.listName][i].nextCheckDate).format("YYYY-MM-DD");
              this.lists[this.listName][i].validDate = moment(this.lists[this.listName][i].validDate).format("YYYY-MM-DD");
            }

            if(this.listName=="deviceCheckLists"){
              for(var i=0;i<this.lists.deviceCheckLists.length;i++){
                this.lists.deviceCheckLists[i].checkDate = this.lists.deviceCheckLists[i].checkDate.split(" ")[0];
              }
            }

            if(this.listName=="deviceOrderInfoLists"){
              for(var i=0;i<length;i++){
                this.lists[this.listName][i][6] = moment(this.lists[this.listName][i][6]).format("YYYY-MM-DD");
                this.lists[this.listName][i][4] = moment(this.lists[this.listName][i][4]).format("YYYY-MM-DD");
                this.lists[this.listName][i][3] = moment(this.lists[this.listName][i][3]).format("YYYY-MM-DD");
              }
            }

            if(this.listName=="userLists"){
              for(var i=0;i<this.lists.userLists.length;i++){
                if(this.lists.userLists[i].status==0){
                  $(".option2").text("在职")
                }else{
                  $(".option2").text("离职")
                }
              }
            }
            this.pages = Math.ceil((this.numberAll)/this.pageSize);//当前页数
            console.log(this.numberAll)

            this.pageTotal = data.body.length;//总页数数组
        },function (error) {
          this.$emit("modalShow",[error.body.message]);
        })
      },
      //人员管理编辑人员
      editUser:function (id) {
        this.$router.push({name:"unitUserModefine",params:{"roleId":String(id)}});
      },
      //人员离职或则在职状态
      goAway:function (status,id,index) {
        status = status==0?1:0;
        this.$http.get(API+'/api/bottle/sys-setting/user/'+id+'/update/status',
          {
            params:{
              status:status
            }
          }
        ).then(function (data) {
         if(data.body.code==200){
           if(status==1){
             $(".option2").eq(index).text('在职');
             $(".userStatus").eq(index).text('离职');
           }else{
             $(".option2").eq(index).text('离职');
             $(".userStatus").eq(index).text('在职');
           }
           this.lists[this.listName][index].status = status;
         }
        },function (error) {
        })
      },
      //报废设备
      removeDev:function (id) {
        this.$emit('addModal',["isRemove",id]);
      },
      //赋码
      registQc:function (id,qrCode) {
        this.$emit('addModal',["isGetQc",id,qrCode]);
      },
      //查看
      viewDevDetail:function (id) {
        this.$router.push({name:"unitDeviceDetails",params:{"id":id}});
      },
      //编辑设备
      modefineDev:function (id) {
        this.$router.push({name:"unitDeviceModefine",params:{"deviceId":id}})
      },
      //二维码管理，损坏二维码
      destroyQc:function (id) {
        this.$emit('addModal',["isDestroy",id]);
      },
      //下载二维码
      downLoadQc:function (url) {
        window.location.href=url;
      },
      //查看订单详情
      viewOrderDetail:function (id) {
        this.$router.push({name:"unitDeviceOrderDetail",params:{"id":id}})
      },
      //根据类型查询
      changeApiType:function (status) {
        this.$emit("changeApiType",status)
      },
      //根据合格或不合格查看检验接收单详情中的记录
      choseOk:function (flag) {
        this.$emit("choseOk",flag);
      },
      //根据状态查询二维码详情
      qcTypeQuery:function(flag){
        this.$emit("qcTypeQuery",flag)
      },
      cancelQc:function (id) {
        this.$http.get(API+"/api/bottle/check/inst/qrcode/batch/cancel/apply",{
          params:{
            "batchId":id,
            "status":2
          }
        }).then(function (data) {
          this.$emit("modalShow",[data.body.message]);
        },function (error) {
          this.$emit("modalShow",[error.body.message]);
        })
      },
      changeCustomer:function (id,status,index) {
        status = status==1 ? 0:1;
        this.$http.get(API+"/api/bottle/background/customer/register/update/"+id+"/status",{params:{"status":status}})
          .then(function (data) {
            if(data.body.code==200){
              if(status==0){
                $(".option2").eq(index).text('停业');
                $(".userStatus").eq(index).text('正常');
              }else{
                $(".option2").eq(index).text('正常');
                $(".userStatus").eq(index).text('停业');
              }
              this.lists[this.listName][index].status = status;
            }
          },function (error) {

          })
      },
      viewCustomer:function (id) {
        this.$router.push({name:"unitCustomerModefine",params:{"id":id}})
      },
      //根据接收单状态查询检验接收单列表
      orderTypeQuery:function (flag) {
        this.$emit("orderTypeQuery",flag);
      }
    },
    watch:{
      isChange:function (newVal) {
        this.getData();
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

  .table-responsive{
    min-width:1000px;
    overflow: hidden;
  }

  .table-list{
    color: #999999;
    font-weight:normal;
    font-size:16px;
    min-width:1000px;
  }

  .pull-left{
    color: #999999;
    font-size:16px;
    cursor:pointer;
    width:100%;
    height:auto;
    margin-bottom:30px;
    span{
      margin-right:22px;
      display: block;
      float: left;
      i{
        float: left;
      }
      b{
        float: left;
      }
    }
  }

  .active-qc{
    color: #74c38c;
  }

  .botpage{
    /*display: block;*/
    margin:0 auto;
    width:100%;
    height:auto;
    display: flex;
    align-items:center;
    justify-content: center;
  }

  .option,.device-option{
    color: #74c38c;
    cursor:pointer;
  }
</style>

