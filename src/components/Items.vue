<template>
<b-container fluid>
  <!-- fixed -->
  <CreateItem/>

  <!-- relative -->
  <b-row>
    <b-col md="8" sm="12">
      <h3 class="mt-3">Inventario</h3>
      <b-spinner v-if="!items.length" variant="primary" label="Spinning"></b-spinner>
      <b-list-group v-else>
        <b-list-group-item v-for='(item, index) in items'
          class="d-flex justify-content-between align-items-center"
          :key='index'>
          <router-link
            class="truncate"
            :to="{
              name: 'item',
              params: {
                key: item['.key'],
                uid: item.uid
              }
            }">{{item.name}}</router-link>
          <b-badge class="mr-2" style="cursor: initial"
            :variant="item.qty > 0 ? 'success' : 'danger'">{{ item.qty || 0 }} u</b-badge>
          <b-badge variant="danger" @click='remove(item)'>borrar</b-badge>
        </b-list-group-item>
      </b-list-group>
      <br><br><br><br>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import CreateItem from '@/components/CreateItem'

export default {
  name: 'Items',
  components: {
    CreateItem
  },
  firestore () {
    return {
      items: this.$db.collection('items')
    }
  },
  methods: {
    remove (e) {
      this.$firestore.items.doc(e['.key']).delete()
    }
  }
}
</script>

<style scoped>
#crear{
  background-color: #fff;
  border-radius: 50%;
  cursor: pointer;
  font-size: 3.5rem;
  position: fixed;
  bottom: 25px;
  right: 25px;
  z-index: 100000
}
a{
  text-decoration: none;
}
span.badge{
  cursor: pointer;
}
</style>
