<template>
  <b-navbar toggleable="md" type="dark" id="menu" class="shadow">

      <b-navbar-brand v-b-toggle.sidebar-backdrop style="cursor: pointer" class="btn btn-vete mr-0">
        <b-icon-text-left></b-icon-text-left>
        <span>Menu</span>
      </b-navbar-brand>


        <!-- Right -->
        <b-navbar-nav class="ml-auto text-right">
          <!-- Cart -->
            <b-button v-b-modal.cart class="menu-button-cart btn-vete mt-2 mr-2">
              <b-img src="https://firebasestorage.googleapis.com/v0/b/central-vet-pigue.appspot.com/o/cart.svg?alt=media&token=819c92e5-29ee-419e-9d89-d83af62805fc" width="19px" class=""></b-img>
              <b-badge class="btn-cart">0</b-badge>
            </b-button>
            <form>
              <b-modal
                id="cart"
                title="Carro"
                size="lg"
                header-bg-variant="info"
                header-text-variant="light">
                <p class="my-4" id="cart_list">Vacio...</p>
              </b-modal>
            </form>
          <!-- Auth -->
          <Auth class="mt-2"/>
        </b-navbar-nav>

        <!-- Left 
        <b-navbar-nav>
          <b-nav-item v-for='(link, i) in nav' style="background-color: transparent!important"
            :key="i + Date.now()"
            :to='link.to'>{{link.name}}</b-nav-item>
        </b-navbar-nav>        
      <b-navbar-toggle class="btn-vete" target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" class="svg-cat" is-nav>
      </b-collapse>-->

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
.menu-button-cart{ 
  margin-right: 7px
}

@media (max-width: 767px) {
  .menu-button-cart {
    margin-right: 0px
  }
  .svg-cat{
    background-image: url('https://image.flaticon.com/icons/svg/1089/1089472.svg');
    background-repeat: no-repeat;
    background-size: 63px 104px;
  }
}
.btn-vete{
  border: 0px
}
#logo{
  width: 3rem;
  border-radius: 50%
}
#menu{
  background-color: rgb(52, 73, 94);
  /*claro*/
  background-color: #7952b3;
  /*oscuro*/
  background-color: #563d7c;
}
.box {
  display: flex;
  align-items:center;
}
</style>
