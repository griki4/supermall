<template>
  <div class="category">
    <category-nav-bar></category-nav-bar>
    <category-menu :title="categoryTitle"></category-menu>
  </div>
</template>

<script>
import CategoryNavBar from "@/views/category/childComponents/CategoryNavBar";
import CategoryMenu from "@/views/category/childComponents/CategoryMenu";


import {getCategory} from "@/network/category";

export default {
  name: "Category",
  components: {
    CategoryNavBar,
    CategoryMenu
  },
  data(){
    return {
      categoryTitle:[]
    }
  },
  created() {
    this._getCategory()
  },
  methods: {
    _getCategory(){
      getCategory().then(res => {
        console.log(res)
        this.categoryTitle = res.data.category.list
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
