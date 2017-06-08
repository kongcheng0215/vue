<template>
  <div class="device-mange table-com">
    <p class="con-tit">
      <i>已完成项目</i>
    </p>
    <div class="mange-con table-con">
      <div action="" class="search">
        
      </div>
      <v-table :titles="titles"
               :api="api"
               :listName="listName"
               :query="query"
              >

      </v-table>
    </div>
  </div>
</template>

<script>
  import vTable from 'components/v-table';
  import {DateRange} from 'vue-date-range';
  import moment from "moment";
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
        api:API+"/api/bottle/finishedProject",
        listName:"qcLists",
        lang: 'zh',

        dataRange:{},//绑定时间输入框显示值

        startDate:"",//登记日期区间
        endDate:"",
        dateRangeShow:false,
        startTime:"",//传入table查询的时间
        endTime:"",

        keyValue:"",//输入关键字绑定
        query:"",//传入表格要查询的关键字

        flag:"",//登记日期
        isChange:false//判定事件是否改变
      }
    },
    components:{
      vTable,DateRange
    },
    props:{
      freshTable:{
        type:Boolean
      }
    },
    methods:{
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
      //关键字搜索
      keySearch:function () {
        this.query = this.keyValue;
        this.isChange = !this.isChange;
      },
      //二维码时间区间搜索
      qcApllyDate:function () {
        if(this.dataRange.show==""){
          this.startTime = '';
          this.endTime = '';
        }
        this.isChange = !this.isChange;
      },
      addModal:function (modal) {
        this.$emit("addModal",modal);
      },
      //根据状态查询二维码详情
      qcTypeQuery:function(flag){
        this.flag = flag;
        this.isChange = !this.isChange;
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
<style scoped lang="less">

</style>

