<template>
  <router-view keep-alive @addModal="addModal" @modalShow='modalShow' :number="number"></router-view>
</template>

<script>

  export default{
    data(){
      return{
        number:1
      }
    },
    components:{

    },
    methods:{
      addModal:function (modal) {
        this.$emit("addModal",modal);
      },
      modalShow:function (modal) {
        this.$emit("modalShow",modal);
      }
    }
  }
</script>

<style>

</style>
