<template>
  <div>
    <!-- if not banner -->
    <div v-if="$store.state.users.data[$user.email].active">
      <MenuAdmin />
      <b-container fluid style="margin-top: 120px; z-index: 1;">
        <b-row>
          <b-col sm="12" md="7" lg="8" class="my-4">
            <router-view />
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div v-else>
      <p class="lead alert">Usuario Bloqueado! <a href="/">Volver</a></p>
    </div>
  </div>
</template>

<script>
import Router from 'vue-router'
import MenuAdmin from "./#MenuAdmin"
import router from "@/router/admin"

export default {
  name: "admin",
  router,
  components: { MenuAdmin },
  mounted () {
    this.getUsers()
    this.getCategories()
    this.getItems()
  },
  methods: {
    getUsers () { this.$store.dispatch('users/openDBChannel') },
    getCategories () { this.$store.dispatch('categories/openDBChannel') },
    getItems () { this.$store.dispatch('items/openDBChannel') },
  }
}
</script>

<style scoped>
</style>
