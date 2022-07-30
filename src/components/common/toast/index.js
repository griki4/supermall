//导入需要设置为插件的组件对象
import Toast from "@/components/common/toast/Toast";

const obj = {}
//暴露对象的install方法在使用插件的时候就会自动触发
//即页面创建的时候toast组件已经存在了，插件实现了组件的导入、注册和使用功能，省去了我们自己手动书写这些代码的麻烦
obj.install = function (Vue) {
  //1.创建一个组件构造器用户创建组件对象
  const toastConstructor = Vue.extend(Toast)

  //2.利用构造器创建一个组件对象
  const toast = new toastConstructor()

  //3.将创建的组件对象挂载到某个确定的元素身上
  toast.$mount(document.createElement('div'))
  //将元素插入到页面中
  document.body.appendChild(toast.$el)

  //4.将创建好的toast组件放在Vue的原型对象上，时所有的组件都可以访问该对象
  //组件对象中的数据和方法都可以被访问了。
  Vue.prototype.$toast = toast
}

export default obj
