import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/home/Home.vue'
import Commodity from 'components/home/commodity/Commodity.vue'
import Discuss from 'components/home/discuss/Discuss.vue'
import Merchant from 'components/home/merchant/Merchant.vue'

Vue.use(Router)

export default new Router({
  // linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [{
        path: 'commodity',
        name: 'Commodity',
        component: Commodity
      }, {
        path: 'discuss',
        name: 'Discuss',
        component: Discuss
      }, {
        path: 'merchant',
        name: 'Merchant',
        component: Merchant
      }
      ]
    }
  ]
})
