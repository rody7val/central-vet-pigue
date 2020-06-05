<template>
  <div id='app' class="wrapper">
    <Sidebar :categories="categories"/>
    <Menu/>
    <router-view />
    <!-- <Footer/> -->
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import Sidebar from '@/components/Sidebar'
// import Delivery from '@/components/Delivery'

export default {
  name: 'App',
  components: {
    Menu,
    Sidebar
  },
  data () {
    return {
      categories: []
    }
  },
  created () {
    let getAllCategories = this.$firebase.functions().httpsCallable("getAllCategories")
    console.log("getAllCategories")
    getAllCategories().then(result => {
      if (!result.data.success) return console.log(result.data.err)
      console.log(result.data.categories)
      this.categories = result.data.categories
    })
  }
}
</script>

<style>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
body{
  transition: all 0.3s;
  background-color: #f7f7f7!important;
}
.shadow{
  box-shadow: 0 0.25rem 0.25rem rgba(0,0,0,.25), inset 0 -1px 5px rgba(0,0,0,.25);
}
.shadow-text {

  text-shadow: 1px 1px 2px rgba(0,0,0,.5);
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
.nav-link.dropdown-toggle{
  padding-top: 4px;
  padding-bottom: 0;
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
ul.dropdown-menu{
  background-color: #007bff!important;
}
ul.dropdown-menu li a{
  background-color: #007bff!important;
  color: #fff!important;
  font-size: 22px
}
ul.dropdown-menu li a:hover{
  background-color: #fff!important;
  color: #333!important;
}
#sidebar-backdrop{
  background-color: #563d7c!important
}
p{
  font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
}
.input-group-text{
  color: #fff!important;
  background-color: #6c757d!important;
  border-color: #6c757d!important;
}

.icon-wsp{
  background-image: url("https://firebasestorage.googleapis.com/v0/b/central-vet-pigue.appspot.com/o/socials.png?alt=media&token=9c5ab189-6784-4263-8e0e-bfe452eae5d8");
  background-repeat: no-repeat;
  background-position: 10px 30px;
}

.icon-ig{
  background-image: url("https://firebasestorage.googleapis.com/v0/b/central-vet-pigue.appspot.com/o/socials.png?alt=media&token=9c5ab189-6784-4263-8e0e-bfe452eae5d8");
  background-repeat: no-repeat;
  background-position: 10px 30px;
}

.icon-fb{
  background-image: url("https://firebasestorage.googleapis.com/v0/b/central-vet-pigue.appspot.com/o/socials.png?alt=media&token=9c5ab189-6784-4263-8e0e-bfe452eae5d8");
  background-repeat: no-repeat;
  background-position: 10px 30px;
}

@media (max-width: 767px) {
  #menu .navbar-nav.ml-auto {
      -ms-flex-direction: row;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      flex-direction: row;
  }
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
