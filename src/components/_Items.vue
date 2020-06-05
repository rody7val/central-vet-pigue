<template>
  <div>
    <b-container>
      <h2 class="mt-3 mb-2">Buscar</h2>
      <ItemsSearch :categories="categories" :getItemsSearch="_getItemsSearch"/>
  	  <h2 class="mt-3 mb-2">Tienda</h2>
		  <b-card-group columns>

  	  	<b-spinner small v-if="load"></b-spinner>
        <div v-else>
          <p v-if="!items.length">Sin resultados...</p>
          <b-card v-else class="card-items shadow"
            v-for="(item, index) in items" :key="index"
            :title="item.title"
            :img-src="item.img"
            :img-alt="item.title"
            img-top>
            <b-card-text>

            </b-card-text>
          </b-card>
        </div>
		  </b-card-group>
    </b-container>      
  </div>
</template>

<script>
import ItemsSearch from "@/components/_Search"
export default {
  name: 'Items',
  components: {
    ItemsSearch
  },
  data () {
    return {
      load: false,
      categories: [],
      items: []
    }
  },
  methods: {
    _getAllCategories () {
      this.load = true
      let getAllCategories = this.$firebase.functions().httpsCallable("getAllCategories")
      console.log("getAllCategories")
      getAllCategories().then(result => {
        if (!result.data.success) {
          this.load = false
          return console.log(result.data.err)
        }
        console.log(result.data.categories)
        this.categories = result.data.categories
        this.load = false
      })
    },
    _getItemsSearch () {
      this.load = true
      let getItemsSearch = this.$firebase.functions().httpsCallable("getItemsSearch")
      console.log("getItemsSearch")
      let params = {}
      if (this.$route.query.category) params.category = this.$route.query.category
      if (this.$route.query.tag) params.tag = this.$route.query.tag
      if (this.$route.query.title) params.title = this.$route.query.title
      getItemsSearch(params).then(result => {
        if (!result.data.success) {
         this.load = false 
         return console.log(result.data.err)
        }
        console.log(result.data)
        this.items = result.data.items
        this.load = false
      })
    }
  },
  created () {
    this._getAllCategories()
    this._getItemsSearch()
  }
}
</script>

<style scoped>
.card-items {
  text-align: center;
  cursor: pointer;
}
.card-items:hover {
  border: 1px solid indigo!important;
}
</style>
