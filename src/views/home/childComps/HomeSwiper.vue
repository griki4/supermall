<template>
<!--  首页轮播图组件，负责接收数据并展示成为轮播图-->
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
           <img :src="item.image" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper} from "@/components/common/swiper";
import {SwiperItem} from "@/components/common/swiper";

export default {
  name: "HomeSwiper",
  components:{Swiper, SwiperItem},
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
     isLoad: false
    }
  },
  methods:{
    imageLoad() {
      //只触发一次事件，因为只需要一张轮播图的图片就能直到offsetTop的准确值
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>
