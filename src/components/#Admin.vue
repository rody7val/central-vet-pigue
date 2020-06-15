<template>
  <div>
    <MenuAdmin />

    <b-container fluid style="margin-top: 120px; z-index: 1;">
      <b-row>
        <b-col sm="12" md="8" lg="9">
          <router-view />
        </b-col>
        <b-col sm="12" md="4" lg="3">
          <CardUser />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Router from 'vue-router'
import MenuAdmin from "./#MenuAdmin"
import Dashboard from "./#Dashboard"
import CardUser from "./#CardUser"
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
      name: 'home',
      component: CardUser
    },
  ]
})
export default {
  name: "admin",
  router,
  components: { MenuAdmin, CardUser },
  mounted () {
    this.getUsers()
    this.getCategories()
  },
  methods: {
    getUsers () { this.$store.dispatch('users/openDBChannel') },
    getCategories () { this.$store.dispatch('categories/openDBChannel') },
    handleAdminChange(event){
      console.log(event)
      this.$store.dispatch('users/patch', {id: this.$user.email, admin: event})
    }
  }
}
</script>

<style scoped>
</style>
