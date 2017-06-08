<template>
  <router-view keep-alive @addModal="addModal" @modalShow="modalShow" :freshTable="freshTable"></router-view>
</template>

<script>
  export default{
    methods:{
      addModal:function (modal) {
        this.$emit('addModal',modal);
      },
      modalShow:function (modal) {
        this.$emit('modalShow',modal);
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
