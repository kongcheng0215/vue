<template>
  <router-view keep-alive @addModal="addModal" :freshTable="freshTable" @modalShow="modalShow"></router-view>
</template>

<script>
  export default{
    methods:{
      addModal:function (modal) {
        this.$emit('addModal',modal);
      },
      modalShow:function (modal) {
        this.$emit("modalShow",modal);
      }
    },
    props:{
      freshTable:{
        type:Boolean
      }
    }
  }
</script>

<style>

</style>
