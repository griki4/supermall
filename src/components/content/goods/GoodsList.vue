<template>
<!--商品展示页大组件-->
  <div class="goodslist">
    <goods-list-item v-for="(item, index) in goods" :key="index" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";
export default {
  name: "GoodsList",
  components:{GoodsListItem},
  props:{
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .goodslist {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

</style>
