<template>
  <div class="text-center">
  	<h1 class="mt-5"><code>404</code> err</h1>
  	<a @click="$router.push('/')">Volver</a>
  </div>
</template>

<script>
export default {
  name: "404"
}
</script>

<style scoped>
a, a:hover{
	cursor: pointer;
	color: blue;
}
</style>
