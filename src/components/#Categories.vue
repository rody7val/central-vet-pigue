<template>
  <b-row>
    <b-col md="6">
      <h4 class="my-2">Categorías</h4>
      <!-- list categories -->
      <ul>
        <li v-for="category in $store.state.categories.data">{{category.name}}</li>
      </ul>
    </b-col>
    <b-col md="6">
      <h4 class="my-2">Crear</h4>
      <b-button v-if="!create"
        @click="create=true"
        size="sm"
        variant="primary">Nueva categoría</b-button>
      <!-- create category -->
      <b-form v-else @submit.prevent="createCategory">
        <b-form-group id="name-label" label="Nombre:" label-for="name">
          <b-form-input
            id="name"
            v-model="category.name"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <b-button
          @click="create=false"
          size="sm"
          variant="secondary">Cancelar</b-button>
        <b-button
          type="submit"
          size="sm"
          variant="primary">Guardar</b-button>
      </b-form>

      </form>
    </b-col>
  </b-row>
</template>

<script>

export default {
  name: 'Category',
  data () {
    return {
      create: false,
      category: {
        name: "",
      }
    }
  },
  methods: {
    createCategory (e) {
      console.log(this.category.name)

      this.$store.dispatch('categories/set', this.category)
    }
  }
}
</script>

<style scoped>
</style>
