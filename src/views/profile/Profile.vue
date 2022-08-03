<template>
<div class="profile">
  <nav-bar class="pro-nav">
    <div slot="center">个人中心</div>
  </nav-bar>
</div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import TopView from "@/views/profile/ChildComponents/TopView";
  export default {
    name: "Profile",
    components:{
      NavBar,
      TopView
    }
  }
</script>

<style scoped>
.pro-nav {
  background-color: var(--color-tint);
  color: #f6f6f6;
}
</style>
