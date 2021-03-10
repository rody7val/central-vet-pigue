<template>
  <div>
    <b-container>
    <b-row>
      <b-col sm="12" md="4" lg="3" class="bd-sidebar">
        <!-- header shop -->
        <h2 class="shop-title pt-2" style="text-transform: uppercase;">Ofertas Online</h2>
        <!-- category select -->
        <b-form inline>
          <b-input-group prepend="Categoria" class="mb-2">
            <b-form-select
              v-model="$store.state.search_category"
              @change="changeSearchCategory">
              <b-form-select-option :value="''">Todo</b-form-select-option>
              <b-form-select-option :key="index"
                :value="category.name"
                v-for="(category, index) in $store.state.categories.data">{{category.name}}</b-form-select-option>
            </b-form-select>
          </b-input-group>
        </b-form>
        <!-- muted -->
        <p class="text-muted">
          <small>
            ({{Object.keys($store.state.items.data).length}} resultados)
          </small>
        </p>
      </b-col>
      
      <b-col sm="12" md="8" lg="9" class="mi-shop">
        <!-- items list -->
        <b-card-group columns v-if="Object.keys(this.$store.state.items.data).length > 0">
            <!-- <p v-if="!this.$store.state.items.data.length">Sin resultados...</p> -->
            <b-card bg-variant="light" class="card-items mx-sm-0 shadow"
              v-for="(item, index) in this.$store.state.items.data" :key="index"
              :img-src="item.img"
              :img-alt="item.name"
              img-top
              @click="$router.push('/items/'+item.id)"
              style="
                cursor: pointer
              ">
              <b-card-text>
                <h3 class="item-list-title shop-title">{{item.name}}</h3>
                <h3 class="shop-text mt-3"><code>$ {{Number(item.price).toFixed(0)}}</code></h3>
              </b-card-text>
            </b-card>
        </b-card-group>
        <div v-else>Sin resultados...</div>
      </b-col>
    </b-row>
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
  beforeDestroy () {
    this.$store.dispatch('items/closeDBChannel', { clearModule: true })
    this.$store.dispatch('categories/closeDBChannel', { clearModule: true })
  },
  mounted () {
    this.getCategories()
    this.getItemsSearch()
  },
  methods: {
    changeSearchCategory (event) {
      this.$store.commit("setSearchCategory", event || "")
      this.getItemsSearch()
    },
    getCategories () {
      this.$store.dispatch('categories/openDBChannel')
    },
    getItemsSearch () {
      console.log(this.$store.state.search_category)
      this.$store.commit("resetItems")

      const orderBy = ['name']
      const where = [
        this.$store.state.search_category ? ['category', '==', this.$store.state.search_category.toLowerCase()] : ['name', '>', ""],
        //['another_field', '==', true],
      ]

      this.$store.dispatch('items/openDBChannel', {
        clauses: { where, orderBy }
      })
    },
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
.card-columns {
    -webkit-column-count: 3!important;
    column-count: 3!important;
}
.mi-shop {
  margin-top: 54px!important
}
  .item-list-title {
    font-size: 1.5rem!important
  }
@media (max-width: 994px) {
  .card-columns {
      -webkit-column-count: 2!important;
      column-count: 2!important;
  }
}
@media (max-width: 767px) {
  .bd-sidebar {
    position: relative;
    height: auto!important;
  }
  .mi-shop {
    margin-top: 7px!important
  }
}
@media (max-width: 575px) {
  .card-columns {
      -webkit-column-count: 1!important;
      column-count: 1!important;
  }
}
.bd-sidebar {
  background-color: #f7f7f7;
    position: -webkit-sticky;
    position: sticky;
    top: 60px;
    z-index: 1000;
    height: calc(100vh - 4rem);
}
</style>
