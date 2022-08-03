<template>
<div class="profile">
  <top-view></top-view>
  <middle-view></middle-view>
  <bottom-view></bottom-view>
</div>
</template>

<script>
import TopView from "@/views/profile/ChildComponents/TopView";
import MiddleView from "@/views/profile/ChildComponents/MiddleView";
import BottomView from "@/views/profile/ChildComponents/BottomView";
  export default {
    name: "Profile",
    components:{
      TopView,
      MiddleView,
      BottomView
    }
  }
</script>

<style scoped>

</style>
