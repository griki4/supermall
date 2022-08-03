<template>
  <div class="menu">
    <scroll ref="scroll" :observeDOM="true" class="content-scroll">
        <div v-for="(item, index) in title" :key="item.maitKey" @click="menuClick(index, item.maitKey)"
             :class="{active: index === currentIndex}" class="menu-item">
          {{ item.title }}
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
  created() {
    //为防止页面还未请求到title数据，这里延迟一会再触发事件
    setTimeout(() => {
      this.$emit('onChange', this.title[0].maitKey)
    },300)
  },
  mounted() {
    this.$refs.scroll.refresh()
  },
  methods: {
    menuClick(index, key) {
      if (this.currentIndex === index) return
      this.currentIndex = index
      this.$emit('onChange', key)
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

.content-scroll {
  height: 100% ;
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
