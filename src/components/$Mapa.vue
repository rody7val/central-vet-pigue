<template>
  <CargarMapa
    :configMapa="configMapa"
    apiKey="AIzaSyCFsKut9WNeLt1ALYz1TW4WyVXBnR5awPE"
  >
 
    <template slot-scope="{ google, map }">
      <Marcadores
        v-for="marker in markers"
        :key="marker.id"
        :marker="marker"
        :google="google"
        :map="map"
      />
    </template>
 
  </CargarMapa>
 
</template>
 
<script>
 
  import CargarMapa from "./$CargarMapa";
  import Marcadores from "./$Marcadores";
  import { configMapa } from "../config/configMapa";
 
  export default {
    components: {
      CargarMapa,
      Marcadores
    },
 
    data() {
      return {
        markers: [
          {
            id: "0",
            position: { lat: -37.599838, lng: -62.406558 },
            title: "Machu Pichu - Cusco"
          }
        ]
      };
    },
 
    computed: {
      configMapa() {
        return {
          ...configMapa,
          center: this.mapCenter
        };
      },
 
      mapCenter() {
        return this.markers[0].position;
      }
    }
  };
  
</script>