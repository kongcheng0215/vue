<template>
  <router-view @modalShow="modalShow"></router-view>
</template>

<script>
  export  default{
    methods:{
      modalShow:function (modal) {
       this.$emit("modalShow",modal);
      }
    }
  }
</script>

<style>

</style>
