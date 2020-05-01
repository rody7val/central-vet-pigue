<template>
<b-container class="itemContainer" fluid="md">
  <a class="back btn btn-link" style="color: #007bff!important;" @click="$router.go(-1)">Volver</a>
  <b-row>
    <b-col cols="12" sm="12" md="10" lg="8">
      <b-card class="m-0 p-0">
        <b-row class="m-0 p-0">
          <b-col cols="4" sm="4" md="4" lg="4" class="m-0 p-0">
            <b-img style="cursor: pointer"
              :src="item.img" v-b-modal="item.name" fluid></b-img>
            <b-modal :id="item.name" hide-footer>
              <b-img :src="item.img" class="mb-2" fluid></b-img>
            </b-modal>
          </b-col>
          <b-col cols="8" sm="8" md="8" lg="8">
            <br>
            <small><time>Nuevo</time></small>
            <b-badge class="mr-2" style="cursor: initial; float: right"
              :variant="item.qty > 0 ? 'primary' : 'danger'">{{ item.qty || 0 }} u</b-badge>
            <h2 class="lead itemName">{{item.name}}</h2>
            <h1>$ {{item.price}}</h1>
            <hr>
            <p class="itemDesc">{{item.desc}}</p>
            <form id="ButtonMP" action="/procesar-pago" method="POST"></form>
            <br>
          </b-col>
        </b-row>
      </b-card>
      <br>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  name: 'ItemPublic',
  firestore () {
    return {
      item: this.$db.collection('items').doc(this.$route.params.key)
    }
  },
  data () {
    return {
      initPoint: 'not'
    }
  },
  mounted () {
    let preference = {
      items: [
        {
          title: this.item.title,
          unit_price: Number(this.item.price),
          quantity: 1
        }
      ]
    }
    this.$mp.preferences.create(preference).then(response => {
      console.log(response)
      global.init_point = response.body.init_point
      this.initPoint = response.body.init_point
    }).catch(error => {
      console.log(error)
    })
    let mpScript = document.createElement('script')
    mpScript.setAttribute('src', 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js')
    mpScript.setAttribute('data-preference-id', this.initPoint)
    document.getElementById('ButtonMP').appendChild(mpScript)
  }
}
</script>

<style scoped>
.card-body{
  margin: 0;
  padding: 0;
}
.itemName{
  font-size: 1.7rem!important;
}
  .imgItem{
    margin: 0 auto!important;
  }

/*lg*/
@media (max-width: 991px) {
  .itemName{
    font-size: 1.5rem!important;
  }
    .imgItem{
    margin: 0 auto!important;
  }
}
/*md*/
@media (max-width: 776px) {
  .itemName{
    font-size: 18px!important;
  }
    .imgItem{
    margin: 0 auto!important;
  }
}
/*sm*/
/*col*/
@media (max-width: 575px) {
  .form-group{
    margin-bottom: 0px;
  }
  .itemName, .itemDesc{
    font-size: 16px!important;
  }
  h1{font-size: 28px}
}
</style>
