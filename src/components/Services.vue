<template>
<b-container fluid>
  <b-row>
    <b-col>
      <br>
      <h3 >Servicios</h3>
      <br>
    </b-col>
  </b-row>
  <b-row>
    <b-card-group deck>
    <b-col sm="12" md="4" lg="4">
      <b-card no-body style="background-color: #7952b3; border-color: #563d7c;" text-variant="white" header="CLINICA" class="text-center">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <b-card-img src="https://placekitten.com/380/200" alt="Image" bottom></b-card-img>
      </b-card>
      <br>
    </b-col>
    <b-col sm="12" md="4" lg="4">
      <b-card no-body bg-variant="primary" text-variant="white" header="CIRUGIA" class="text-center">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
        <b-card-img src="https://placekitten.com/420/190" alt="Image" bottom></b-card-img>
      </b-card>
      <br>
    </b-col>
    <b-col sm="12" md="4" lg="4">
      <b-card no-body bg-variant="dark" text-variant="white" header="VACUNACION" class="text-center">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
        <b-card-img src="https://placekitten.com/480/210" alt="Image" bottom></b-card-img>
      </b-card>
      <br>
    </b-col>
    </b-card-group>
  </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'Services'
}
</script>

<style scoped>
</style>
