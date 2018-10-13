<template>
  <div id="app">
    <home-header :seller="seller"></home-header>
    <div class="tab">
      <router-link to="/commodity" class="tab-item">商品</router-link>
      <router-link to="/discuss" class="tab-item">评论</router-link>
      <router-link to="/merchant" class="tab-item">商家</router-link>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import HomeHeader from './header/Header.vue'
import axios from 'axios'
export default {
  name: 'Home',
  data () {
    return {
      seller: {}
    }
  },
  components: {
    HomeHeader
  },
  methods: {
    getHomeInfo () {
      axios.get('/static/mock/data.json')
        .then(this.getHomeInfoSucc)
    },
    getHomeInfoSucc (res) {
      if (res.data) {
        const data = res.data
        this.seller = data.seller
        this.goods = data.goods
      }
    }
  },
  mounted () {
    this.getHomeInfo()
  }
}
</script>

<style lang="stylus" scoped>
  @import "../common/stylus/mixin.styl"
  #app
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      // border-bottom 1px solid rgba(7,17,27,.1)
      border-1px(rgba(7,17,27,.1))
      .tab-item
        flex 1
        text-align center
        font-size 14px
        color rgb(77, 85, 93)
        &.router-link-active
          color rgb(240,20,20)
</style>
