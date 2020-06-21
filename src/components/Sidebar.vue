<template>

  <div>
    <b-sidebar
      id="sidebar-backdrop"
      text-variant="light"
      backdrop
      shadow
    >
      <div class="px-3 py-2">
        <div class="text-center">
          <img src="@/assets/logo-central-vet.jpg" id="logo">
          <h3>CentralVet</h3>
          <label class="lead">M.V. Guillermina Puente</label>
          <hr>
        </div>
        <div>
          <b-nav vertical pills>
            <!-- admin -->
              <button v-if="$user"
                @click="$router.push('/admin')"
                :class="'btn btn-block btn-vete text-left mt-0 ' + sidebarState('/admin*', 'active')">Dashboard</button>
            <!-- home -->
              <button
                @click="$router.push('/')"
                :class="'btn btn-block btn-vete text-left mt-0 ' + sidebarState('^/$', 'active')">Veterinaria</button>
            <!-- shop -->
              <button
                @click="$router.push('/items')"
                :class="'btn btn-block btn-vete text-left mt-0 ' + sidebarState('/items*', 'active')">Tienda</button>
            <!-- contact -->
              <button
                @click="$router.push('/contact')"
                :class="'btn btn-block btn-vete text-left mt-0 ' + sidebarState('/contact', 'active')">Contacto</button>
          </b-nav>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  name: "sidebar",
  methods: {
    sidebarState(path, className){
      return (this.$route.path.match(new RegExp(path)) !== null) ? className : ''
    }
  }
}
</script>

<style scoped>
.active{
  text-decoration: none!important;
  background-color: #563d7c!important;
  border-color: #7952b3!important;
}
nav.navbar a.navbar-brand, ul.nav button {
  font-size: 22px;
}
nav.navbar a.navbar-brand, ul.nav button.btn-vete {
  border-color: #7952b3!important;
}
.navbar-collapse ul li a {
  font-size: 20px
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
  border-color: #563d7c!important
}
@media (max-width: 575px) {
  .svg-cat{
    background-image: url('https://image.flaticon.com/icons/svg/1089/1089421.svg');
    background-repeat: no-repeat;
    background-size: 72px 100px;
  }
}
.btn {
    border-radius: 0px;
}
a {
  padding: 0px!important
}
.b-sidebar-header{
  margin: 0 auto;
}
#logo {
  border-radius: 50%;
  width: 100px;
}
</style>
