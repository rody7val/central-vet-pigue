<template>
  <b-navbar toggleable="md" type="dark" id="menu" class="shadow nav-admin-items" fixed="top">
    <b-navbar-brand v-b-toggle.sidebar-backdrop style="cursor: pointer" class="btn btn-vete mr-0">
      <b-icon-text-left></b-icon-text-left>
      <span>Menu</span>
    </b-navbar-brand>

    <!-- Right -->
    <b-navbar-nav class="ml-auto text-right">
      <!-- Cart -->
      <Cart />
      <!-- Auth -->
      <Auth class="mt-2"/>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import Cart from '@/components/_Cart'
import Auth from '@/components/_Auth'

export default {
  name: 'Menu',
  components: {
    Auth,
    Cart
  },
  methods: {
    menuState(path, className){
      return (this.$route.path.match(new RegExp(path)) !== null) ? className : ''
    }
  }
}
</script>

<style scoped>
.nav-admin-items{
  left: -1px;
  top: -1px;
  right: -1px;
}
.btn-vete{
  color: #fff!important;
  text-decoration: none!important;
  background-color: #7952b3;
  border-color: #563d7c!important;
}
.btn-vete:focus,.btn-vete:active,.btn-vete:hover,.btn-vete:visited,.btn-vete:focus-within{
  text-decoration: none!important;
  background-color: #563d7c!important;
  border-color: #7952b3!important;
}

@media (max-width: 767px) {
  .svg-cat{
    background-image: url('https://image.flaticon.com/icons/svg/1089/1089472.svg');
    background-repeat: no-repeat;
    background-size: 63px 104px;
  }
}
.btn-vete{
  border: 0px
}
#menu{
  background-color: rgb(52, 73, 94);
  /*claro*/
  background-color: #7952b3;
  /*oscuro*/
  background-color: #563d7c;
}
</style>
