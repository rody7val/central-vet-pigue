<template>
<b-container fluid>
  <b-row>
    <!-- create item -->
    <b-icon-plus-circle-fill id="crear" class="shadow"
      @click="modalCreate = !modalCreate"
      variant="primary"></b-icon-plus-circle-fill>
    <!-- create item modal -->
    <b-modal v-model="modalCreate" hide-footer>
      <template v-slot:modal-title>
        <h4>Producto nuevo</h4>
        <b-form-file @change="onChange"
          v-model="File"
          :state="Boolean(File)"
          placeholder="Elije o arrastra una imagen..."
          drop-placeholder="Arrastra una imagen..."
        ></b-form-file>
        <b-progress :value="uploadValue" max="100" show-progress></b-progress>
        <b-img v-if="item.img" :src="item.img" fluid thumbnail></b-img>
      </template>

      <b-form @submit.prevent="add()" >
        <!-- name -->
        <b-form-group label="Nombre" label-for="name">
          <b-input required
            id="name"
            v-model="item.name"
            type="text"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder='Nombre'
          ></b-input>
        </b-form-group>
        <!-- desc -->
        <b-form-group label="Descripción" label-for="desc">
          <b-form-textarea required
            id="desc"
            v-model="item.desc"
            placeholder="Descripcion del producto..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-form-group>
        <!-- price -->
        <b-form-group label="Precio" label-for="price">
          <b-input required
            id="price"
            v-model="item.price"
            type="number"
            step="0.01"
            placeholder='Precio'
          ></b-input>
        </b-form-group>
        <!-- qty -->
        <b-form-group label="Cantidad" label-for="qty">
          <b-input required
            id="qty"
            v-model="item.qty"
            type="number"
            step="1"
            min="0"
            placeholder='Cantidad'
          ></b-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Agregar</b-button>
      </b-form>
    </b-modal>

    <b-col md="8" sm="12">
      <h3 class="display-4">Inventario</h3>
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

export default {
  name: 'Items',
  firestore () {
    return {
      items: this.$db.collection('items')
    }
  },
  data () {
    return {
      modalCreate: false,
      uploadValue: 0,
      File: null,
      item: {
        name: '',
        img: '',
        uid: this.$user.uid
      }
    }
  },
  methods: {
    add () {
      this.$firestore.items.add(this.item).then(() => {
        this.item.name = ''
        this.item.img = ''
        this.item.uid = ''
        this.modalCreate = false
        this.uploadValue = 0
        this.File = null
      })
    },
    remove (e) {
      this.$firestore.items.doc(e['.key']).delete()
    },
    onChange (e) {
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
          this.item.img = img
        })
      })
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
h3{
  margin-top: 30px;
  font-size: 45px;
}
span.badge{
  cursor: pointer;
}
</style>
