<template>
  <div>
  	<h4 class="mb-4">Productos</h4>
  	<ul>
	  <li v-for="item in $store.state.items.data" :key="item.id">{{item.name}}</li>
  	</ul>
  </div>
</template>

<script>

export default {
  name: 'items'
}
</script>

<style scoped>
</style>
