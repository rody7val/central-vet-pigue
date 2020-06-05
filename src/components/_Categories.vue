<template>
  <div>
    <h1 class="my-5">Tienda</h1>
    <b-spinner small v-if="!categories.length"></b-spinner>
    <b-card-group v-else columns>
        <b-card class="card-category shadow" bg-variant="light"
          v-for="(category, index) in categories" :key="index"
          @click="$router.push('/items?category='+category._id)"
          :title="category.name"
          :img-src="category.img"
          :img-alt="category.name"
          img-top
        ></b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "categories",
  data () {
    return {
      categories: []
    }
  },
  created () {
    let getAllCategories = this.$firebase.functions().httpsCallable("getAllCategories")
    console.log("getAllCategories")
    getAllCategories().then(result => {
      if (!result.data.success) return console.log(result.data.err)
      console.log(result.data.categories)
      this.categories = result.data.categories
    })
  }
}
</script>

<style scoped>
.card-title {
  text-transform: uppercase;
}
.card-category {
  text-align: center;
  cursor: pointer;
}
.card-category:hover {
  border: 1px solid indigo!important;
}
</style>
