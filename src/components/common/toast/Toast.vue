<template>
  <div id="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      message: ''
    }
  },
  methods: {
    show(message = '添加至购物车', delay = 1000) {
      this.message = message
      this.isShow = true

      setTimeout(() => {
        this.message = ''
        this.isShow = false
      }, delay)
    }
  }
}
</script>

<style scoped>
#toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  background-color: rgba(0, 0, 0, .75);
  border-radius: 8px;
  padding: 8px 10px;
  z-index: 99;
}
</style>
