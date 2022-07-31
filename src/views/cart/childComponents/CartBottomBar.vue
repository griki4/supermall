<template>
  <div class="bottom-bar">
    <div class="button">
      <check-button class="bottom-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">总计：￥{{ totalPrice }}</div>
    <div class="calculate" @click="caculate">
      去结算({{ counted }})
    </div>
  </div>
</template>

<script>
import checkButton from "@/components/content/checkButton/checkButton";
import {mapGetters} from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    checkButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList.filter(item => item.checked).reduce((previousValue, currentValue) => {
        return previousValue + currentValue.price * currentValue.count
      }, 0).toFixed(2)//结果保留两位小数
    },

    counted() {
      return this.cartList.filter(item => item.checked).length
    },

    isSelectAll() {
      if (!this.cartList.length) return false
      // return !this.$store.state.cartList.filter(item => !item.checked).length
      return !this.cartList.find(item => !item.checked)//find方法的效率更高，因为不需要遍历cartlList中的每一个元素
    }
  },
  methods: {
    checkClick() {
      //首先判断列表中的元素是否全部被选中
      if (this.isSelectAll) {//全部被选中，点击则是全部都不选中
        this.cartList.forEach(item => item.checked = false)
      } else {//部分选中或者全都不选中的情况，全部变为选中
        this.cartList.forEach(item => item.checked = true)
      }
    },
    caculate() {
      if (!this.cartList.length) {
        this.$toast.show('请至少选择一件商品', 1500)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  line-height: 40px;
  background-color: #eee;
  position: relative;
  z-index: 99;
  display: flex;
  text-align: center;
  font-size: 14px;
}

.button {
  display: flex;
  align-items: center;
  margin-left: 8px;
  width: 60px;
}

.bottom-button {
  width: 18px;
  height: 18px;
  line-height: 20px;
  margin-right: 5px;
}

.total-price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
  width: 100px;
  background-color: pink;
}
</style>
