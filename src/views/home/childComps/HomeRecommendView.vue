<template>
<!--  首页推荐组件，展示推荐内容-->
    <div class="recommend">
      <div v-for="(item, index) in recommends" class="recommend-item" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
          <div>{{item.title}}</div>
        </a>
      </div>
    </div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props:{
    recommends:{
      type:Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
   .recommend {
     display: flex;
     text-align: center;
     font-size: 12px;
     padding: 10px 0 20px;
     border-bottom: 8px solid #eee;
   }

   .recommend-item {
     flex: 1;
   }

   .recommend-item img {
     width: 70px;
     height: 70px;
     margin-bottom: 10px;
   }
</style>
