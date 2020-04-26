<template>
  <b-jumbotron style="background-color: #fff">
    <template v-slot:header>Veterinaria Central Vet</template>

    <template v-slot:lead>
      <b>Bienvenidos!</b>
      <p>Encontrá los mejores productos en nuestra central veterinaria de Pigüé</p>
      <b-button>Ver productos</b-button>
      <b-button variant="dark">Ver servicios</b-button>
    </template>

    <hr class="my-4">

    <p>Servicios veterinarios - Guillermina Puente</p>
  </b-jumbotron>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
</style>
