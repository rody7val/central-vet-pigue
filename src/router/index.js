import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Veterinaria from '@/components/_Veterinaria'
import Contact from '@/components/_Contact'
// import My from '@/components/_My'
import Items from '@/components/_Items'
import ItemId from '@/components/_ItemId.vue'
import Admin from '@/components/#Admin.vue'
import _404 from '@/components/_404.vue'
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
      path: '/items',
      name: 'items',
      component: Items
    },
    {
      path: '/items/:id',
      name: 'itemId',
      component: ItemId
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      redirect: '/'
    },/*
    {
      path: '/admin/my',
      name: 'my',
      component: My,
      meta: { requiresAuth: true }
    },
    
    {
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
    },*/
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
