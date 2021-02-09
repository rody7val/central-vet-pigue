<template>
  <div>
    <h1 class="my-5 shop-title">Ofertas Online</h1>
    <b-spinner small v-if="$store.state.categories.data.length" class="mb-5"></b-spinner>
    <b-card-group v-else columns class="mb-5">
        <b-card class="card-category bg-light shadow" bg-variant="light"
          v-for="(category, index) in $store.state.categories.data || []" :key="index"
          @click="setSearchCategory(category.name)"
          :img-src="category.img"
          :img-alt="category.name"
          img-top
        >
        <code><h3 class="card-title shop-title">{{category.name}}</h3></code>
        </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "categories",
  mounted () {
    this.$store.dispatch("categories/openDBChannel");
  },
  methods: {
    setSearchCategory (name) {
      this.$store.commit("setSearchCategory", name)
      this.$router.push("/items")
    }
  }
  // data () {
  //   return {
  //     categories: []
  //   }
  // },
  // created () {
  //   this.$store.dispatch('categories/openDBChannel')
    // let getAllCategories = this.$firebase.functions().httpsCallable("getAllCategories")
    // console.log("getAllCategories")
    // getAllCategories().then(result => {
    //   if (!result.data.success) return console.log(result.data.err)
    //   console.log(result.data.categories)
    //   this.categories = result.data.categories
    // })
  // }
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
