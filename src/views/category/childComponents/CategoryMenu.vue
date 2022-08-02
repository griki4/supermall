<template>
  <div class="menu">
    <scroll ref="scroll" :observeDOM="true" class="content-scroll">
      <div class="content-menu">
        <div v-for="(item, index) in title" :key="item.maitKey" @click="menuClick(index)"
             :class="{active: index === currentIndex}" class="menu-item">
          {{ item.title }}
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";

export default {
  name: "CategoryMenu",
  components: {
    Scroll
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    this.$refs.scroll.refresh()
  },
  methods: {
    menuClick(index) {
      if (this.currentIndex === index) retu50
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
.menu {
  background-color: #f6f6f6;
  color: var(--color-text);
  width: 100px;
  height: calc(100% - 44px - 49px);
  border-right: 1px solid #ddd;
}

.content-menu {
  overflow: hidden;
}

.menu-item {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.active {
  background-color: var(--color-tint);
  color: #f4f4f4;
}
</style>
