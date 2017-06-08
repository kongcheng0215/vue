<template>
  <div>
    <div class="list" v-for="(list,index) in menuList">
      <p class="listPar" @click="menuToggle(index,list.name,list.icon)" >
        <i :class="list.icon" class="iconfont" style="float: left"></i>
        <b class="list-name">{{list.name}}</b>
        <i class="iconfont icon-caret icon-down up-dowm" v-if="index==0&&instType!=4?false:true"></i>
      </p>
      <ul class="listSon">
        <li @click="activeList(subList.routerName,list.name,list.icon)"  v-for="subList in list.subMenus">{{subList.name}}</li>
      </ul>
    </div>
  </div>
</template>

<style lang="less">

  .listPar{
    width:100%;
    height:56px;
    font-size:16px;
    padding-left:25px;
    line-height:46px;
    cursor: pointer;
    font-family: Microsoft YaHei;
    position:relative;
    padding-top:15px;
    i{
      font-size:25px;
      margin-right:14px;
      line-height:30px;
    }
    .up-dowm{
      position: absolute;
      right:20px;
      top:15px;
      /*font-size:*/
    }
  }
  .list-name{
    line-height:25px;
    float: left;
  }
  .listSon{
    cursor: pointer;
    padding-left:70px;
    list-style: disc;
    text-indent:0px;
    /*font-size:16px;*/
    font-size:14px;

    display:none;
    li{
      margin:5px 0;
      margin-bottom:15px;
      &:hover{
         color:#74c38c;
       }
    }
  }
  .menu-active{
    background: #21262f;
  }
  .menu-active2{
    background: #21262f;
  }
  .list-active{
    color: #74c38c;
   }
  .icon-down{
    font-size:26px!important;
  }
</style>

<script>
  import store from "store";
  export default{
    data(){
      return {
        instType:JSON.parse(sessionStorage.getItem("instType"))
      }
    },
    props:{
      menuList:{}
    },
    created(){

    },
    mounted(){

      $(".listPar").click(function () {
        $(".listPar").attr({"class":"listPar"})
        $(this).attr({"class":"listPar menu-active"}).parent().find("ul").toggle();
        if($(this).find(".up-dowm").hasClass("icon-down")){
          $(this).find(".up-dowm").removeClass("icon-down").addClass("icon-icon_caret-up");
        }else{
          $(this).find(".up-dowm").removeClass("icon-icon_caret-up").addClass("icon-down");
        }
      });

      $(".listPar").hover(function () {
        $(this).addClass("menu-active")
      },function () {
        $(this).removeClass("menu-active")
      });

      $(".listSon li").click(function () {
        $(".listSon li").attr({"class":""});
        $(this).attr({"class":"list-active"})
      });
    },
    methods:{
      activeList:function (routerName,listName,icon) {
        this.$router.push({name:routerName});
        this.$emit("changeHeader",[listName,icon]);
      },
      menuToggle:function (index,listName,icon) {
        if(index==0 && sessionStorage.getItem("instType")!=4){
          this.$router.push("/");
        }
        this.$emit("changeHeader",[listName,icon]);
      }
    }
  }
</script>
