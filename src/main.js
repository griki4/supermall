import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import toast from "@/components/common/toast";
import VueLazyLoad from "vue-lazyload";
import FastClick from 'fastclick'

Vue.use(toast)

Vue.config.productionTip = false

//设置全局事件总线
Vue.prototype.$bus = new Vue()

//解决移动端延迟300ms的问题
FastClick.attach(document.body)

//解决图片懒加载和占位图显示
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
