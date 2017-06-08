<template>
  <div class="device-mange table-com">
    <p class="con-tit">
      <i>已申请项目</i>
    </p>
    <div class="mange-con table-con">
      <div action="" class="search">
      
      </div>
      <v-table :titles="titles"
               :api="api"
               :listName="listName"
               :query="query"
               :isChange="isChange">
      </v-table>
    </div>
  </div>
</template>

<script>
  import vTable from 'components/v-table';
  import store from 'store';
  export default {
     data(){
      return{
        titles:[
           "序号",
          "rank值",
          "类别",
          "已完成进度",
          "发布日期",
          "预计完成日期",
          "注意事项",
          "操作"
        ],
        keyValue:"",
        query:"",
        api:API+"/api/bottle/applyedProject",
        listName:"userLists",
        isChange:false
      }
    },
    created(){
      //获取证件类型
      this.$http.get(API+"/api/bottle/sys-setting/user/cert/type/query")
        .then(function (data) {
          this.certTypeList = data.body.data;
          sessionStorage.setItem("certTypeList",JSON.stringify(data.body.data));
        },function (error) {

        })
    },
    components:{
      vTable
    },
    methods:{
      addUser:function () {
        this.$router.push({name:"checkUserAdd"});
      },
      //关键字搜索
      keySearch:function () {
        this.query = this.keyValue;
        this.isChange = !this.isChange;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .userAdd{
    width:100px;
    height:35px;
    background: #74c38c;
    color: #fff;
    font-size:14px;
    float: right;
    margin-top:6px;
  }
</style>
