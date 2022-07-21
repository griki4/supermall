<template>
<div id="detail">
  <detail-nav-bar class="detail-nav"></detail-nav-bar>
  <scroll class="detail-content" ref="scroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info :param-info="paramInfo"></detail-param-info>
  </scroll>
</div>
</template>

<script>
import DetailNavBar from "@/views/Detail/ChildComponents/DetailNavBar";
import DetailSwiper from "@/views/Detail/ChildComponents/DetailSwiper";
import DetailBaseInfo from "@/views/Detail/ChildComponents/DetailBaseInfo";
import DetailShopInfo from "@/views/Detail/ChildComponents/DetailShopInfo";
import Scroll from "@/components/common/scroll/Scroll";
import DetailGoodsInfo from "@/views/Detail/ChildComponents/DetailGoodsInfo";
import DetailParamInfo from "@/views/Detail/ChildComponents/DetailParamInfo";
import {getDetail, Goods, Shop, GoodsParam} from "@/network/detail";

export default {
  name: "Detail",
  components:{DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo},
  data(){
    return {
      iid: null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{}
    }
  },
  created() {
    //接收商品的iid信息并保存
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      console.log(res)
      const data = res.result
      //获取轮播图的图片信息
      this.topImages = data.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //获取店铺信息
      this.shop = new Shop(data.shopInfo)
      //获取商品详情信息
      this.detailInfo = data.detailInfo
      //获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    })
  },
  updated() {
    //获取图片信息后重新计算滚动区域的高度
    // this.$refs.scroll.refresh()
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-content {
    height: calc(100% - 44px);
    overflow: hidden;
/*    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;*/
  }

</style>
