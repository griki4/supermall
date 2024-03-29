<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemScroll="itemScroll" ref="nav"></detail-nav-bar>
    <scroll class="detail-content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommend" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top v-show="showTop" @click.native="backTop"></back-top>
    <!--    <toast :message="message" :show="show"></toast>-->
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
import DetailBottomBar from "@/views/Detail/ChildComponents/DetailBottomBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
// import Toast from "@/components/common/toast/Toast";

import {getRecommend, getDetail, Goods, Shop, GoodsParam} from "@/network/detail";
import {itemImageListenerMixin, bakTopMixin} from "@/common/mixin";
import {debounce} from "@/common/utils";
import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast
  },
  mixins: [itemImageListenerMixin, bakTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
      message: '',
      show: false
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

    //获取offsetTop的函数
    this.getThemeTopYs = debounce(() => {
      //获取各类offsetTop的工作应该在图片完全加载完毕之后
      this.themeTopYs = []

      this.themeTopYs.push(0)
      //部分内容会被导航栏遮挡，所滚动高度应该减去导航栏
      this.themeTopYs.push(this.$refs.params.$el.offsetTo - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      this.themeTopYs.push(Infinity)
    }, 100)
  },
  mounted() {
    //Home Detail组件在mounted生命周期中都执行了相同的功能，代码一致
    //因此将这部分代码抽离，并且采用混入的方式引入
    // console.log(this.$toast.test)
  },
  updated() {
    //获取图片信息后重新计算滚动区域的高度
    // this.$refs.scroll.refresh()
  },
  destroyed() {
    this.$bus.$off('imageLoadItem', this.itemImageListener)
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopYs()//图片加载后获取offsetTop
    },
    itemScroll(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },

    //实现滚动到对应位置高亮展示标题
    contentScroll(position) {
      //比较position中Y值与themeTopYs中的值的大小，由此确定DetailNavBar中的currentIndex的值
      const positionY = -position.y
      let length = this.themeTopYs.length
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i) {
          if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      }
      //决定是否显示回到顶部按钮
      this.showTop = positionY > 1000
    },

    //实现将商品信息加入Vuex
    addToCart() {
      const product = {}
      product.img = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // this.$store.dispatch('addCart', product)
      //根据添加结果提示用户，采用toast的方式将提示信息提示给用户
      this.addCart(product).then(res => {
        this.$toast.show(res, 1000)
      })
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
  height: calc(100% - 44px - 44px);
  overflow: hidden;
  /*    position: absolute;
      top: 44px;
      left: 0;
      right: 0;
      bottom: 49px;*/
}

</style>
