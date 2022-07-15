<template>
  <!--所有的item都展示同一个图片, 同一个文字-->
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>

    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      //activeColor表示由使用组件的人决定组件活跃的时候显示什么颜色
      activeColor: {
        type: String,
        default: 'red'//外界不传入时设置的默认值
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        //判断当前item是否应该高亮展示，也即是否被激活。激活的判断条件是当前组件的路由路径和配置的路径是否一致
        // /home -> item1(/home) = true
        // /home -> item1(/category) = false
        // /home -> item1(/cart) = true
        // /home -> item1(/profile) = true
        //当前组件的路由的path中是否包含我们从外界接收的这个path，是则说明该组件活跃
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        //item激活高亮展示图片和文字
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        //点击某个item的时候会替换路由的路径，到达显示不同组件的效果
        //path属性是外界使用TabBarItem组件的时候传入的参数
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
