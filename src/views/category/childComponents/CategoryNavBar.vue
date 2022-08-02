<template>
  <nav-bar class="nav-bar">
    <div slot="center">商品分类</div>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "CategoryNavBar",
  components: {
    NavBar
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #f6f6f6;
}
</style>
