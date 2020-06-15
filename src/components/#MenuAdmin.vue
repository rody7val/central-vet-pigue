<template>
  <div>
    <b-navbar
    	toggleable="sm"
      variant="primary"
      type="dark"
      fixed="top"
      style="margin-top: 60px; z-index: 1;" class="shadow">
      <b-navbar-brand
        class="shadow-text"
        style="cursor: pointer"
        @click="$router.push('/admin')">Dashboard</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="$store.state.users.data[$user.email].admin">
          <b-nav-item class="shadow-text" @click="$router.push('/admin/categories')">Categorias</b-nav-item>
          <b-nav-item class="shadow-text" href="#">Marcas</b-nav-item>
          <b-nav-item class="shadow-text" href="#">Productos</b-nav-item>
          <b-nav-item class="shadow-text" href="#">Usuarios</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else>
          <b-nav-item class="shadow-text" href="#">Pedidos</b-nav-item>
          <b-nav-item class="shadow-text" href="#">Facturación</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'menuAdmin'
}
</script>

<style scoped>
a.nav-link {
  color: #fff!important
}
a.nav-link:hover {
  color: #efefef!important
}
</style>
