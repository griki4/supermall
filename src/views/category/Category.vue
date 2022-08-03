<template>
  <div class="category">
    <category-nav-bar></category-nav-bar>
    <category-menu :title="categoryTitle" @onChange="onChange"></category-menu>
    <sub-category :categoryItem="subCategory"></sub-category>
  </div>
</template>

<script>
import CategoryNavBar from "@/views/category/childComponents/CategoryNavBar";
import CategoryMenu from "@/views/category/childComponents/CategoryMenu";
import SubCategory from "@/views/category/childComponents/SubCategory";

import {getCategory, getsubCategory} from "@/network/category";

export default {
  name: "Category",
  components: {
    CategoryNavBar,
    CategoryMenu,
    SubCategory
  },
  data() {
    return {
      categoryTitle: [],
      subCategory: []
    }
  },
  created() {
    this._getCategory()
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        console.log(res)
        this.categoryTitle = res.data.category.list
      })
    },
    onChange(key) {
      getsubCategory(key).then(res => {
        console.log(res)
        this.subCategory = res.data.list
      })
    }
  }
}
</script>

<style scoped>
.category {
  height: 100vh;
  position: relative;
}
</style>
