<template>
  <div>
  	<h4 class="mb-4">Categorías</h4>
  	<ul>
	  <li v-for="category in $store.state.categories.data">{{category.name}}</li>
  	</ul>
  </div>
</template>

<script>

export default {
  name: 'Category'
}
</script>

<style scoped>
</style>
