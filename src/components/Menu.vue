<template>
  <b-navbar toggleable="sm" type="dark" id="menu" class="shadow">
    <b-container fluid>
      <b-navbar-brand to="/">
        <img src="@/assets/logo-central-vet.jpg" id="logo">
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav style="background-color: transparent!important">

        <!-- Left -->
        <b-navbar-nav>
          <b-nav-item v-for='(link, i) in nav' style="background-color: transparent!important"
            :key="i + Date.now()"
            :to='link.to'>{{link.name}}</b-nav-item>
        </b-navbar-nav>

        <!-- Right -->
        <b-navbar-nav class="ml-auto svg-cat">
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
      nav: [
        { to: '/p', name: 'Productos' }
      ]
    }
  }
}
</script>

<style scoped>
@media (max-width: 575px) {
  /*.svg-cat{
    background-image: url('https://image.flaticon.com/icons/svg/1089/1089472.svg');
    background-repeat: no-repeat;
    background-size: 50px;
    background-position: bottom left
  }*/
}

#logo{
  width: 3rem;
  border-radius: 50%
}
#menu{
  background-color: rgb(52, 73, 94);
  background-color: #7952b3;
  background-color: #563d7c;
}
.box {
  display: flex;
  align-items:center;
}
</style>
