<!-- 表格分页组件 -->
<template>
  <div>
  <div class="boot-nav">
    <div class="page-total">
      共<span>{{size}}</span>条,<span>{{pages}}</span>页
    </div>
    <ul class="pagination boot-page">

      <li>
        <a href="javascript:void(0)" @click="onPrevClick()" class="preview-page">
          <span>上一页</span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0)" @click="onFirstClick()" class="first-page">
          <span>首页</span>
        </a>
      </li>
   <!--   <li v-for="(page,index) in pages" :class="activeNum === index ? 'active' : ''">
        <a href="javascript:void(0)" v-text="index" @click="onPageClick(index)" class="bot-index-page"></a>
      </li>-->
      <li>
        <input type="text" placeholder="转到"class="toPages" @blur="goPage">
      </li>
      <li>
        <a href="javascript:void(0)" @click="onLastClick" class="last-page">
          <span>尾页</span>
        </a>
      </li>

      <li>
        <a href="javascript:void(0)" @click="onNextClick()" class="next-page">
          <span>下一页</span>
        </a>
      </li>

    </ul>

  </div>
  </div>
</template>

<script>
  
  export default {
    props: {
      // 总共页码
      pages: {
        type: Number
      },
      // 表格数据（数组）
      pageTotal: {
        type: Array
      },
      size:{
        type:Number
      }
    },
    data () {
      return {
        activeNum: 0,//当前的选中页
        pPages:0,
        toPages:1

      }
    },
    mounted(){
//      $(".toPages").val(1);
    },
    created(){
      this.pPages = this.pages;
    },
    methods: {
      // 点击页码刷新数据
      onPageClick (index) {
        this.activeNum = index;
        this.getData();
      },

      // 上一页
      onPrevClick () {
        // 当前页是否为当前最小页码
        var page = $(".toPages").val();
        if(page>1){
          page--;
          $(".toPages").val(page);
          page--;
          this.$emit("getData",{"page":page});
        }
      },

      // 下一页
      onNextClick () {
        // 当前页是否为当前最大页码
        var page = $(".toPages").val();
        if(page<this.pages){
          page = page==""?1:page;
          this.$emit("getData",{"page":page});
          page++;
          $(".toPages").val(page);
        }
      },

      // 第一页
      onFirstClick () {
        this.$emit("getData",{"page":0})
        $(".toPages").val(1);
      },

      // 最后一页
      onLastClick () {
        this.$emit("getData",{"page":this.pages-1});
        $(".toPages").val(this.pages);
      },

      // 页码变化获取数据
      getData () {
        this.$emit("getData",{"page":this.toPages-1})
      },

      // 刷新表格
      refresh () {
        this.getData()
      },
      //跳转
      goPage:function () {
        var pageNum = $(".toPages").val();
        if(pageNum<=0||pageNum==""){
          pageNum=0;
          $(".toPages").val(1);
          this.$emit("getData",{"page": pageNum})
        }else if(pageNum>this.pages){
          $(".toPages").val(this.pages);
          this.$emit("getData",{"page": this.pages-1})
        }else {
          this.$emit("getData",{"page": pageNum-1})
        }
      }
    }
  }
</script>

<style scoped lang="less">

  .boot-nav {
    input{
      width:55px;
      height:35px;
      float: left;
      border:1px solid #4dda93;
      margin-right:20px;
      text-align: center;
    }
  }
.pagination>li>a, .pagination>li>span{
  padding:0;
  line-height:35px;
  margin-bottom: 20px;
}
  .boot-page {
    display: inline-block;
    margin: 2px 10px 0 20px;
    vertical-align: middle;
    min-height:35px;
    line-height:35px;
    margin-bottom:30px;
  }

  .page-total {
    display: inline-block;
    font-size:16px;
    float: left;
    margin-top:10px;
  }
  .pagination a{
    color: #999;
    margin-right:15px;
    width: 55px;
    height: 35px;
    text-align: center;
    border:1px solid #4dda93;
  }
  .pagination>.active>a,
  .pagination>.active>a:focus,
  .pagination>.active>a:hover,
  .pagination>.active>span,
  .pagination>.active>span:focus,
  .pagination>.active>span:hover{
    color: #fff;
    background: #4dda93;
    border:1px solid #4dda93;
  }

  .pagination>li>a:hover,
  .pagination>li>span:hover{
    color: #fff;
    background: #4dda93;
    border:1px solid #4dda93;
  }
  .pagination{
    .next-page,.preview-page{
      width: 82px;
      display: inline-block;
      background: #4dda93;
      color: #fff;
      border:1px solid #4dda93;
    }
  }
</style>
