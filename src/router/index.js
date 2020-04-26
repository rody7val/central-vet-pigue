import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import About from '@/components/About'
import Home from '@/components/Home'
import Items from '@/components/Items'
import Item from '@/components/Item'
import Users from '@/components/Users'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/items',
      name: 'items',
      component: Items,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/i/:key/:uid',
      name: 'item',
      component: Item
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
