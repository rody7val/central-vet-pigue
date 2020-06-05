<template>
  <div>
    <b-spinner small v-if="load"></b-spinner>
    <b-form inline v-else>
      <!-- category select -->
      <b-input-group prepend="Categoria">
        <b-form-select
          v-model="search_category"
          @change="_changeSearchCategory">
          <b-form-select-option :value="''">Todas</b-form-select-option>
          <b-form-select-option :key="index"
            :value="category._id"
            v-for="(category, index) in categories">{{category.name || category.title}}</b-form-select-option>
        </b-form-select>
      </b-input-group>
    </b-form>
  </div>
</template>

<script>
import ItemsSearch from "@/components/_Search"
export default {
  name: 'Items',
  props: ["categories", "getItemsSearch"],
  components: {
    ItemsSearch
  },
  data () {
    return {
      load: false,
      search_category: ""
    }
  },
  methods: {
    _changeSearchCategory (event) {
    	console.log(event)
      this.$router.push('/items?category='+event);  
      this.getItemsSearch()
    }
  },
  created () {
   this.search_category = this.$route.query && this.$route.query.category ? this.$route.query.category : ""
  }
}
</script>

<style scoped>
</style>
