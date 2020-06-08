<template>
  <div>
    <b-card bg-variant="light"
      id="card-item-view"
      :img-alt="item.title"
      class="bg-light mb-3">
      <b-container fluid>
        <b-row>
          <b-col sm="6" md="7" class="col-img">
            <b-spinner variant="secondary" small v-if="!item.img"></b-spinner>
            <img :src="item.img" class="card-img card-img-top img-fluid" />
          </b-col sm="6" md="5" >
          <b-col>
            <b-spinner variant="secondary" small v-if="!item.img"></b-spinner>
            <div v-else class="_card-body">
              <h1 class="shop-title title mt-3">{{item.title}}</h1>
              <h1 class="shop-text price mt-3"><code>$ {{item.price}}</code></h1>
              <!-- category select -->
                <b-input-group prepend="Cantidad" class="mb-0">
                  <b-form-input
                    v-model="qty"
                    type="number"
                    min="0"
                    :max="item.qty"
                    @change="_changeSearchCategory" class="input-block">
                  </b-form-input>
                </b-input-group>
                <p class="text-muted text-right">
                  <small>
                    ({{(item.qty) + " disponible" + (item.qty > 1 ? "s" : "") }})
                  </small>
                </p>
                <form @submit.prevent="_checkout">
                  <input class="btn btn-block btn-vete mb-2"
                    type="submit"
                    value="Comprar ahora"/>
                </form>
                <form @submit.prevent="_addToCart">
                  <input class="btn btn-block btn-cart mb-2"
                    type="submit"
                    value="Agregar al carrito"/>
                </form>
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
      qty: 0,

    }
  },
  methods: {
    _checkout () {
      alert("_checkout")
    },
    _addToCart () {
      alert("_addToCart")
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
        console.log(result.data.item)
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
