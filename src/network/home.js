import {request} from "@/network/request";

//home全权负责Home组件的网络请求，防止代码耦合过重
export function getHomeMultidata(){
  return request({
    url: '/home/multidata'
  })
}
