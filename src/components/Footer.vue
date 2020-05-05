<template>
  <div>
    <b-jumbotron bg-variant="ligth" text-variant="black" class="mb-0" fluid>
      <template v-slot:header></template>
      <template v-slot:lead></template>
      <b-container class="footer">
        <b-row>
          <b-col sm="4">
            <h3>Contacto</h3>
            <ul>
              <li>email</li>
              <li>telefono</li>
              <li>direccion</li>
              <li>wsp</li>
            </ul>
            <h3>Redes</h3>
            <ul>
              <li>facebook</li>
              <li>instagram</li>
            </ul>
          </b-col>
          <b-col sm="4">
            <h3>Profesional</h3>
            <ul>
              <li>veterinaria</li>
            </ul>
          </b-col>
          <b-col sm="4">
            <img class="shadow" src="@/assets/logo-central-vet.jpg" id="logo" fluid>
          </b-col>
        </b-row>
      </b-container>
      <hr class="my-4">
      <p class="text-center">Servicios Veterinarios - Guillermina Puente</p>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer h3{
  font-family: Helvetica Neue,Arial,Noto Sans;
  color: #333;
}
.footer img {
  border-radius: 50%
}
</style>
