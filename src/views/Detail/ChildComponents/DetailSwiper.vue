<template>
  <swiper class="swiper-item">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper} from "@/components/common/swiper";
import {SwiperItem} from "@/components/common/swiper";
export default {
  name: "DetailSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .swiper-item {
    height: 300px;
    overflow: hidden;
  }

</style>
