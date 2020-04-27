<template>
  <b-row>
    <b-col sm="12" md="6" lg="5">
      <b-spinner v-if="!items.length" variant="primary" label="Spinning"></b-spinner>
      <b-card v-else img-top :img-src="edit ? itemEdit.img : item.img">

      <div v-if='edit' style="position: absolute; top: 0px; right: 0px;">
        <b-form-file @change="onChangeImage"
          v-model="File"
          :state="Boolean(File)"
          placeholder="Elije o arrastra una imagen..."
          drop-placeholder="Arrastra una imagen..."></b-form-file>
        <b-progress :value="uploadValue" max="100" show-progress></b-progress>
      </div>

      <b-badge style="float: right" class="mr-2"
        :variant="edit ? 'dark' : 'light'"
        @click='handleEdit'>{{edit ? 'Cancelar' : 'Editar'}}</b-badge>
      <br>

      <div v-if='edit'>
        <b-form @submit.prevent="update(item)" >
          <!-- name -->
          <b-form-group>
            <b-input required
              id="name"
              v-model="itemEdit.name"
              type="text"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder='Nombre'
            ></b-input>
          </b-form-group>
          <!-- desc -->
          <b-form-group>
            <b-form-textarea required
              id="desc"
              v-model="itemEdit.desc"
              placeholder="Descripcion del producto..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
          <!-- price -->
          <b-form-group label="Precio" label-for="price">
            <b-input required
              id="price"
              v-model="itemEdit.price"
              type="number"
              step="0.01"
              placeholder='Precio'
            ></b-input>
          </b-form-group>
          <!-- qty -->
          <b-form-group label="Cantidad" label-for="qty">
            <b-input required
              id="qty"
              v-model="itemEdit.qty"
              type="number"
              step="1"
              min="0"
              placeholder='Cantidad'
            ></b-input>
          </b-form-group>

          <div v-if="load">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
          </div>
          <div v-else>
            <b-button type="submit" variant="primary">Guardar</b-button>
          </div>
        </b-form>
      </div>

      <div v-else>
        <h4>{{ item.name }}</h4>
        <p>{{ item.desc }}</p>
        <p class="lead">$ {{ item.price || 0 }}</p>
        <p><b-badge class="mr-2" style="cursor: initial"
        :variant="item.qty > 0 ? 'success' : 'danger'">{{ item.qty || 0 }} Unidades</b-badge></p>
      </div>
      <hr>
      <small class="box">
        <time>
          {{ $moment(item.created).calendar() }}
        </time>
      </small>
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
      this.$firestore.items.doc(e['.key']).update({
        name: this.itemEdit.name,
        desc: this.itemEdit.desc,
        img: this.itemEdit.img,
        price: this.itemEdit.price,
        qty: this.itemEdit.qty
      }).then(() => {
        this.handleEdit()
        this.load = false
      })
    },
    onChangeImage (e) {
      const file = e.target.files[0]
      const task = this.$firebase
        .storage()
        .ref(`img/${file.name + Date.now()}`)
        .put(file)

      task.on('state_changed', (snapshot) => {
        this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      }, (error) => {
        console.error(error.message)
      }, () => {
        task.snapshot.ref.getDownloadURL().then((img) => {
          console.log(img)
          this.itemEdit.img = img
        })
      })
    }
  },
  data () {
    return {
      uploadValue: 0,
      File: null,
      load: false,
      edit: false
    }
  }
}
</script>

<style scoped>
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
