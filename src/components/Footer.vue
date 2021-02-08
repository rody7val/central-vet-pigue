<template>
  <div>
    <b-jumbotron bg-variant="light" text-variant="black" class="mb-0">
      <template v-slot:header></template>
      <template v-slot:lead></template>
      <b-container class="footer" fluid>
        <b-row>
          <b-col sm="8">
            <h3>Contacto</h3>
            <ul class="list-footer pl-4">
              <li>
                <a title="Email" href="mailto:centralvetpigue@gmail.com">
                  <b-icon class="footer-icon mr-2" icon="envelope"></b-icon> centralvetpigue@gmail.com
                </a>
              </li>
              <li>
                <a title="Telefono" href="tel:2923405033">
                  <b-icon class="footer-icon mr-2" icon="phone"></b-icon> 2923-405033
                </a>
              </li>
              <li>
                <a title="WhatsApp" href="https://wa.me/5492923464050">
                  <b-icon class="footer-icon mr-2" icon="phone"></b-icon> 2923-464050 (WhatsApp)
                </a>
              </li>
              <li>
                <a title="Ciudad" href="https://www.google.com/maps/place/pigue,%20AR">
                  <b-icon class="footer-icon mr-2" icon="geo-alt"></b-icon> Pigüé, Buenos Aires, AR
                </a>
              </li>
              <li>
                <a title="Dirección" href="https://www.google.com/maps/search/pigue%20san%20martin%20208">
                  <b-icon class="footer-icon mr-2" icon="geo-alt"></b-icon> 25 de Mayo, 208, <b>CP:</b> 8170
                </a>
              </li>
            </ul>
            <h3>Redes</h3>
            <ul class="list-footer pl-4">
              <li><a href="https://www.facebook.com/centralvetpigue/" target="_blank" noopener noreferrer><b-icon class="footer-icon mr-2" icon="box-arrow-up-right"></b-icon> Facebook</a></li>
              <li><a href="https://www.instagram.com/centralvetpigue/" target="_blank" noopener noreferrer><b-icon class="footer-icon mr-2" icon="box-arrow-up-right"></b-icon> Instagram</a></li>
            </ul>
          </b-col>
          <b-col sm="4">
            <img class="shadow avatar-footer" src="@/assets/logo-central-vet.jpg" fluid>
          </b-col>
        </b-row>
      </b-container>
      <hr class="my-4">
      <b-avatar class="avatar-footer" variant="primary" size="3rem"></b-avatar>
      <p class="text-center">
        M.V. Guillermina Puente
      </p>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.avatar-footer{
  display: flex;
  margin: 0 auto;
}
.list-footer{
  list-style: none;
}
.list-footer > li{
  padding-bottom: 6px;
}
.list-footer a{
  text-decoration: none;
  color: #333!important;
}
.list-footer a:hover{
  color: #007bff!important;
}
.list-footer a > .footer-icon{
  color: #007bff!important;
}
.footer h3{
  font-family: Helvetica Neue,Arial,Noto Sans;
  color: #007bff!important;
  letter-spacing: 3px;
}
.footer img {
  border-radius: 50%
}
</style>
