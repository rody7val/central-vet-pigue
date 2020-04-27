
<template>
  <div>
  <b-button @click="$bvModal.show(user.uid)">{{user.name}}</b-button>
  <b-modal :id="user.uid" hide-footer>
    <template v-slot:modal-title>
      <h4>{{user.name}}</h4>
    </template>
    <b-row>
      <b-col sm="3" md="3">
        <b-avatar :src="user.img" size="6rem"></b-avatar>
      </b-col>
      <b-col sm="9" md="9">
        <p><b>{{user.email}}</b></p>
        <p>Activo? <b-badge :variant="user.active ? 'success' : 'danger'">{{user.active ? 'si' : 'no'}}</b-badge></p>
        <p>Administrador? <b-badge :variant="user.admin ? 'success' : 'danger'">{{user.admin ? 'si' : 'no'}}</b-badge></p>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <hr>
        <p>Creado {{ $moment(user.created).format('[el] ll') }}</p>
      </b-col>
    </b-row>
  </b-modal>
  </div>
</template>

<script>

export default {
  name: 'User',
  props: ['user', 'size', 'variant'],
  methods: {
    encloseSigleQuotedString (value) {
      return String(`'${value}'`)
    }
  }
}
</script>

<style scoped>
p{
  margin: 0
}
</style>
