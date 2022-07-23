import {request} from "@/network/request";

export function getDetail(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url:'/recommend'
  })
}

//将繁杂的数据进行抽离和整合再传给子组件使用
//极大地方便子组件使用数据
//商品描述信息的抽离整合
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

//店铺信息的抽离整合
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.sFans;
    this.sells = shopInfo.sSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

//商品参数信息的抽离整合
export class GoodsParam {
  constructor(info,rule) {
    // images可能没有值，所以要判断一下
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables
  }
}
