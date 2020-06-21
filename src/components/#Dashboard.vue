<template>
  <div>
    <!-- if user -->
  	<b-row v-if="!$store.state.users.data[$user.email].admin">
  		<b-col sm="6">
  			Panel de usuario...
  	  </b-col>
  		<b-col sm="6">
  			Data...
  	  </b-col>
    </b-row>
    <!-- if admin -->
    <b-row v-else>
    	<b-col sm="6">
        <b-list-group>
          <b-list-group-item class="d-flex justify-content-between align-items-center">
            <b-link @click="$router.push('/admin/categories')">Categorias</b-link>
            <b-badge variant="primary" pill>
              {{Object.keys($store.state.categories.data).length}}
            </b-badge>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center">
            <b-link @click="$router.push('/admin/items')">Productos</b-link>
            <b-badge variant="primary" pill>
              {{Object.keys($store.state.items.data).length}}
            </b-badge>
          </b-list-group-item>

          <b-list-group-item class="d-flex justify-content-between align-items-center">
            <b-link @click="$router.push('/admin/users')">Usuarios</b-link>
            <b-badge variant="primary" pill>
              {{Object.keys($store.state.users.data).length}}
            </b-badge>
          </b-list-group-item>
    		</b-list-group>
      </b-col>
      
    	<b-col sm="6">
        <b-badge @click="refresh()">Actualizar</b-badge>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'cardUser',
  methods: {
    refresh () {
      this.$store.getters['items/all']
    }
  }
}
</script>

<style scoped>
</style>
