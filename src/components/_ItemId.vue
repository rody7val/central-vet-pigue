<template>
  <div>
    <b-card bg-variant="light" style="margin-top: -1px;"
      id="card-item-view"
      :img-alt="$store.state.items.data[$route.params.id].title"
      class="bg-light mb-3">
      <b-container fluid>
        <b-row>
          <b-col sm="6" md="7" class="col-img">
            <img :src="$store.state.items.data[$route.params.id].img" class="card-img card-img-top img-fluid" />
          </b-col sm="6" md="5" >
          <b-col>
            <div class="_card-body">
              <h1 class="shop-title title mt-3">{{$store.state.items.data[$route.params.id].name}}</h1>
              <h1 class="shop-text price mt-3"><code>$ {{$store.state.items.data[$route.params.id].price}}</code></h1>
              <!-- qty select -->
                <b-input-group prepend="Cantidad" class="mb-0">
                  <b-form-input
                    v-model="qty"
                    type="number"
                    min="1"
                    :max="$store.state.items.data[$route.params.id].qty"
                    @change="_changeItemQty" class="input-block">
                  </b-form-input>
                </b-input-group>
                <!-- muted -->
                <p class="text-muted text-right">
                  <small>
                    ({{($store.state.items.data[$route.params.id].qty) + " disponible" + ($store.state.items.data[$route.params.id].qty > 1 ? "s" : "") }})
                  </small>
                </p>
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
                <!-- mp -->
                <img src="http://web-central-vet.herokuapp.com/img/MP-payButton-logos.png" alt="mercadopago">
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
      qty: 1
    }
  },
  mounted () {
    this.$store.commit("resetItems")
    this.$store.dispatch('items/fetchById', this.$route.params.id)
  },
  methods: {
    checkout () {
      this.load = true
      let preference = {
        items: [
          {
            id: this.item._id,
            title: this.item.title,
            unit_price: Number(this.item.price),
            currency_id: 'ARS',
            quantity: Number(this.qty),
          }
        ]
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
        total_price: Number(Number(Number(item.price) * Number(this.qty)).toFixed(2)),
        count: Number(this.qty),
        max: Number(item.qty)
      })
      //this.$cart.addItemToCart(this.item.title, this.item.price, this.qty, this.item.qty)
    },
    _changeItemQty (e) {
      this.qty = e
    },
    _getItemId () {
      this.load = true
      let getItemId = this.$firebase.functions().httpsCallable("getItemId")
      getItemId({_id: this.$route.params.id}).then(result => {
        if (!result.data.success) {
         this.load = false
         this.item = {}
         return console.log(result.data)
        }
        this.item = result.data.item
        this.load = false
      })
    }
  },
  created () {
    this._getItemId()
  }
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
  background-color: #352450 !important;
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
