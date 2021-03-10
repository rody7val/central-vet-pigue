import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Veterinaria from '@/components/_Veterinaria'
import Items from '@/components/_Items'
import ItemId from '@/components/_ItemId.vue'
import Admin from '@/components/#Admin.vue'
import _404 from '@/components/_404.vue'

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
    },
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
