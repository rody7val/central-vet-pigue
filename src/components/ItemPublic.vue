<template>
<b-container class="itemContainer" fluid>
  <a class="back btn btn-link" @click="$router.go(-1)">Volver</a>

  <b-card>
    <b-row>
      <b-col cols="4" sm="6" md="7" lg="7">
        <b-img style="cursor: pointer"
          :src="item.img" v-b-modal="item.name" class="mb-2" fluid></b-img>
        <b-modal :id="item.name" hide-footer>
          <b-img :src="item.img" class="mb-2" fluid></b-img>
        </b-modal>
      </b-col>
      <b-col cols="8" sm="6" md="5" lg="5">
        <small><time>Nuevo</time></small>
        <b-badge class="mr-2" style="cursor: initial; float: right"
          :variant="item.qty > 0 ? 'success' : 'danger'">{{ item.qty || 0 }} u</b-badge>
        <h3 class="itemName">{{item.name}}</h3>
        <h1 class="display-4">$ {{item.price}}</h1>
        <hr>
        <p class="itemDesc">{{item.desc}}</p>
        <b-button variant="success" v-b-modal="'my-modal'">Comprar</b-button>
        <b-modal id="my-modal" title="Metodos de Pago" hide-footer>
          <p>CBU, Contra Reembolso o MercadoPago</p>
        </b-modal>
      </b-col>
    </b-row>
  </b-card>
</b-container>
</template>

<script>
export default {
  name: 'ItemPublic',
  firestore () {
    return {
      item: this.$db.collection('items').doc(this.$route.params.key)
    }
  }
}
</script>

<style scoped>
</style>
