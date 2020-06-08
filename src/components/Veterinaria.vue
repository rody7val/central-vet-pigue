<template>
<div>
  <b-jumbotron class="shadow" text-variant="dark" style="border-radius: 0px; padding: 0;">
    <b-container>
      <b-row>
        <b-col sm="8" class="order-2 order-sm-1 mb-5">
          <h1 class="title-home shop-title pt-0 pt-sm-5">VETERINARIA</h1>
          <h1 class="title-vete">CentralVet Pigüé</h1>
          <p>Clínica de Pequeños Animales</p>
          <hr class="my-sm-4" style="border-color: #7952b3">
          <p class="lead">M.V. Guillermina Puente</p>
        </b-col>
        <b-col sm="4" class="order-1 order-sm-2">
          <b-img id="logo-banner" fluid-grow src="https://centralvetpigue.com.ar/static/img/logo-central-vet.a27a323.jpg" class="my-5 my-sm-5 my-md-5 shadow"></b-img>
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
  max-width: 180px;
  padding: 7px;
  margin-top: 63px!important;
  margin: 0 auto;
  display: block;
}

@media (max-width: 575px) {
  .jumbotron{
    text-align: center;
  }
  #logo-banner{
    margin: 0 auto;
    display: block;
  }
  .title-home{
    font-size: 2.75rem!important;
  }
  .title-vete{
    font-size: 2rem!important;
  }
}
@media (min-width: 992px) {
  .title-home{
    font-size: 58px!important;
  }
}
</style>
