<template>
  <div>
    <b-navbar
      toggleable="sm"
      variant="primary"
      type="dark"
      fixed="top"
      style="margin-top: 58px; z-index: 1; background-color: #7952b3 !important;">
      <b-navbar-brand
        :class="' '+ sidebarState('^/admin$' ,'active')"
        style="cursor: pointer"
        @click="$router.push('/admin')">Dashboard</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="$store.state.users.data[$user.email].admin">
          <!-- Categorias -->
          <b-nav-item
            :class="' ' + sidebarState('/admin/categories' ,'active')"
            @click="$router.push('/admin/categories')">Categorias</b-nav-item>
           <!-- Marcas -->
          <b-nav-item disabled
            :class="' ' + sidebarState('/admin/tags*','active')"
            href="#">Marcas</b-nav-item>
          <!-- Productos -->
          <b-nav-item
            :class="' ' + sidebarState('/admin/items*','active')"
            @click="$router.push('/admin/items')">Productos</b-nav-item>
          <!-- Usuarios -->
          <b-nav-item
            :class="' ' + sidebarState('/admin/users*','active')"
            @click="$router.push('/admin/users')">Usuarios</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else>
          <!-- Pedidos -->
          <b-nav-item disabled
            :class="' ' + sidebarState('/admin/tag*','active')"
            href="#">Pedidos</b-nav-item>
          <!-- Facturación -->
          <b-nav-item disabled
            :class="' ' + sidebarState('/admin/tag*','active')"
            href="#">Facturación</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'menuAdmin',
  methods: {
    sidebarState(path, className){
      return (this.$route.path.match(new RegExp(path)) !== null) ? className : ''
    }
  }
}
</script>

<style scoped>
a.nav-link {
  color: #fff!important
}
a.nav-link:hover {
  color: #FFEB3B!important;
}
.active > a, .active, .navbar-brand:hover {
  color: #FFEB3B!important;
}
</style>
