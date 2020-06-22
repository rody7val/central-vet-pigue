<template>
  <b-row>
    <b-col md="6">
      <h4 class="my-2">Productos</h4>
      <ul>
      <li v-for="item in $store.state.items.data" :key="item.id">{{item.name}}</li>
      </ul>
    </b-col>
    <b-col md="6">
      <h4 class="my-2">Crear</h4>
    </b-col>
  </b-row>
</template>

<script>

export default {
  name: 'items'
}
</script>

<style scoped>
</style>
