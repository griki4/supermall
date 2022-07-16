import {request} from "@/network/request";

//home全权负责Home组件的网络请求，防止代码耦合过重
export function getHomeMultidata(){
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}
