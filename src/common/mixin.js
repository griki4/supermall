import {debounce} from "@/common/utils";

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
