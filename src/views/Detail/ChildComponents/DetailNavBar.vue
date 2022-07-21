<template>
  <nav-bar>
    <div slot="left" @click="backHome">
      <img src="../../../assets/img/common/back.svg" alt="" class="back">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles" :key="index"
           class="title-item" @click="itemClick(index)" :class="{active: currentIndex === index}">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import BackTop from "@/components/content/backtop/BackTop";
export default {
  name: "DetailNavBar",
  components:{BackTop, NavBar},
  data(){
    return {
      titles: ['商品', '详情', '参数', '推荐'],
      currentIndex: 0
    }
  },
  methods:{
    itemClick(index) {
      this.currentIndex = index
    },
    backHome(){
      //点击返回首页事件
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .title {
    display: flex;
  }

  .title-item {
    flex: 1;
    font-size: 13px;
  }

  .active {
    color: var(--color-high-text);
  }

  .back {
    margin-top: 12px;
  }
</style>
