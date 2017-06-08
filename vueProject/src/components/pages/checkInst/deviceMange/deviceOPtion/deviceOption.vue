<template>
  <div class="device-mange table-com">
    <p class="con-tit">
      <i>设备管理</i>
    </p>
    <div class="mange-con table-con">
      <div action="" class="search">

      </div>
      <v-table-unit
        :titles="titles"
        :api="api"
        :listName="listName">
    </v-table-unit>
    </div>
  </div>
</template>

<script>
  import vTableUnit from 'components/v-table-unit';
  import store from "store";

  import moment from "moment";
  export default {
    data(){
      return {
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
        apiQuery:API+"/api/bottle/canApplyProject",
        api:API+"/api/bottle/canApplyProject",
        apiTime:API+"/api/bottle/canApplyProject",
        listName:"deviceOptionLists",
        lang: 'zh'
      }
    },
    props:{
      freshTable:{
        type:Boolean
      }
    },
    mounted(){
    },
    components:{
      vTableUnit
    },
    methods:{
      toDeviceRegist:function () {
        this.$router.push({name:'checkDeviceRegist'});
      },
      
      isModal:function (modal) {
        this.$emit('addModal',modal);
      },
      
      modalShow:function (modal) {
        this.$emit("modalShow",modal);
      }
    },
    watch:{
      freshTable:function () {
        this.isChange = !this.isChange;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .registDevice{
    width:100px!important;
    height:35px!important;
    top:6px;
    border-radius: 6.5px;
    background-color: #74c38c;
    color: #fff;
    font-size: 14px;
    position: absolute;
    right:0;
  }
  .ayou-date-range{
    top:60px;
    left:0;
    position:absolute;
    z-index:999;
  }
</style>
