<template>
  <div>
    <b-list-group class="my-3 shadow-card">
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        <b-link @click="$router.push('/admin/categories')">
          <h5 class="my-0 py-0">CATEGORIAS</H5>
        </b-link>
        <b-badge style="background-color: #e83e8c" pill>
          {{Object.keys($store.state.categories.data).length}}
        </b-badge>
      </b-list-group-item>
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        <b-link @click="$router.push('/admin/items')">
          <h5 class="my-0 py-0">OFERTAS ONLINE</H5>
        </b-link>
        <b-badge style="background-color: #e83e8c" pill>
          {{Object.keys($store.state.items.data).length}}
        </b-badge>
      </b-list-group-item>
      <b-list-group-item class="d-flex justify-content-between align-items-center">
        <b-link @click="$router.push('/admin/users')">
          <h5 class="my-0 py-0">CLIENTES</H5>
        </b-link>
        <b-badge style="background-color: #e83e8c" pill>
          {{Object.keys($store.state.users.data).length}}
        </b-badge>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import CardUser from "./#CardUser"
export default {
  name: 'dashboard',
  components: {CardUser},
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
.img{
  border-radius: 50%;
  max-width: 270px!important;
}
</style>
