<template>
  <div v-if="$user" class="admin bg-white pb-5">
    <b-container style="z-index: 1;" fluid>
      <b-row>
        <b-col>
          <h1 class="mt-4 shop-title">
            <b-icon-arrow-left
              class="go-back"
              @click="$router.go(-1)"
            ></b-icon-arrow-left>
            Dashboard
          </h1>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12">
          <!-- if user banned -->
          <div v-if="!$store.state.users.data[$user.email].active">
            <p class="lead alert">Usuario Bloqueado! <a href="/">Volver</a></p>
          </div>
          <div v-else>
            <b-row>
              <b-col sm="5" md="4" lg="3" class="order-2 order-sm-1">
                <CardUser
                  :left="false"
                  :user="$store.state.users.data[$user.email]"
                />
              </b-col>
              <b-col sm="7" md="8" lg="9" class="order-1 order-sm-2">
                <!-- if user admin -->
                <div v-if="!$store.state.users.data[$user.email].admin">
                  <br/>
                  Bienvenido a bordo!<br/>
                  Gracias por unirte. <br/>
                  Estamos trabajando para expandir el sitio. <br/>
                  <b-img fluid-grow src="https://centralvetpigue.com.ar/static/img/logo-central-vet.a27a323.jpg" class="img my-5 my-sm-5 my-md-5 shadow"></b-img>
                </div>
                <!-- if user admin -->
                <div v-else>
                  <router-view />
                </div>
              </b-col>
            </b-row>
          </div>

        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Router from 'vue-router'
import MenuAdmin from "./#MenuAdmin"
import router from "@/router/admin"
import CardUser from "./#CardUser"
export default {
  name: "admin",
  router,
  components: {  CardUser }
}
</script>

<style scoped>
.admin{
  box-shadow: 0 0.25rem 0.25rem rgba(0,0,0,.25);
}
.go-back:hover {
  cursor: pointer;
  color: #7952b3
}
</style>
