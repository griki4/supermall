//导入需要设置为插件的组件对象
import Toast from "@/components/common/toast/Toast";

const obj = {}
//暴露对象的install方法在使用插件的时候就会自动触发
obj.install = function (Vue) {
  //1.创建一个组件构造器用户创建组件对象
  const toastConstructor = Vue.extend(Toast)

  //2.利用构造器创建一个组件对象
  const toast = new toastConstructor()

  //3.将创建的组件对象挂载到某个确定的元素身上
  toast.$mount(document.createElement('dov'))
  //将元素插入到页面中
  document.body.appendChild(toast.$el)

  //4.将创建好的toast组件放在Vue的原型对象上，时所有的组件都可以访问该对象
  Vue.prototype.$toast = toast
}

export default obj
