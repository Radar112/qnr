<template>
<div>
  <div class="goods">
    <div class="menu-wrapper" ref="meunWrapper">
      <ul>
        <li
          v-for="(item, index) in goods"
          class="menu-item"
          :class="{'current': currentIndex === index}"
          :key="index"
          @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span
            v-show="item.type>0"
            class="icon"
            :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="wrapper">
      <ul>
        <li v-for="item in goods" class="foods-list foods-list-hook" :key="item.id">
          <h1 class="titel">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px" :key="food.name">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" v-on:cart-add="cartAdd"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart
      ref="shopcart"
      :select-foods="selectFoods"
      :delivery-price="seller.deliveryPrice"
      :min-price="seller.minPrice"
      click
    ></shopcart>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import Bscroll from 'better-scroll'
import shopcart from '../shopcart/ShopCart.vue'
import cartcontrol from '../cartcontrol/Cartcontrol.vue'

export default {
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    shopcart,
    cartcontrol
  },
  methods: {
    selectMenu (index, event) {
      let foodList = this.$refs.wrapper.getElementsByClassName('foods-list-hook')
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
      // console.log(index)
    },
    getHomeInfo () {
      axios.get('/static/mock/data.json')
        .then(this.getHomeInfoSucc)
    },
    calculateHeight () {
      let foodList = this.$refs.wrapper.getElementsByClassName('foods-list-hook')
      // console.log(foodList)
      let height = 0
      this.listHeight.push(height)
      // console.log('foodlistlength ' + foodList.length)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
        // console.log('listHeigth ' + this.listHeight)
      }
    },
    initScroll () {
      this.foodsScroll = new Bscroll(this.$refs.wrapper, {probeType: 3, click: true})
      this.meunScroll = new Bscroll(this.$refs.meunWrapper, {click: true})
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    getHomeInfoSucc (res) {
      if (res.data) {
        const data = res.data
        this.goods = data.goods
        this.$nextTick(() => {
          this.calculateHeight()
          this.initScroll()
        })
      }
    },
    _drop (target) {
      // 体验优化，异步执行相关动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target)
      })
    },
    cartAdd (target) {
      this._drop(target)
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        // console.log(height1)
        let height2 = this.listHeight[i + 1]
        // console.log(height2)
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          // console.log('currentIndex-i ' + i)
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach(good => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../common/stylus/mixin.styl'
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background-color #f3f5f7
      .menu-item
        display table
        padding 0 12px
        width 56px
        height 54px
        line-height 14px
        &.current
          position relative
          margin-top -1px
          z-index 10
          background #ffffff
          font-weight 700
          .text
            border-none()
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 2px
          background-size 12px
          background-repeat no-repeat
          &.decrease
            background-image url('decrease_3@2x.png')
          &.discount
            background-image url('discount_3@2x.png')
          &.guarantee
            background-image url('guarantee_3@2x.png')
          &.invoice
            background-image url('invoice_3@2x.png')
          &.special
            background-image url('special_3@2x.png')
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7, 17, 27, .1))
          font-size 12px
    .foods-wrapper
      flex 1
      .titel
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background #f3f5f7
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, .1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            font-size 14px
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            color rgb(7, 17, 27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color rgb(147, 153, 159)
          .desc
            margin-bottom 8px
          .extra
            &.count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
          .cartcontrol-wrapper
            position absolute
            right 0
            bottom 12px
</style>
