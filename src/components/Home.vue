<template>
  <div>
  <b-carousel
    class="carousel-multi-item shadow"
    controls
    id="carousel-fade"
    style="text-shadow: 0px 0px 2px #000"
    slide

    indicators>
    <b-carousel-slide
      caption="Oferta 1"
      img-src="https://placekitten.com/1100/100"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Oferta 2"
      img-src="https://placekitten.com/1100/100"
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Oferta 3"
      img-src="https://placekitten.com/1100/100"
    ></b-carousel-slide>
  </b-carousel>

  <b-jumbotron bg-variant="primary" text-variant="white" class="mb-0 shadow" fluid>
    <template v-slot:header fluid>Veterinaria Central-Vet</template>
    <template v-slot:lead fluid >
      <b>Bienvenidos!</b>
      <p>Encontrá los mejores productos y servicios en nuestra Central Veterinaria de Pigüé</p>
    </template>

    <hr class="my-4">
    <b-button to="/p" class='btn-vete'>Productos</b-button>
  </b-jumbotron>

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
