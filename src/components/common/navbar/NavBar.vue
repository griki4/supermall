<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
  .nav-bar {
    display: flex;
    height: 44px;
    /*设置文字居中*/
    text-align: center;
    line-height: 44px;
    box-shadow: 0px 1px 1px rgba(100, 100, 100, 0.1);
  }

  .left,
  .right {
    width: 40px;
  }

  .center {
    flex: 1;
  }
</style>
