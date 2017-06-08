<template>
      <div class="table-responsive">
        <table class="table table-hover table-bordered table-list">
          <thead>
          <tr>
            <th v-for="title in titles">{{title}}</th>
          </tr>
          </thead>
          <tbody>
          <!--已申请项目列表-->
          <tr v-for="(data,index) in lists[listName]" v-if="lists.userLists">
             <td v-text="index+1"></td>
            <td v-text="data.qualityLicenseNo"></td>
            <td v-text="data.deviceNo"></td>
            <td>
              <input type="text" v-model="data.deviceName" @blur="updateList(data)"/>
            </td>
            <td v-text="data.deviceType"></td>
            <td v-text="data.createTime"></td>
            <td v-text="data.memo"></td>
            <td>
              <span @click="delList(data.id)" class="option">删除</span>
              <span @click="finished(data)" class="option">完成</span>
            </td>
          </tr>

          <!--已完成项目列表-->
          <tr v-for="(data,index) in lists.qcLists" v-if="lists.qcLists">
             <td v-text="index+1"></td>
            <td v-text="data.qualityLicenseNo"></td>
            <td v-text="data.deviceNo"></td>
            <td v-text="data.deviceName">
            
            </td>
            <td v-text="data.deviceType"></td>
            <td v-text="data.createTime"></td>
            <td v-text="data.memo"></td>
            <td>
              <span @click="delFinishedList(data.id)" class="option">删除</span>
            </td>
          </tr>

          <!--可申请项目列表-->
          <tr v-for="(data,index) in lists.deviceOptionLists" v-if="lists.deviceOptionLists">
            <td v-text="index+1"></td>
            <td v-text="data.deviceNo"></td>
            <td v-text="data.deviceName"></td>
            <td v-text="data.deviceType"></td>
            <td v-text="data.useUnit"></td>

            <td v-text="data.nextCheckDate"></td>
           
  
            <td>
            <!-- 操作只保留申请 -->
              <!-- <span class="device-option" @click="modefineDev(data.id)" v-show="data.status==1?false:true">编辑</span> <em v-show="data.status==1?false:true">|</em>
              <span class="device-option" @click="viewDevDetail(data.id)">查看</span> <em v-show="data.status==1?false:true">|</em>
              <span class="device-option" @click="removeDev(data.id)" v-show="data.status==1?false:true">报废</span> <em v-show="data.status==1?false:true">|</em>
               -->
               <span class="device-option">申请</span>

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
        pageSize:10,
        page:0,
        pages:0,
        lists:{},
         instName:"",
        size:0
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

      if(JSON.parse(sessionStorage.getItem('instVos'))[0].instName){
        this.instName = JSON.parse(sessionStorage.getItem('instVos'))[0].instName;
      }
      this.getData()
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
      delList(id){
        /*删除已申请*/
        this.$http.delete(API+"/api/bottle/applyedProject"+"/"+id).then(function(res){
          this.getData();
        },function(err){

        })
      },
      updateList(list){
        this.$http.delete(API+"/api/bottle/applyedProject"+"/"+list.id).then(function(res){
          this.$http.post(API+"/api/bottle/applyedProject",list).then(function(res){
            this.$http.delete(API+"/api/bottle/info/"+list.id).then(function(res){
               this.$http.post(API+"/api/bottle/info",list).then(function(res){
                  this.getData();
               },function(err){

               })
            },function(err){

            })
          },function(err){

          })
        })
      },
      finished(list){
        /*完成已申请*/
        list.deviceName = "100%";
        this.$http.post(API+"/api/bottle/finishedProject",list).then(function(res){
            this.$http.delete(API+"/api/bottle/applyedProject"+"/"+list.id).then(function(res){
              this.$http.delete(API+"/api/bottle/info/"+list.id).then(function(res){
               this.$http.post(API+"/api/bottle/info",list).then(function(res){
                  this.getData();
               },function(err){

               })
            },function(err){

            })
            },function(err){

            })
        },function(err){

        })
      },
      delFinishedList(id){
        /*删除已完成申请*/
         this.$http.delete(API+"/api/bottle/finishedProject"+"/"+id).then(function(res){
            this.getData();
          },function(err){

          })
      },
      //从分页传入当前页触发获取信息
      //获取可申请列表
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

