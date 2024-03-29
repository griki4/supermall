import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    //接口地址
    baseURL: 'http://123.207.32.32:7888/api/hy66',
    //请求限时
    timeout: 5000
  })
  // 2.1 请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err)
  })
  // 2.2 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })
  // 3.发送真正的网络请求
  return instance(config)
}
