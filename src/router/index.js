import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Veterinaria from '@/components/Veterinaria'
import Contact from '@/components/Contact'
import My from '@/components/My'
import _Items from '@/components/_Items'
//import Categories from '@/components/_Categories'
//import Home from '@/components/Home'
//import ItemPublic from '@/components/ItemPublic'
//import Item from '@/components/Item'
//import Users from '@/components/Users'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Veterinaria
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    {
      path: '/my',
      name: 'my',
      component: My
    },
    {
      path: '/items',
      name: 'items',
      component: _Items
    }
    /*{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/p',
      name: 'items',
      component: Items
    },
    {
      path: '/p/:key',
      name: 'itemPublic',
      component: ItemPublic
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
    }*/
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
