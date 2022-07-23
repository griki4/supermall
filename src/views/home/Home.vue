<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
<!--    实际效果是tabControl2一直随着scroll滚动，当它滚动超过某个范围的时候tabControl1替换它显示，并且tabControl1和tabControl2全部内容都保持一致
tabControl2随着scroll滚动已经滚出页面了，不过tabControl1在超过某个范围时接替了它进行显示，此前它一直处于隐藏状态-->
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed" class="tabControl"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            :pull-up-load="true">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list >
    </scroll>
    <back-top @click.native="backTop" v-show="showTop"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import HomeRecommendView from "@/views/home/childComps/HomeRecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import GoodsList from "@/components/content/goods/GoodsList";

import TabControl from "@/components/content/tabControl/TabControl";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backtop/BackTop";

import {itemImageListenerMixin} from "@/common/mixin";

import {getHomeMultidata, getHomeGoods} from "@/network/home";

  export default {
    name: "Home",
    components:{NavBar,
      HomeSwiper,
      HomeRecommendView,
      FeatureView,
      GoodsList,
      TabControl,
      Scroll,
      BackTop
    },
    mixins:[itemImageListenerMixin],
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          pop:{page: 0, list: []},
          new:{page: 0, list: []},
          sell:{page: 0, list: []}
        },
        currentType:'pop',
        showTop:false,
        tabOffsetTop: 0,
        //吸顶样式
        isTabFixed:false,
        //保持Home位置的数据
        saveY: 0,
      }
    },

    //组件创建完毕后就发送网络请求，获取制作轮播图所需要的数据
    created() {
      this.getHomeMultidata()
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },

    mounted() {
      //利用混入的代码执行防抖和监听图片加载的操作
    },

    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      //组件激活时最好重新refresh一次防止出现bug
      this.$refs.scroll.refresh()
    },

    deactivated() {
      //切换路由组件的时候保存当前页面滚动位置的信息
      this.saveY = this.$refs.scroll.getScrollY()
      //组件未激活的时候解绑自定义事件
      //Detail组件中goods-list的图片加载完毕无需触发首页的refresh，所以需要解绑自定义事件
      this.$bus.$off('imageLoadItem', )//解绑事件需指明解绑的回调函数
    },

    computed:{
      showGoods() {
        return this.goods[this.currentType].list
      }
    },

    methods:{
      //点击切换商品展示页的方法
      tabClick(index){
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
        //让吸顶的tabControl和滚动的tabControl选中的标签保持一致
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      swiperImageLoad(){
        //获取tabControl组件的根元素，在mounted中获取的时候可能轮播图的图片还未加载完成
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      backTop(){
        //点击图标后返回至滚动开始的位置
        // this.$refs.scroll.scroll.scrollTo(0,0,500)
        this.$refs.scroll.scrollTo(0,0)//将scrollTo方法进行封装
      },

      contentScroll(position) {
        //决定BackTop是否显示
        this.showTop = Math.abs(position.y) > 1000
        //决定tabControl是否吸顶，超过阈值就启用吸顶效果
        this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
      },

      //加载更多商品信息的方法
      loadMore(){
        this.getHomeGoods(this.currentType)
      },

      //网络请求相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)//新请求的数据放入之前的list中但是是新的页数
          this.goods[type].page += 1
          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
    }
  }
</script>

<style scoped>
   #home{
     /*padding: 44px 0 64px;*/
     /*vh表示视口高度，100vh表示占据视口高度的100%*/
     height: 100vh;
     position: relative;
   }

   .home-nav {
     background-color: var(--color-tint);
     color: #fff;
/*     position: fixed;
     right: 0;
     left: 0;
     top: 0;
     z-index: 9*/
   }

   .tab-control {
     position: relative;
     z-index: 9;
   }
   .content {
     overflow: hidden;
     position: absolute;
     top: 44px;
     left: 0;
     right: 0;
     bottom: 49px;
   }

</style>
