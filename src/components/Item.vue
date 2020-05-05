<template>
  <b-container fluid>
  <b-row>
    <b-col>
      <b-card img-top :img-src="edit ? itemEdit.img : item.img">

      <div v-if='edit' style="position: absolute; top: 0px; right: 0px;">
        <b-form-file @change="onChangeImage"
          v-model="File"
          :state="Boolean(File)"
          placeholder="Elije o arrastra una imagen..."
          drop-placeholder="Arrastra una imagen..."></b-form-file>
        <b-progress :value="uploadValue" max="100" show-progress></b-progress>
      </div>

      <b-badge style="float: right" class="mt-10"
        :variant="edit ? 'dark' : 'light'"
        @click='handleEdit'>{{edit ? 'Cancelar' : 'Editar'}}</b-badge>
      <br>

      <div v-if='edit'>
        <b-form @submit.prevent="update(item)" >
          <!-- name -->
          <b-form-group label="Nombre">
            <b-input required
              id="name"
              v-model="itemEdit.name"
              type="text"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder='Nombre'
            ></b-input>
          </b-form-group>
          <!-- desc -->
          <b-form-group label="Descripcion">
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
        <!-- category -->
        <b-form-group label="Categoria" label-for="category">
          <b-form-select id="category" @change="getTags" required v-model="itemEdit.category" :options="categories">
            <template v-slot:first>
              <b-form-select-option :value="''">Que categoria?</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <!-- tags -->
        <b-form-group label="Marca" label-for="tag">
          <b-form-select id="tag" required v-model="itemEdit.tag" :options="!categoryChange ? tags : Tags">
            <template v-slot:first>
              <b-form-select-option :value="''">{{!categoryChange ? (
                !tags.length  ? 'no hay marcas para '+itemEdit.category : 'Que marca?'
              ) : (
                !Tags.length  ? 'no hay marcas para '+itemEdit.category : 'Que marca?'
              ) }}</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>
        <!-- pay -->
        <b-form-group label="Boton de MercadoPago" label-for="pay_button">
          <b-input
            id="pay_button"
            v-model="itemEdit.pay_button"
            type="text"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder='Boton de MercadoPago'
          ></b-input>
        </b-form-group>
        <b-alert variant="info" show><b>Redirect: </b>{{'http://central-vet-pigue.web.app/checkout?key='+item['.key']+'&in_progress=true'}}</b-alert>

          <div v-if="load">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
          </div>
          <div v-else>
            <b-button type="submit" variant="primary">Guardar</b-button>
          </div>
        </b-form>
      </div>

      <div v-else>
        <h3 class="lead">{{ item.name }}</h3>
        <h2>$ {{ item.price || 0 }}</h2>
        <p>{{ item.desc }}</p>
        <p><b>Categoria:</b> {{item.category}}</p>
        <p><b>Marca:</b> {{item.tag}}</p>
        <p><b>Stock:</b> <b-badge class="mr-2" style="cursor: initial"
        :variant="item.qty > 0 ? 'primary' : 'danger'">{{ item.qty || 0 }}</b-badge></p>
      </div>
      <hr>
      <small class="box">
        <time>
          {{ $moment(item.created).calendar() }}
        </time>
      </small>
  </b-card>
<br>
    </b-col>
  </b-row>
</b-container>
</template>

<script>

export default {
  name: 'Istem',
  props: ['_key', 'tags', 'categories'],
  firestore () {
    return {
      items: this.$db.collection('items'),
      item: this.$db.collection('items').doc(this._key),
      itemEdit: this.$db.collection('items').doc(this._key)
    }
  },
  methods: {
    getTags (e) {
      this.categoryChange = true
      this.Tags = []

      this.$db.collection('tags')
        .where('cid', '==', this.get_category_key(e)).get().then(snap => {
          snap.forEach(doc => {
            let tag = doc.data()
            tag['.key'] = doc.id // add .key
            this.Tags = this.Tags.concat(tag)
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
        mapTags[item.toLowerCase().replace(' ', '')] = true
      })
      return mapTags
    },
    handleEdit () {
      this.edit = !this.edit
    },
    update (e) {
      this.load = true
      this.$firestore.items.doc(e['.key']).update({
        pay_button: this.itemEdit.pay_button || '',
        name: this.itemEdit.name,
        desc: this.itemEdit.desc,
        img: this.itemEdit.img,
        price: this.itemEdit.price,
        qty: this.itemEdit.qty,
        category: this.itemEdit.category,
        tag: this.itemEdit.tag
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
      categoryChange: false,
      Tags: [],
      uploadValue: 0,
      File: null,
      load: false,
      edit: false
    }
  }
}
</script>

<style scoped>
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
