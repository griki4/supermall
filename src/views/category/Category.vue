<template>
<div id="category">
  <nav-bar class="category-nav">
    <div slot="center">商品分类</div>
  </nav-bar>
  <category-menu :categories="categories"></category-menu>
</div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CategoryMenu from "@/views/category/ChildComponents/CategoryMenu";

import { getCategory } from "@/network/category";

export default {
  name: "Category",
  components:{
    NavBar,
    CategoryMenu
  },
  data(){
    return {
      categories:[]
    }
  },
  created() {
    this._getCategory()
  },
  methods:{
    _getCategory(){
      getCategory().then(res => {
        console.log(res)

        //将请求的分类数据进行存储
        this.categories = res.data.category.list
      })
    }
  }
}
</script>

<style scoped>
.category-nav {
  background-color: var(--color-tint);
  color: #ffffff;
}
</style>
