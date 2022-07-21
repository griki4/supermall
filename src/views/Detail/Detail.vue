<template>
  <detail-nav-bar></detail-nav-bar>
</template>

<script>
import DetailNavBar from "@/views/Detail/ChildComponents/DetailNavBar";
export default {
  name: "Detail",
  components:{DetailNavBar},
  data(){
    return {
      iid: null
    }
  },
  activated() {
    //接收商品的iid信息
    this.iid = this.$route.params.iid
  }
}
</script>

<style scoped>

</style>
