<template>
  <div>
  <b-jumbotron style="background-color: #fff">
    <template v-slot:header>Veterinaria Central Vet</template>

    <template v-slot:lead>
      <b>Bienvenidos!</b>
      <p>Encontrá los mejores productos en nuestra central veterinaria de Pigüé</p>
    </template>

    <hr class="my-4">
  </b-jumbotron>

  <h3 class="display-4">Productos</h3>
  <br>
  <b-card-group columns>
    <router-link v-for='(item, index) in items' :key="index"
      :to="{
        name: 'itemPublic',
        params: { key: item['.key'] }
      }">
      <b-card
        :title="item.price ? '$ ' + item.price : 0"
        :img-src="item.img"
        :img-alt="item.name"
        img-top
      >
        <p class="lead">{{item.name}}</p>
        <hr>
        <b-badge class="mr-2" style="cursor: initial"
          :variant="item.qty > 0 ? 'success' : 'danger'">{{ item.qty || 0 }} u</b-badge>
      </b-card>
    </router-link>
  </b-card-group>
  </div>
</template>

<script>
export default {
  name: 'Home',
  firestore () {
    return {
      items: this.$db.collection('items')
    }
  }
}
</script>

<style scoped>
a, .card, .card:focus, .card:hover {
  color: #212529!important;
  text-decoration: none!important;
  cursor: pointer;
}
.card:hover{
  box-shadow: 0 0.25rem 0.25rem rgba(0,0,0,.25), inset 0 -1px 5px rgba(0,0,0,.25);
}
</style>
