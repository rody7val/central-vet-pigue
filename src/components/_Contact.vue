<template>
<div>
  <b-container class="mt-4">
    <b-row>
      <b-col>
        <h1 class="mb-5 shop-title">Contacto</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="6" lg="8"class="mb-5">
        <Mapa class="mapa"/>
      </b-col>
      <b-col md="6" lg="4"class="mb-5">
        <a title="Instagram"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/centralvetpigue/" >
          <p style="cursor: pointer">
            <img src="@/assets/ig.png" width="23px" class="ml-1 mr-2"> @centralvetpigue
          </p>
        </a>
        <a title="Facebook"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/centralvetpigue/" >
          <p style="cursor: pointer">
            <img src="@/assets/fb.png" width="33px" class="mr-1"> @centralvetpigue
          </p>
        </a>
        <a title="WhatsApp"
          target="_blank"
          rel="noopener noreferrer"
          href="https://wa.me/5492923464050" >
          <p style="cursor: pointer">
            <img src="@/assets/wsp.png" width="25px" class="ml-1 mr-2"> 2923-464050
          </p>
        </a>
        <a title="Telefono"
          target="_blank"
          rel="noopener noreferrer"
          href="tel:2923405033" >
          <p style="cursor: pointer">
            <img src="@/assets/phone.png" width="20px" class="ml-2 mr-2"> 2923-405033
          </p>
        </a>
        <a title="Telefono"
          target="_blank"
          rel="noopener noreferrer"
          href="mailto:centralvetpigue@gmail.com" >
          <p style="cursor: pointer">
            <b-icon width="30px" class="footer-icon ml-1" icon="envelope"></b-icon> centralvetpigue@gmail.com
            <!-- <img src="" width="20px" class="ml-2 mr-2"> -->
          </p>
        </a>
        <a title="Ciudad"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.google.com/maps/place/pigue,%20AR">
          <p style="cursor: pointer">
            <b-icon width="30px" class="footer-icon ml-1" icon="geo-alt"></b-icon> Pigüé, Buenos Aires, AR
          </p>
        </a>
        <a title="Dirección"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.google.com/maps/search/pigue%20san%20martin%20206">
          <p style="cursor: pointer">
            <b-icon width="30px" class="footer-icon ml-1" icon="geo-alt"></b-icon> 25 de Mayo, 206, <b>CP:</b> 8170
          </p>
        </a>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import Mapa from "./$Mapa";
export default {
  name: 'Contact',
  components: {
    Mapa
  },
  // created () {
  //   GoogleMapsApiLoader({
  //       libraries: ['places'],
  //       // apiKey: 'your-api-key' // optional
  //   })
  //   .then(googleApi => {
  //       const autocomplete = new googleApi.maps.places.AutocompleteService();
  //   }, function(err) {
  //       console.error(err);
  //   });
  // }
}
</script>

<style scoped>
  .mapa {
    height: 425px;
  }
.one-edge-shadow {
  -webkit-box-shadow: 0 8px 6px -6px black;
     -moz-box-shadow: 0 8px 6px -6px black;
          box-shadow: 0 8px 6px -6px black;
}
</style>
