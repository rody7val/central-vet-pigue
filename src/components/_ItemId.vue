<template>
  <div>
    <b-card
      id="card-item-view"
      bg-variant="light"
      class="bg-light mb-3"
      style="margin-top: -1px; margin-bottom: 0px!important;"
      :img-alt="$store.state.items.data[$route.params.id].name"
    >
      <b-container fluid>
        <b-row>
          <b-col sm="6" md="7" class="col-img">
            <img :src="$store.state.items.data[$route.params.id].img" class="card-img card-img-top img-fluid" />
          </b-col sm="6" md="5" >
          <b-col>
            <!-- alert info -->
            <b-alert
              :class="clase"
              :show="show"
              dismissible
              @dismissed="show=false"
              fade>
              <p>Agregado!</p>
              <h5>Total carro: 
                <code class="mt-0" style="display: flex; float: right; font-size: 1.3rem">
                  ${{Number($store.state.total).toFixed(0)}}
                </code>
              </h5>
            </b-alert>
            <div class="_card-body">
              <!-- title -->
              <h1 class="shop-title title mt-3">{{$store.state.items.data[$route.params.id].name}}</h1>
              <!-- price -->
              <h1 class="shop-text price mt-3"><code>$ {{Number($store.state.items.data[$route.params.id].price).toFixed(0)}}</code></h1>
                <!-- stock muted -->
                <!-- <p class="text-muted text-right">
                  <small>
                    ({{($store.state.items.data[$route.params.id].qty) + " disponible" + ($store.state.items.data[$route.params.id].qty > 1 ? "s" : "") }})
                  </small>
                </p> -->
                <!-- checkout -->
                <div class="text-center" v-if="load">
                  <b-spinner label="Spinning"></b-spinner>
                </div>
                <div v-else>
                  <!-- qty select -->
                  <b-input-group prepend="Cantidad" class="mb-2">
                      <!-- :max="$store.state.items.data[$route.params.id].qty" -->
                    <b-form-input
                      v-model="qty"
                      type="number"
                      min="1"
                      @change="_changeItemQty" class="input-block">
                    </b-form-input>
                  </b-input-group>
                  <!-- mp -->
                  <img src="https://firebasestorage.googleapis.com/v0/b/central-vet-pigue.appspot.com/o/MP-payButton-logos.png?alt=media&token=ee6aad3f-847d-4ad9-8c6e-36dfe00abd56">
                  <!-- checkout -->
                  <form @submit.prevent="checkout">
                    <input class="btn btn-block btn-vete mb-2"
                      type="submit"
                      value="Comprar ahora"/>
                  </form>
                  <!-- add to cart -->
                  <form @submit.prevent="addToCart">
                    <input class="btn btn-block btn-cart mb-2"
                      type="submit"
                      value="Agregar al carrito"/>
                  </form>
                  <b-link style="display: block" class="text-center" @click="$router.push('/items')">Seguir comprando</b-link>
                </div>
            </div>
          </b-col>
        </b-row>
    </b-container>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'itemId',
  data () {
    return {
      load: false,
      item: {},
      qty: 1,
      show: false,
      alert_item: "",
      clase: "",
      alert_qty: ""
    }
  },
  mounted () {
    this.$store.commit("resetItems")
    this.$store.dispatch('items/fetchById', this.$route.params.id)
  },
  methods: {
    checkout () {
      this.load = true
      let item = this.$store.state.items.data[this.$route.params.id]
      let id = this.$route.params.id
      let title = item.name
      let price = Number(Number(item.price).toFixed(2))
      let currency = 'ARS'
      let qty = Number(this.qty)
      const preference = {
        items: [
          {
            id: id,
            title: title,
            unit_price: price,
            currency_id: 'currency',
            quantity: qty,
          }
        ],
        "back_urls": {
          "success": `https://centralvetpigue.com.ar/${id}/${price}/${qty}/`
        }
      }
      let createPreference = this.$firebase.functions().httpsCallable("createPreference")
      createPreference(preference).then(result => {
        if (!result.data.success) {
         this.load = false
         // this.item = {}
         return console.log(result.data)
        }
        console.log(result.data.init_point)
        window.location.replace(result.data.init_point)
      })
    },
    addToCart () {
      let item = this.$store.state.items.data[this.$route.params.id]
      this.$store.commit('addItemToCart', {
        id: this.$route.params.id,
        name: item.name,
        price: Number(Number(item.price).toFixed(2)),
        total_price: Number(Number(Number(item.price) * Number(this.qty)).toFixed(0)),
        count: Number(this.qty),
        max: Number(item.qty)
      })
      this.show = true
      this.alert_item = item.name
      this.clase = "alert-central-vet"
      this.alert_qty = item.count
      //this.$cart.addItemToCart(this.item.title, this.item.price, this.qty, this.item.qty)
    },
    _changeItemQty (e) {
      this.qty = e
    },
  },
  // created () {
  //   this._getItemId()
  // }
}
</script>

<style scoped>
.price, .title{
  font-size: 35px;
}
#card-item-view .card-body{
  padding: 0;
}
#card-item-view, #card-item-view img{
  border: 0;
  border-radius: 0;
}
.col-img{
  background-color: #f3f3f3 !important;
  border: 0;
  min-height: 226px
}
@media (min-width: 575px) {
  #card-item-view img{
    max-height: 550px;
    display: block;
    width: auto;
    margin: 0 auto;
  }
}
@media (max-width: 575px) {
  .price, .title{
    font-size: 25px;
  }
  #card-item-view h3{    
    font-size: 18px
  }
}
</style>
