<template>
  <div>
    <button v-b-modal.cart class="btn btn-vete menu-button-cart mt-2 mr-2">
      <b-img src="https://firebasestorage.googleapis.com/v0/b/central-vet-pigue.appspot.com/o/cart.svg?alt=media&token=819c92e5-29ee-419e-9d89-d83af62805fc" width="19px" class=""></b-img>
      <span id="cart_count" class="badge btn-cart" >{{$store.state.count}}</span>
    </button>
    <form>
      <b-modal
        centered
        id="cart"
        title="Carrito"
        size="lg"
        header-bg-variant="info"
        header-text-variant="light"
        :hide-footer="!$store.state.cart.length ? true : false">
        <p v-if="!$store.state.cart.length" class="m-4 " id="cart_list">Vacio...</p>
        <!-- table -->
        <b-table v-else
          :busy="load"
          :fields="fields"
          :items="$store.state.cart"
          :striped="false"
          :borderless="true"
          :fixed="true"
          head-variant="light">
          <!-- Producto -->
          <template v-slot:cell(name)="data">
            <b>{{ data.value }}</b>
          </template>
          <!-- Cantidad -->
          <template v-slot:cell(count)="data">
            <p class="lead ">
              <span class="float-left mr-3">{{data.value}}</span>
              <span style="cursor: pointer"
                class="float-left mt-1 badge pill btn-primary"
                @click="_editById(data.item.id, Number(data.value)+1, data.item.price, true)">+</span>
              <span v-if="data.item.count >= 2" style="cursor: pointer"
                class="float-left mt-1 ml-2 badge pill btn-primary"
                @click="_editById(data.item.id, Number(data.value)-1, data.item.price, false)">-</span>
              <span v-if="data.item.count === 1" style="cursor: pointer"
                class="float-left mt-1 ml-2 badge pill btn-danger"
                @click="_deleteById(data.item.id)">borrar</span>
            </p>
          </template>
          <!-- Precio -->
          <template v-slot:cell(total_price)="data">
            <p class="lead">$ {{ Number(data.value).toFixed(0) }}</p>
          </template>
          <!-- total -->
          <template v-slot:table-caption>
            <hr>
            <h1 class="text-right mr-2 pr-1 text-dark">
              <small><b>Total  </b></small> <code> ${{Number($store.state.total).toFixed(0)}}</code></h1>
          </template>
          <!-- load -->
          <template v-slot:table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Cargando...</strong>
            </div>
          </template>
        </b-table>
        <!-- footer -->
        <template v-slot:modal-footer>
          <b-spinner v-if="load" label="Spinning"></b-spinner>
          <div v-else>
            <button @click="_delete" class="btn btn-danger mb-3">Borrar carro</button>
            <form form-inline @submit.prevent="_checkout">
              <input class="btn btn-block btn-vete mb-2"
                type="submit"
                value="Comprar ahora"/>
            </form>
          </div>
        </template>

      </b-modal>
    </form>
  </div>
</template>

<script>

export default {
  name: 'cart',
  data () {
    return {
      load: false,
      fields: [  // id, name, price, count, max
        {
          key: 'name',
          label: 'Producto',
          sortable: true
        },
        {
          key: 'count',
          label: 'Cantidad',
          sortable: true
        },
        {
          key: 'total_price',
          label: 'Precio',
          sortable: true
        }
      ]
    }
  },
  methods: {
    _checkout () {
      this.load = true
      let preference = {
        items: this.$store.state.cart.map((item, index) => {
          let _item = {
            id: item.id,
            title: item.name,
            unit_price: Number(item.price),
            currency_id: 'ARS',
            quantity: Number(item.count),
          }
          return _item
        })
      }
      let createPreference = this.$firebase.functions().httpsCallable("createPreference")
      createPreference(preference).then(result => {
        if (!result.data.success) {
         this.load = false
         alert(result.data.error.message)
         return console.log(result.data)
        }
        console.log(result.data.init_point)
        window.location.replace(result.data.init_point)
      })
    },
    _delete () {
      if (confirm("Borrar todo el carro?")) {
        this.$store.commit("deleteAllItems")
      }
    },
    _editById (id, count, price, plusCount) {
      this.$store.commit('editItemById', {id, count, price, plusCount})
    },
    _deleteById (id) {
      this.$store.commit("deleteItemById", id)
    }
  }
}
</script>

<style scoped>
.btn-vete{
  color: #fff!important;
  text-decoration: none!important;
  background-color: #7952b3;
  border-color: #563d7c!important;
}
.btn-vete:focus,.btn-vete:active,.btn-vete:hover,.btn-vete:visited,.btn-vete:focus-within{
  text-decoration: none!important;
  background-color: #563d7c!important;
  border-color: #7952b3!important;
}
.menu-button-cart{ 
  margin-right: 7px
}
@media (max-width: 767px) {
  .menu-button-cart {
    margin-right: 0px
  }
  .svg-cat{
    background-image: url('https://image.flaticon.com/icons/svg/1089/1089472.svg');
    background-repeat: no-repeat;
    background-size: 63px 104px;
  }
}
.btn-vete{
  border: 0px
}
#logo{
  width: 3rem;
  border-radius: 50%
}
#menu{
  background-color: rgb(52, 73, 94);
  /*claro*/
  background-color: #7952b3;
  /*oscuro*/
  background-color: #563d7c;
}
.box {
  display: flex;
  align-items:center;
}
</style>
