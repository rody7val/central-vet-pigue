<template>
  <b-row>
    <b-col md="6">
      <h4 class="my-3">Productos</h4>
      <!-- table -->
      <b-card class="table-items">
        <b-table
          :fields="fields"
          :items="Object.keys($store.state.items.data).map(key => $store.state.items.data[key])"
          :striped="false"
          :borderless="true"
          :fixed="false"
          :hover="true"
          head-variant="light">
          <!-- Nombre -->
          <template v-slot:cell(name)="data">
            <small class="lead">{{ data.value }}</small>
          </template>
          <!-- Imagen -->
          <template v-slot:cell(img)="data">
            <b-img :src="data.value" width="60px"></b-img>
          </template>
          <template v-slot:cell(id)="data">
            <b-badge style="cursor: pointer"
              @click="_delete(data.value)"
              variant="danger">delete</b-badge>
          </template>
        </b-table>
      </b-card>
    </b-col>
    <b-col md="6" class="bd-sidebar">
      <h4 class="my-3">Crear</h4>
      <b-card>
          <b-button v-if="!create"
            @click="create=true"
            size="sm"
            variant="primary">Nuevo producto</b-button>
          <!-- create item -->
          <b-form v-else @submit.prevent="createItem">
            <!-- img -->
            <label>Imagen:</label>
            <small v-if="uploadValue">{{this.uploadValue}}</small>
            <b-img v-if="item.img" class="mb-3 img-form" :src="item.img"></b-img>
            <b-img v-else src="https://www.donbalon.com/images/venue_default.png" width="100"></b-img>
            <b-form-file class="mb-3"
              @change="onChangeImage"
              v-model="file"
              :state="Boolean(file)"
              placeholder="Selecciona o arrastra un imagen aquí..."
              drop-placeholder="Sueltala aquí!"
            ></b-form-file>
            <!-- name -->
            <b-form-group id="name-label" label="Nombre:" label-for="name">
              <b-form-input
                id="name"
                v-model="item.name"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
            <!-- desc -->
            <b-form-group id="desc-label" label="Descripción:" label-for="desc">
              <b-form-input
                id="desc"
                v-model="item.desc"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
            <!-- category -->
            <b-form-group id="category-label" label="Categoría:" label-for="category">
              <b-form-select v-model="item.category" required
                :options="
	                Object.keys($store.state.categories.data).map(
	                  (key) => {
	                  	return {
	                  		value: $store.state.categories.data[key].name,
	                  		text: $store.state.categories.data[key].name
	                  	}
	                  })">
	              <template v-slot:first>
					        <b-form-select-option :value="''" disabled selected>-- Seleccionar --</b-form-select-option>
					      </template>
              </b-form-select>
            </b-form-group>
            <!-- tag -->
<!--             <b-form-group id="tag-label" label="Marca:" label-for="tag">
              <b-form-input
                id="name"
                v-model="item.name"
                type="text"
                required
              ></b-form-input>
            </b-form-group> -->
            <!-- price -->
            <b-form-group id="price-label" label="Precio:" label-for="price">
              <b-form-input
                id="price"
                v-model="item.price"
                type="number"
                required
              ></b-form-input>
            </b-form-group>
            <!-- qty -->
            <b-form-group id="qty-label" label="Cantidad:" label-for="qty">
              <b-form-input
                id="qty"
                v-model="item.qty"
                type="number"
                required
              ></b-form-input>
            </b-form-group>
            <!-- actions -->
            <b-button
              type="submit"
              size="sm"
              variant="primary">Guardar</b-button>
            <b-button
              @click="create=false"
              size="sm"
              variant="secondary">Cancelar</b-button>
          </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>

export default {
  name: 'items',
  data () {
    return {
      create: false,
      file: "",
      uploadValue: 0,
      item: {
        name: "",
        desc: "",
        category: "",
        tag: "",
        price: "",
        qty: "",
        img: "",
      },
      fields: [  // id, name, price, count, max
        {
          key: 'name',
          label: 'Nombre',
          sortable: true
        },
        {
          key: 'img',
          label: 'Imagen'
        },
        {
          key: 'id',
          label: 'Acciones'
        }
      ]
    }
  },
  methods: {
    _delete (id) {
      if (confirm("¿BORRAR "+ this.$store.state.items.data[id].name +"?")) {
        this.$store.dispatch("items/delete", id)
      }
    },
    createItem (e) {
      this.$store.dispatch('items/set', this.item)
      this.resetForm()
    },
    resetForm () {
      this.item.name = ""
      this.item.desc = ""
      this.item.category = ""
      this.item.tag = ""
      this.item.price = ""
      this.item.qty = ""
      this.item.img = ""
      this.file = ""
      this.create = false
    },
    // , uploadValue, urlImg, preview
    onChangeImage (event) {
      const file = event.target.files[0]
      const task = this.$firebase
        .storage()
        .ref(`img/${file.name + Date.now()}`)
        .put(file)
      task.on('state_changed', (snapshot) => {
        let value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(snapshot)
        this.uploadValue = `${value}%`
      }, (error) => {
        console.error(error.message)
      }, () => {
        task.snapshot.ref.getDownloadURL().then(img => {
          console.log(img)
          this.item.img = img
          this.uploadValue = 0
        })
      })
    }
  }
}
</script>

<style scoped>
.table-items .card-body{
  padding: 0px
}
.img-form{
  display: block;
  width: 100%;
}
/*.bd-sidebar{
		background-color: #f7f7f7;
    position: -webkit-sticky;
    position: sticky;
    top: 120px;
    z-index: 1000;
    height: calc(100vh - 120px);
}*/
</style>
