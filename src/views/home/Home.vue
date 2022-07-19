<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            @pullingUp="loadMore"
            :pull-up-load="true">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend-view :recommends="recommends"></home-recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行', '新款', '精选']" @tabClick="tabClick"></tab-control>
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
        showTop:false
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
      //监听图片加载完毕事件，执行重新计算滚动高度的函数，最好是在组件挂载而非创建的时候监听，否则容易拿不到scroll对象
      this.$bus.$on('imageLoadItem', ()=>{
        this.$refs.scroll.refresh()
      })
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
      },
      backTop(){
        //点击图标后返回至滚动开始的位置
        // this.$refs.scroll.scroll.scrollTo(0,0,500)
        this.$refs.scroll.scrollTo(0,0)//将scrollTo方法进行封装
      },
      contentScroll(position) {
        this.showTop = Math.abs(position.y) > 1000
      },
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
          this.$refs.scroll.finishPullUp()//多次上拉则加载更多内容
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

   .content {
     overflow: hidden;
     position: absolute;
     top: 44px;
     left: 0;
     right: 0;
     bottom: 49px;
   }

   .tab-control{
     position: sticky;
     top: 44px;
   }


</style>
