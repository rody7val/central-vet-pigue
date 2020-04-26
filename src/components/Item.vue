<template>
  <b-row>
    <b-col md="4" sm="12">
  <b-spinner v-if="!items.length" variant="primary" label="Spinning"></b-spinner>
  <b-card v-else img-top :img-src="item.img">
    <b-spinner v-if="!item.name && !user.name" variant="primary" label="Spinning"></b-spinner>
    <div v-else>
      <b-badge class="float-right m-2"
        :variant="edit ? 'dark' : 'light'"
        @click='handleEdit'>{{edit ? 'Cancelar' : 'Editar'}}</b-badge>
      <div v-if='edit'>
        <b-form @submit.prevent="update(item)" inline>

          <b-input
            id="name"
            v-model="itemEdit.name"
            type="text"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder='Editar'
          ></b-input>

          <div v-if="load">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
          </div>

          <div v-else>
            <b-button type="submit" variant="primary">Guardar</b-button>
          </div>

        </b-form>
      </div>
      <div v-else>
        <h3 class="display-4">{{ item.name }}</h3>
      </div>
      <hr>
      <small class="box">
        <time>
          {{ $moment(item.created).calendar() }}
        </time>
      </small>
    </div>
  </b-card>
  <a class="back btn btn-link" @click="$router.go(-1)">Volver</a>
    </b-col>
  </b-row>
</template>

<script>
import User from '@/components/User'

export default {
  name: 'Istem',
  components: {
    User
  },
  firestore () {
    return {
      items: this.$db.collection('items'),
      item: this.$db.collection('items').doc(this.$route.params.key),
      itemEdit: this.$db.collection('items').doc(this.$route.params.key),
      user: this.$db.collection('users').where('uid', '==', this.$route.params.uid)
    }
  },
  methods: {
    handleEdit () {
      this.edit = !this.edit
    },
    update (e) {
      this.load = true
      this.$firestore.items.doc(e['.key']).update({name: this.itemEdit.name}).then(() => {
        this.handleEdit()
        this.load = false
      })
    }
  },
  data () {
    return {
      load: false,
      edit: false
    }
  }
}
</script>

<style scoped>
time, .time{
  text-transform: uppercase!important;
  color: #8e8e8e!important;
}
h3{
  font-size: 40px;
}
.card {
  margin-top: 45px
}
.card-body a {
  color: #212529;
  text-decoration: none;
}
.card-body .badge{
  cursor: pointer
}
.box {
  display: flex;
  align-items:center;
}
a.back{
  color: #007bff;
}
</style>
