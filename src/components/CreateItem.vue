<template>
 <b-button v-if="isAdmin()" variant="primary" class="pt-0" size="sm" @click="modalCreate = !modalCreate">
  crear
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
        <!-- category -->
        <b-form-group label="Categoria" label-for="category">
          <b-form-select id="category" @change="getTags" required v-model="item.category" :options="categories">
            <template v-slot:first>
              <b-form-select-option :value="''">Que categoria?</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <!-- tags -->
        <b-form-group label="Marca" label-for="tag">
          <b-form-select id="tag" required v-model="item.tag" :options="tags">
            <template v-slot:first>
              <b-form-select-option :value="''">{{!tags.length ? 'no hay marcas para '+item.category : 'Que marca?'}}</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <!-- pay -->
        <b-form-group label="Boton de MercadoPago" label-for="pay_button">
          <b-input
            id="pay_button"
            v-model="item.pay_button"
            type="text"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder='Boton de MercadoPago'
          ></b-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Agregar</b-button>
      </b-form>
    </b-modal>
</b-button>
</template>

<script>

export default {
  name: 'CreateItem',
  props: ['categories'],
  firestore () {
    return {
      user: this.$db.collection('users').where('uid', '==', this.$user ? this.$user.uid : '')
    }
  },
  data () {
    return {
      modalCreate: false,
      uploadValue: 0,
      File: null,
      tags: [],
      item: {
        pay_button: '',
        uid: this.$user.uid,
        name: '',
        img: '',
        qty: 0,
        price: 0,
        category: '',
        tag: ''
      }
    }
  },
  methods: {
    isAdmin () {
      return this.user && this.user.length ? this.user[0].admin : null
    },
    getTags (e) {
      console.log(e)
      this.tags = []

      this.$db.collection('tags')
        .where('cid', '==', this.get_category_key(e)).get().then(snap => {
          snap.forEach(doc => {
            let tag = doc.data()
            tag['.key'] = doc.id // add .key
            this.tags = this.tags.concat(tag)
          })
        }).catch(error => {
          alert('Error getting documents: ', error)
        })
    },
    get_category_key (e) {
      let index = this.categories.map(obj => { return obj.value }).indexOf(e)
      return this.categories[index]['.key']
    },
    createMap (arr) {
      let mapTags = {}
      arr.map(item => {
        mapTags[item.toLowerCase().split(' ').join('')] = true
      })
      return mapTags
    },
    create () {
      this.$db.collection('items').add(this.item).then(() => {
        this.item.pay_button = ''
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
</style>
