<template>
  <div id='app'>
    <Menu/>
    <b-container>
      <router-view/>
      <b-jumbotron style="background-color: #fff">
        <template v-slot:header></template>
        <template v-slot:lead>
        </template>
        <hr class="my-4">
        <p>Servicios veterinarios - Guillermina Puente</p>
      </b-jumbotron>
    </b-container>

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
