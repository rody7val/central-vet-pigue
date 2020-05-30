<template>
  <div id='app' class="wrapper">
    <Sidebar/>
    <Menu/>
    <b-container fluid>
      <i>{{$route.path}}</i>
    </b-container>
    <router-view/>
    <!-- <Footer/> -->
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import Sidebar from '@/components/Sidebar'
import Veterinaria from '@/components/Veterinaria'
// import Delivery from '@/components/Delivery'

export default {
  components: {
    Menu,
    Sidebar,
    Veterinaria
    // Delivery
  },
  name: 'App'
}
</script>

<style>
body{
  background-color: #f7f7f7!important;
}
.shadow{
  box-shadow: 0 0.25rem 0.25rem rgba(0,0,0,.25), inset 0 -1px 5px rgba(0,0,0,.25);
}
.truncate {
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.box {
  display: flex;
  align-items:center;
}
#nav-collapse{
  text-align: right!important;
}
time, .time{
  text-transform: uppercase!important;
  color: #8e8e8e!important;
}
.card-img-top{
  max-height: 250px;
  object-fit: cover;
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
@media (max-width: 575px) {
  .display-3{
    font-size: 3rem!important
  }
  .display-4{
    font-size: 2rem!important
  }
  .jumbotron{
    padding-right: 0;
    padding-left: 0;
  }
}
</style>
