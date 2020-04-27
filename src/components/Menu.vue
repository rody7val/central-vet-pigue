<template>
  <b-navbar toggleable="sm" type="dark" id="menu" class="shadow">
    <b-container fluid="sm">
      <b-navbar-brand to="/">
        <img src="@/assets/logo-central-vet.jpg" id="logo">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Left -->
        <b-navbar-nav>
          <b-nav-item v-for='(link, i) in nav'
            :key="i + Date.now()"
            :to='link.to'>{{link.name}}</b-nav-item>
        </b-navbar-nav>

        <!-- Right -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-if="$user" v-for='(link, i) in navAdmin'
            :key="i"
            :to='link.to'>{{link.name}}</b-nav-item>
          <Auth/>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
import Auth from '@/components/Auth'

export default {
  components: {
    Auth
  },
  name: 'Menu',
  data () {
    return {
      navAdmin: [
        { to: '/items', name: 'Productos' },
        { to: '/users', name: 'Usuarios' }
      ],
      nav: [
        { to: '/about', name: 'Información' }
      ]
    }
  }
}
</script>

<style scoped>
#logo{
  width: 3rem;
  border-radius: 50%
}
#menu{
  background-color: rgb(52, 73, 94);
  background-color: #563d7c;
}
.box {
  display: flex;
  align-items:center;
}
</style>
