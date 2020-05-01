<template>
<div>
    <!-- create item -->
    <b-icon-plus-circle-fill id="crear" class="shadow"
      @click="modalCreate = !modalCreate"
      variant="primary"></b-icon-plus-circle-fill>
    <!-- create item modal -->
    <b-modal v-model="modalCreate" hide-footer>
      <template v-slot:modal-title>
        <h4>Producto nuevo</h4>
        <b-form-file @change="onChangeImage"
          v-model="File"
          :state="Boolean(File)"
          placeholder="Elije o arrastra una imagen..."
          drop-placeholder="Arrastra una imagen..."
        ></b-form-file>
        <b-progress :value="uploadValue" max="100" show-progress></b-progress>
        <b-img v-if="item.img" :src="item.img" fluid thumbnail></b-img>
      </template>

      <b-form @submit.prevent="create" >
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
        <!-- tags -->
        <b-form-group label="Marca" label-for="Tags">
          <b-form-tags input-id="tags" v-model="item.tags" class="mb-2"></b-form-tags>
        </b-form-group>

        <b-button type="submit" variant="primary">Agregar</b-button>
      </b-form>
    </b-modal>
</div>
</template>

<script>

export default {
  name: 'CreateItem',
  data () {
    return {
      modalCreate: false,
      uploadValue: 0,
      File: null,
      item: {
        uid: this.$user.uid,
        name: '',
        img: '',
        qty: 0,
        price: 0,
        tags: []
      }
    }
  },
  methods: {
    createMap (arr) {
      let mapTags = {}
      arr.map(item => {
        mapTags[item.toLowerCase().replace(' ', '')] = true
      })
      return mapTags
    },
    create () {
      this.item.tags = this.createMap(this.item.tags) // prepare item.tags to index firestore
      this.$db.collection('items').add(this.item).then(() => {
        this.item.uid = ''
        this.item.name = ''
        this.item.img = ''
        this.item.price = 0
        this.item.qty = 0
        this.item.tags = []
        this.modalCreate = false
        this.uploadValue = 0
        this.File = null
      })
    },
    onChangeImage (e) {
      const file = e.target.files[0]
      const task = this.$firebase
        .storage()
        .ref(`img/${file.name + Date.now()}`)
        .put(file)

      task.on('state_changed', (snapshot) => {
        let value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(snapshot)
        this.uploadValue = value
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
</style>
