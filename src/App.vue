<template>
  <div id='app'>
    <Menu/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import Footer from '@/components/Footer'

export default {
  components: {
    Menu,
    Footer
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
#nav-collapse{
  text-align: right!important;
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
