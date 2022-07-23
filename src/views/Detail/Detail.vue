<template>
<div id="detail">
  <detail-nav-bar class="detail-nav"></detail-nav-bar>
  <scroll class="detail-content" ref="scroll">
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
    <detail-param-info :param-info="paramInfo"></detail-param-info>
    <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
    <goods-list :goods="recommend"></goods-list>
  </scroll>
</div>
</template>

<script>
import DetailNavBar from "@/views/Detail/ChildComponents/DetailNavBar";
import DetailSwiper from "@/views/Detail/ChildComponents/DetailSwiper";
import DetailBaseInfo from "@/views/Detail/ChildComponents/DetailBaseInfo";
import DetailShopInfo from "@/views/Detail/ChildComponents/DetailShopInfo";
import DetailGoodsInfo from "@/views/Detail/ChildComponents/DetailGoodsInfo";
import DetailParamInfo from "@/views/Detail/ChildComponents/DetailParamInfo";
import DetailCommentInfo from "@/views/Detail/ChildComponents/DetailCommentInfo";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";

import {getRecommend, getDetail, Goods, Shop, GoodsParam} from "@/network/detail";
import {itemImageListenerMixin} from "@/common/mixin";

export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList
  },
  mixins:[itemImageListenerMixin],
  data(){
    return {
      iid: null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommend:{}
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
      //获取商品评论信息
      if (data.rate.cRate) {
        this.commentInfo = data.rate.list[0]
      }
    })

    //请求推荐商品数据
    getRecommend().then(res => {
      this.recommend = res.data.list
    })
  },
  mounted() {
    //Home Detail组件在mounted生命周期中都执行了相同的功能，代码一致
    //因此将这部分代码抽离，并且采用混入的方式引入
  },
  updated() {
    //获取图片信息后重新计算滚动区域的高度
    // this.$refs.scroll.refresh()
  },
  destroyed() {
    this.$bus.$off('imageLoadItem', this.itemImageListener)
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
