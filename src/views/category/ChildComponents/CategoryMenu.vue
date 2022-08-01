<template>
<div class="menu">
  <scroll class="content" :observeDOM="true">
    <div v-for="(item, index) in categories" :key="index" class="menu-item"
         @click="select(index)" :class="{active: index === currentIndex}">
      {{item.title}}
    </div>
  </scroll>
</div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
export default {
  name: "CategoryMenu",
  components:{
    Scroll
  },
  props:{
    categories:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex: 0
    }
  },
  methods:{
    select(index){
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
.menu {
  width: 100px;
  height: 100%;
  text-align: center;
  position: relative;
  padding-bottom: 14px;
  z-index: 999;
}

.menu-item {
  background-color: #f6f6f6;
  line-height: 45px;
}

.content {
  background: #f6f6f6;
  height: 100%;
  width: 100px;
  box-sizing: border-box;
}

.active {
  background: #fff;
  color: var(--color-high-text);
  border-left: 3px solid var(--color-high-text);
  font-weight: 700;
}
</style>
