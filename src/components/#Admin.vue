<template>
  <div v-if="$user" class="admin bg-white pb-5">
    <b-container style="z-index: 1;" fluid>
      <!-- row menu admin -->
      <b-row class="mt-1">
        <b-col>
          <b-breadcrumb class="shadow">
            <!-- go back -->
            <b-breadcrumb-item>
              <b-icon-arrow-left
                scale="1.5"
                @click="$router.go(-1)">
              </b-icon-arrow-left>
            </b-breadcrumb-item>
            <!-- dashboard -->
            <b-breadcrumb-item
              :active="$route.path === '/admin' ? true : false"
              to="/admin"
            >
              PANEL DE CONTROL
            </b-breadcrumb-item>
            <!-- breadcrumb nav -->
            <b-breadcrumb-item
              :key="key"
              :active="item.active"
              :to="item.to"
              v-for="(item, key) in items"
            >
              {{item.text}}
            </b-breadcrumb-item>
          </b-breadcrumb>
        </b-col>
      </b-row>
      <!-- row user and dashboard -->
      <b-row>
        <b-col sm="12">
          <!-- if user banned -->
          <div v-if="!this.$store.state.users.data[this.$user.email].active">
            <p class="lead alert">Usuario Bloqueado!</p>
          </div>
          <div v-else>
            <b-row>
              <b-col sm="5" md="4" lg="3" class="order-2 order-sm-1">
                <CardUser
                  :user="this.$store.state.users.data[this.$user.email]"
                />
              </b-col>
              <b-col sm="7" md="8" lg="9" class="order-1 order-sm-2">
                <!-- if user client -->
                <div v-if="!this.$store.state.users.data[this.$user.email].admin">
                  <br/>
                  Gracias por unirte. <br/>
                  Estamos trabajando para expandir el sitio. <br/>
                  <b-img fluid-grow src="https://centralvetpigue.com.ar/static/img/logo-central-vet.a27a323.jpg" class="img my-5 my-sm-5 my-md-5 shadow"></b-img>
                </div>
                <!-- if user admin -->
                <div v-else>
                  <router-view />
                </div>
              </b-col>
            </b-row>
          </div>

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import router from "@/router/admin"
import CardUser from "./#CardUser"
export default {
  name: "admin",
  components: {  CardUser },
  router,

  data() {
    return {
      items: []
    }
  },

  mounted () {
    this.$store.commit('resetCategories')
    this.$store.commit('resetItems')
    this.$store.commit('resetUsers')
    this.getCategories()
    this.getItems()
    this.getUsers()
  },

  methods: {
    getUsers () { this.$store.dispatch('users/openDBChannel') },
    getCategories () { this.$store.dispatch('categories/openDBChannel') },
    getItems () {
      const orderBy = ['name']
      const where = [
        ['name', '>', ""]
      ]
      this.$store.dispatch('items/openDBChannel', {
        clauses: { where, orderBy }
      })
    },
  },

  watch: {
    $route (to, from) {
      this.items = []
      if (to.path === '/admin') {
        return false 
      }
      this.items.push({
        text: to.name,
        to: to.path,
        active: to.path === this.$route.path ? true : false
      })
      return
    }
  },

  //computed: {
  //  isActive: () => {
  //    return (
  //      this.$user &&
  //      Object.keys(this.$store.state.users.data).length &&
  //      this.$store.state.users.data[this.$user.email].active
  //    ) ? true : false
  //  }
  //}

}
</script>

<style scoped>
.img{max-width: 150px}
.admin{
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
.go-back:hover {
  cursor: pointer;
  color: #7952b3
}
</style>
