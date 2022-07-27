<template>
  <div class="bottom-bar">
    <div class="button">
      <check-button class="bottom-button"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">总计：￥{{ totalPrice }}</div>
    <div class="calculate">
      去结算({{ counted }})
    </div>
  </div>
</template>

<script>
import checkButton from "@/components/content/checkButton/checkButton";

export default {
  name: "CartBottomBar",
  components: {
    checkButton
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList.filter(item => item.checked).reduce((previousValue, currentValue) => {
        return previousValue + currentValue.price * currentValue.count
      }, 0).toFixed(2)//结果保留两位小数
    },

    counted() {
      return this.$store.state.cartList.filter(item => item.checked).length
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
