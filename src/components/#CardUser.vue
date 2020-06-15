<template>
  <div>
    <b-card 
      img-topbg-variant="dark"
      :img-src="$store.state.users.data[$user.email].img"
      :img-alt="$store.state.users.data[$user.email].email">
      <h5><b>{{$store.state.users.data[$user.email].email}}</b></h5>
      <p class="lead mb-0">{{$store.state.users.data[$user.email].name}}</p>
      <div v-if="$store.state.users.data[$user.email].admin" class="text-right">
        <b-badge pill variant="success">Administrador</b-badge>
            </div>
            <template v-slot:footer>
        <em>Acciones:</em>
        <form class="lead mb-0 form-inline">
          <span>
            <b-form-checkbox switch
              @change="handleAdminChange"
              v-model="$store.state.users.data[$user.email].admin"
              name="admin"
              :value="true"
              :unchecked-value="false">
              <small>{{ $store.state.users.data[$user.email].admin ? "Usuario" : "Administrador" }}</small>
            </b-form-checkbox>
          </span>
        </form>
      </template>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'cardUser'
}
</script>

<style scoped>
</style>
