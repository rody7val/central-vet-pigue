<template>
<div>
  <b-jumbotron class="shadow-text" bg-variant="dark" text-variant="light" style="border-radius: 0px; padding: 0;">
    <b-container>
      <b-row>
        <b-col sm="8" class="order-2 order-sm-1">
          <h1 class="title-home pt-3 pt-sm-5">VETERINARIA</h1>
          <h2>CentralVet Pigüé</h2>
          <p>Clínica de Pequeños Animales</p>
          <hr class="my-sm-4" style="border-color: #7952b3">
          <p class="lead">M.V. Guillermina Puente</p>
        </b-col>
        <b-col sm="4" class="order-1 order-sm-2">
          <b-img id="logo-banner" fluid-grow src="https://centralvetpigue.com.ar/static/img/logo-central-vet.a27a323.jpg" class="mt-5 mb-4 my-sm-5 my-md-5" style="box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.9) !important;" ></b-img>
        </b-col>
      </b-row>

    </b-container>
  </b-jumbotron>
  <b-container>
    <Categories/>
  </b-container>
</div>
</template>

<script>
import Categories from "@/components/_Categories"
export default {
  name: "home",
  components: {
    Categories
  }
}
</script>

<style scoped>
.title-home{  
  font-size: 3rem!important;
  color: #7952b3;
}
#logo-banner{
  border-radius: 50%;
}

@media (max-width: 575px) {
  .jumbotron{
    text-align: center;
  }
  #logo-banner{
    max-width: 280px;
    margin: 0 auto;
    display: block;
  }
}
@media (min-width: 992px) {
  .title-home{
    padding-top: 75px!important;
  }
  .title-home{
    font-size: 58px!important;
  }
}
</style>
