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
      name: 'PANEL DE CONTROL',
      component: Dashboard
    },
    {
      path: '/admin/categories',
      name: 'CATEGORIAS',
      component: Categories
    },
    {
      path: '/admin/users',
      name: 'CLIENTES',
      component: Users
    },
    {
      path: '/admin/items',
      name: 'OFERTAS ONLINE',
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
