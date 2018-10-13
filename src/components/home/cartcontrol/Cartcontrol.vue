/* 添加商品到购物车的加减按钮组件 */
<template>
<div class="cartcontrol">
  <transition name="fade">
    <div
      class="cart-decrease"
      v-show="food.count>0"
      @click="decreaseCart"
      key="out"
    >
      <transition name="icon">
        <span class="inner icon-remove_circle_outline" v-show="food.count>0" key="inner"></span>
      </transition>
    </div>
  </transition>
  <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
  <div class="cart-add icon-add_circle" @click="addCart"></div>
</div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'CartControl',
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('cart-add', event.target)
    },
    decreaseCart () {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      transition all .4s linear
      .inner
        display inline-block
        line-height 24px
        font-size 24px
        color rgb(0, 160, 220)
      &.fade-enter-active, &.fade-leave-active
        transition opacity 1
        transform translate3d(0, 0, 0)
        .inner
          display inline-block
          line-height 24px
          font-size 24px
          color rgb(0, 160, 220)
          transition all 2s linear
          transform rotate(0)
      &.fade-enter, &.fade-leave-to
        opacity 0
        transform translate3d(24px, 0, 0)
        .inner
          transform rotate(180deg)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 139)
    .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
</style>
