import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from "@/components/#Dashboard"
import Categories from "@/components/#Categories"
import Users from "@/components/#Users"
import Items from "@/components/#Items"

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/admin',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/admin/categories',
      name: 'categories',
      component: Categories
    },
    {
      path: '/admin/users',
      name: 'users',
      component: Users
    },
    {
      path: '/admin/users/view/:email',
      name: 'users',
      component: Users
    },
    {
      path: '/admin/items',
      name: 'items',
      component: Items
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!firebase.auth().currentUser) {
//       next({
//         path: '/',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
