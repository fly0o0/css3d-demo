import Vue from 'vue'
import Router from 'vue-router'
import Stage from '@/components/Stage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Stage
    }
  ]
})
