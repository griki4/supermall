<template>
<!--  滚动条组件，负责轮home-swipper recommend feature组件的滚动-->
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted() {
    //1.创建BScroll滚动对象，赋值给scroll变量
    this.scroll = new BScroll(this.$refs.wrapper, {
      click:true,//控制类似div之类的元素是否可以被点击
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })

    //2.监听滚动的位置
    if(this.probeType===2 || this.probeType===3){
      this.scroll.on('scroll', position => {
        // console.log(position)
        this.$emit('scroll', position)
      })
    }

    //3.监听是否滚动到底部
    if (this.pullUpLoad === true) {
      this.scroll.on('pullingUp', ()=>{
        this.$emit('pullingUp')
      })
    }
  },
  methods:{
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
