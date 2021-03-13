<template>
<div>
  <b-container class="mt-4">
    <b-alert class="mt-4" variant="success" show>
      <b-row>
        <b-col class="my-2" sm="4" md="3">
          <img class="imgSuccess" fluid src="@/assets/1f389.svg"/>
        </b-col>
        <b-col sm="8" md="9">
          <h1 class="my-2 shop-title">
            Gracias por tu compra!
          </h1>
      <!-- table -->
        <b-table class="table-items"
          :fields="fields"
          :items="Object.keys($store.state.items.data).map(key => $store.state.items.data[key])"
          :striped="false"
          :borderless="true"
          :fixed="false"
          :hover="true"
          head-variant="light">
          <!-- Nombre -->
          <template v-slot:cell(name)="data">
            <small class="lead">{{ data.value }}</small>
          </template>
          <!-- Imagen -->
          <template v-slot:cell(img)="data">
            <b-img :src="data.value" width="60px"></b-img>
          </template>
          <!-- total -->
          <template v-slot:table-caption>
            <hr>
            <h1 class="text-right mr-2 pr-1 text-dark">
              <small><b>Total  </b></small> <code> ${{Number(total()).toFixed(0)}}</code></h1>
          </template>
        </b-table>
        </b-col>
      </b-row>
    </b-alert>
  </b-container>
</div>
</template>
<script>
export default {
  name: 'Scuccess',
  data () {
    return {
      fields: [  // id, name, price, count, max
        {
          key: 'img',
          label: 'Imagen'
        },
        {
          key: 'name',
          label: 'Nombre',
          sortable: true
        },
      ]
    }
  },
  mounted () {
    let itemIds = this.$route.params.itemId.split('-')
    itemIds.map(id => {
      this.$store.dispatch('items/fetchById', id)
    })
  },
  methods: {
    total() {
      let prices = this.$route.params.price.split('-')
      let qtys = this.$route.params.qty.split('-')
      let total = 0
      prices.map((price, index) => {
        total += (price * qtys[index])
      })
      return total
    },
  }
}
</script>

<style scoped>
.imgSuccess{
  max-width: 140px;
  margin: 0 auto;
  display: block;
}
.table-items{
  background-color: #f7f7f7;
}
</style>
