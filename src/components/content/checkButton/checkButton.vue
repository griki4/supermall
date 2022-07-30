<template>
  <div class="button" :class="{check: isChecked}">
    <img src="../../../assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "checkButton",
  props: {
    //isChecked属性的值由外部决定
    isChecked: {
      type: Boolean,
      default() {
        return true
      }
    }
  }
}
</script>

<style scoped>
.button {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #aaa;

}

.check {
  background-color: skyblue;
  border-color: skyblue;
}
</style>
