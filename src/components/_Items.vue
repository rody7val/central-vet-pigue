<template>
  <div>
    <b-container>
      <b-spinner small v-if="!categories.length"></b-spinner>
      <div v-else>
        <!-- header shop -->
        <h2 class="mt-1 mb-2 mt-sm-3 shop-title" style="text-transform: uppercase;">{{
          (categories && categories.length)&&($route.query && $route.query.category) ? categories[this._getIndexCategory(categories)].name : "Tienda"
        }}</h2>
        <!-- category select -->
        <b-form inline>
          <b-input-group prepend="Categoria" class="mb-2">
            <b-form-select
              v-model="$store.state.search_category"
              @change="_changeSearchCategory">
              <b-form-select-option :value="''">Todas</b-form-select-option>
              <b-form-select-option :key="index"
                :value="category._id"
                v-for="(category, index) in categories">{{category.name}}</b-form-select-option>
            </b-form-select>
          </b-input-group>
        </b-form>
        <!-- items list -->
        <b-card-group columns>
          <b-spinner small v-if="load_items"></b-spinner>
          <div v-else>
            <p v-if="!items.length">Sin resultados...</p>
            <b-card bg-variant="light" class="card-items mx-4 mx-sm-0 shadow"
              v-for="(item, index) in items" :key="index"
              @click="$router.push('/items/'+item._id)"
              :img-src="item.img"
              :img-alt="item.title"
              img-top
              style="
                cursor: pointer
              ">
              <b-card-text>
                <h3 class="item-list-title shop-title">{{item.title}}</h3>
                <h3 class="shop-text mt-3"><code>$ {{item.price}}</code></h3>
              </b-card-text>
            </b-card>
          </div>
        </b-card-group>
      </div>
    </b-container>      
  </div>
</template>

<script>
import ItemId from "@/components/_ItemId.vue"
export default {
  name: 'Items',
  components: {
    ItemId
  },
  data () {
    return {
      search_category: "",
      load_categories: false,
      load_items: false,
      categories: [],
      items: []
    }
  },
  methods: {
    _changeSearchCategory (event) {
      this.$router.push('/items?category='+event);  
      this._getItemsSearch()
    },
    _getAllCategories () {
      this.load_categories = true
      let getAllCategories = this.$firebase.functions().httpsCallable("getAllCategories")
      console.log("getAllCategories")
      getAllCategories().then(result => {
        if (!result.data.success) {
          this.load_categories = false
          this.categories = []
          return console.log(result.data)
        }
        console.log(result.data.categories)
        this.categories = result.data.categories
        this.load_categories = false
      })
    },
    _getItemsSearch () {
      this.load_items = true
      let getItemsSearch = this.$firebase.functions().httpsCallable("getItemsSearch")
      let params = {}
      if (this.$route.query.category) params.category = this.$route.query.category
      if (this.$route.query.tag) params.tag = this.$route.query.tag
      if (this.$route.query.title) params.title = this.$route.query.title
      console.log("getItemsSearch")
      getItemsSearch(params).then(result => {
        if (!result.data.success) {
         this.load_items = false
         this.items = []
         return console.log(result.data)
        }
        console.log(result.data.items)
        this.items = result.data.items
        this.load_items = false
      })
    },
    _getIndexCategory (categories) {
      return categories.map(category => {return String(category._id)}).indexOf(this.$route.query && this.$route.query.category ? this.$route.query.category : null)
    }
  },
  created () {
    this.search_category = this.$route.query && this.$route.query.category ? this.$route.query.category : ""
    this._getAllCategories()
    this._getItemsSearch()
  }
}
</script>

<style scoped>
.card-items {
  cursor: pointer;
}
.card-items:hover {
  border: 1px solid indigo!important;
}
.card-body{
  padding: 10px!important
}
@media (max-width: 575px) {
  .item-list-title {
    font-size: 1.8rem!important  }
}
</style>
