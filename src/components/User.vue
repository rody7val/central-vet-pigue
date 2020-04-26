<template>
  <div>
    <b-button :variant='variant ? variant : null' :size='size ? size : null' v-b-toggle.sidebar-backdrop>{{user.name}}</b-button>
    <b-sidebar
      id="sidebar-backdrop"
      :title="user.name"
      bg-variant="dark"
      text-variant="light"
      backdrop
      right
      shadow>
      <div class="px-3 py-2">
        <p><b>{{user.email}}</b></p>
        <p><b>Activo? </b> <b-badge :variant="user.active ? 'success' : 'danger'">{{user.active ? 'si' : 'no'}}</b-badge></p>
        <p><b>Administrador? </b> <b-badge :variant="user.admin ? 'success' : 'danger'">{{user.admin ? 'si' : 'no'}}</b-badge></p>
        <hr>
        <b-img :src="user.img" fluid thumbnail></b-img>
        <p>Creado {{ $moment(user.created).format('[el] ll') }}</p>
      </div>
    </b-sidebar>
  </div>
</template>

<script>

export default {
  name: 'User',
  props: ['user', 'size', 'variant']
}
</script>

<style scoped>
</style>
