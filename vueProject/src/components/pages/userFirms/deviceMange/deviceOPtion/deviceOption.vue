<template>
  <div class="device-mange table-com">
    <p class="con-tit">
      <i>已发布项目</i>
    </p>
    <div class="mange-con table-con">
      <div action="" class="search">
       
        <button @click="toDeviceRegist" class="registDevice" style="width:120px!important;height: 43px!important;margin-top:-5px">发布项目</button>
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
  import {DateRange} from 'vue-date-range';
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
        apiQuery:API+"/api/bottle/info",
        api:API+"/api/bottle/info",
        apiTime:API+"/api/bottle/info",
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
      vTableUnit,DateRange
    },
    methods:{
      toDeviceRegist:function () {
        this.$router.push({name:'unitDeviceRegist'});
      },
      onChange(range) {
        this.dataRange.show = range.startDate.format('YYYY-MM-DD')+'-'+range.endDate.format('YYYY-MM-DD');
        this.startTime = range.startDate.format('YYYY-MM-DD');
        this.endTime = range.endDate.format('YYYY-MM-DD');
        this.dateRangeShow = false;
      },
      //显示插件
      showRange:function () {
        this.dateRangeShow = !this.dateRangeShow;
      },
      
      
      modalShow:function (modal) {
        this.$emit("modalShow",modal);
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
