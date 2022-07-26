import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-type'

export default {
  //业务逻辑尽量封装在actions中，mutations只负责对state中的数据进行修改
  addCart(context, payload) {
    //需要判断新商品是否已经存在于商品列表中、
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1
      // state.cartList.push(payload)
      context.commit(ADD_TO_CART, payload)
    }
  }
}
