<template>
<div>
  <br>
  <br>
    <b-row>
    <b-col sm="12" md="6" lg="5">
      <b-card
        :title="item.price ? '$ ' + item.price : 0"
        :img-src="item.img"
        :img-alt="item.name"
        img-top
      >
        <p class="lead">{{item.name}}</p>
        <hr>
        <p>{{item.desc}}</p>
        <b-badge class="mr-2" style="cursor: initial"
          :variant="item.qty > 0 ? 'success' : 'danger'">{{ item.qty || 0 }} u</b-badge>
          <b-button>Comprar</b-button>
      </b-card>
      <a class="back btn btn-link" @click="$router.go(-1)">Volver</a>
    </b-col>
      </b-row>
</div>
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
