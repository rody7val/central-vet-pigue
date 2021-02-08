<template>
  <div>
    <div v-if="!$store.state.users.data[$user.email].active">
      <p class="lead alert">Usuario Bloqueado! <a href="/">Volver</a></p>
    </div>
    <div v-else>
    <!-- if user client -->
    <b-row v-if="!$store.state.users.data[$user.email].admin">
      <b-col sm="6">
        <br>
        Bienvenido a bordo!<br>
        Gracias por unirte. <br>
        Estamos trabajando para expandir el sitio. <br>
      </b-col>
    </b-row>
    <!-- if user admin -->
    <b-row v-else>
      <b-col sm="6">
        <b-list-group class="my-3">
          <b-list-group-item class="d-flex justify-content-between align-items-center">
            <b-link @click="$router.push('/admin/categories')">Categorias</b-link>
            <b-badge style="background-color: #e83e8c" pill>
              {{Object.keys($store.state.categories.data).length}}
            </b-badge>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center">
            <b-link @click="$router.push('/admin/items')">Productos</b-link>
            <b-badge style="background-color: #e83e8c" pill>
              {{Object.keys($store.state.items.data).length}}
            </b-badge>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center">
            <b-link @click="$router.push('/admin/users')">Usuarios</b-link>
            <b-badge style="background-color: #e83e8c" pill>
              {{Object.keys($store.state.users.data).length}}
            </b-badge>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      
      <b-col sm="6">

      </b-col>
    </b-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'dashboard',
  mounted () {
    this.$store.commit('resetSearchCategories')
    this.$store.commit('resetItems')
    this.getUsers()
    this.getCategories()
    this.getItems()
  },
  methods: {
    getUsers () { this.$store.dispatch('users/openDBChannel') },
    getCategories () { this.$store.dispatch('categories/openDBChannel') },
    getItems () {
      const orderBy = ['name']
      const where = [
        ['name', '>', ""],
        //['another_field', '==', true],
      ]
      this.$store.dispatch('items/openDBChannel', {
        clauses: { where, orderBy }
      })
    },
  }
}
</script>

<style scoped>
</style>
