import {debounce} from "@/common/utils";
import BackTop from "@/components/content/backtop/BackTop";


export const itemImageListenerMixin = {
  data(){
    return {
      itemImageListener: null
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    //监听图片加载完毕事件，执行重新计算滚动高度的函数，最好是在组件挂载而非创建的时候监听，否则容易拿不到scroll对象
    this.itemImageListener = () => {
      refresh()//频繁调用时，debounce会清除掉上一次的定时器并开启一个新的定时器
    }
    this.$bus.$on('imageLoadItem', this.itemImageListener)
  }
}

//回到顶部组件的混入封装
export const bakTopMixin = {
  data(){
    return {
      showTop:false
    }
  },
  components:{
    BackTop
  },
  methods:{
    backTop(){
      this.$refs.scroll.scrollTo(0, 0)
    },
    //还可以将显示回到顶部按钮的函数一并封装
  }
}
