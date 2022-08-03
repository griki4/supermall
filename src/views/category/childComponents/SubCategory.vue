<template>
  <div class="sub-scroll">
    <scroll class="item-scroll" ref="scroll" :observeDOM="true">
      <div v-for="(item, index) in categoryItem" :key="item.acm" class="item">
        <img :src=item.image>
        <p>{{ item.title }}</p>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";


export default {
  name: "SubCategory",
  components: {
    Scroll
  },
  props: {
    categoryItem: {
      type: Array,
      default() {
        return []
      }
    }
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.sub-scroll {
  z-index: 9;
  position: absolute;
  top: 44px;
  left: 100px;
  height: calc(100% - 44px - 49px);
  width: calc(100% - 100px);
}

.item-scroll {
  height: 100%;
  overflow: hidden;
}

.item {
  margin-left: 9px;
  text-align: center;
  display: inline-block;
  width: 80px;
}

.item img {
  width: 65px;
  height: 65px;
}
</style>
