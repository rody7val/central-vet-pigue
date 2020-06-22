<template>
  <div v-if="$user">
    <MenuAdmin />
    <b-container fluid style="margin-top: 120px; z-index: 1;">
      <b-row>
        <b-col sm="12">
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Router from 'vue-router'
import MenuAdmin from "./#MenuAdmin"
import router from "@/router/admin"

export default {
  name: "admin",
  router,
  components: { MenuAdmin }
}
</script>

<style scoped>
</style>
