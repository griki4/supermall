<template>
  <div class="item">
    <div>{{ itemInfo }}</div>
  </div>
</template>

<script>
export default {
  name: "CartListItem",
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
