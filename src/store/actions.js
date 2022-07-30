import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-type'

//actions返回一个Promise对象，商品添加进购物车的时候提示用户
export default {
  //业务逻辑尽量封装在actions中，mutations只负责对state中的数据进行修改
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //需要判断新商品是否已经存在于商品列表中、
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('商品添加成功')
      }
    })
  }
}
