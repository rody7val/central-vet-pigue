<template>
  <div id='app'>
    <Menu/>
    <router-view/>
    <b-jumbotron bg-variant="dark" text-variant="white" style="margin-bottom: 0px" fluid>
      <template v-slot:header></template>
      <template v-slot:lead></template>
      <hr class="my-4">
      <p class="text-center">Servicios Veterinarios - Guillermina Puente</p>
    </b-jumbotron>
  </div>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  components: {
    Menu
  },
  name: 'App'
}
</script>

<style>
body{
  background-color: #e9ecef!important;
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
time, .time{
  text-transform: uppercase!important;
  color: #8e8e8e!important;
}
.card-img-top{
  height: 250px;
  object-fit: cover;
}
.btn-vete{
  color: #fff;
  background-color: #563d7c;
  border-color: #7952b3;
}
.btn-vete:focus,.btn-vete:active,.btn-vete:hover,.btn-vete:visited,.btn-vete:focus-within{
  background-color: #7952b3!important;
  border-color: #563d7c!important;
}
.itemName{
  font-size: 1.25rem!important;
}

/*lg*/
@media (max-width: 991px) {
  .itemName{
    font-size: 1.25rem!important;
  }
}
/*md*/
@media (max-width: 776px) {
  .itemName{
    font-size: 18px!important;
  }
}
/*sm*/

/*col*/
@media (max-width: 575px) {
  .itemName, .itemDesc{
    font-size: 14px!important;
  }
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
