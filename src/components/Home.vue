<template>
  <div>
  <b-jumbotron bg-variant="primary" text-variant="white" style="margin-bottom: 0px" fluid>
    <template v-slot:header fluid>Veterinaria Central-Vet</template>
    <template v-slot:lead fluid>
      <b>Bienvenidos!</b>
      <p>Encontrá los mejores productos y servicios en nuestra Central Veterinaria de Pigüé</p>
    </template>

    <hr class="my-4">
    <b-button to="/p" class='btn-vete'>Productos</b-button>
    <b-button to="/s" variant='dark'>Servicios</b-button>
  </b-jumbotron>
  <b-carousel
    controls
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    fade
    indicators
    img-width="1024"
    img-height="480"
  >
    <b-carousel-slide
      caption="Gatos"
      img-src="https://placekitten.com/600/400"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Animales"
      img-src="https://placekitten.com/1024/768"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Veterinaria"
      img-src="https://placekitten.com/900/800"
    ></b-carousel-slide>
  </b-carousel>
</div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.btn-vete{
  color: #fff;
  background-color: #563d7c;
  border-color: #7952b3;
}
.btn-vete:focus,.btn-vete:active,.btn-vete:hover,.btn-vete:visited,.btn-vete:focus-within{
  background-color: #7952b3!important;
  border-color: #563d7c!important;
}
</style>
