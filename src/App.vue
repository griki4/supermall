<template>
  <div id="app">
<!--    切换路由展示views文件夹下的四个对应组件-->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabbar/MainTabBar";
export default {
  name: 'App',
  components: {MainTabBar}
}
</script>

<style>
    @import "assets/css/base.css";
</style>
