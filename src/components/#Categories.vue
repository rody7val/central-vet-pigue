<template>
  <b-row>
    <b-col md="12" >
      <!-- <h4 class="my-3">CREAR</h4> -->
      <b-card class="mb-4">
        <b-button
          v-if="!create"
          @click="create=true"
          size="sm"
          variant="primary">Nueva categoría</b-button>
        <!-- create category -->
        <b-form
          v-else
          @submit.prevent="createCategory"
        >
          <!-- img -->
          <label>Imagen:</label>
          <small v-if="uploadValue">{{this.uploadValue}}</small>
          <b-img v-if="category.img" class="mb-3 img-form" :src="category.img"></b-img>
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
              v-model="category.name"
              type="text"
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
      <!-- <h4 class="my-3">CATEGORÍAS</h4> -->
      <!-- table -->
      <b-card class="table-category">
        <b-table
          :fields="fields"
          :items="Object.keys($store.state.categories.data).map(key => $store.state.categories.data[key])"
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
              variant="danger">Borrar</b-badge>
          </template>
        </b-table>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'Category',
  data () {
    return {
      create: false,
      file: "",
      uploadValue: 0,
      category: {
        name: "",
        img: ""
      },
      fields: [  // id, name, price, count, max
        {
          key: 'img',
          label: 'Imagen'
        },
        {
          key: 'name',
          label: 'Nombre',
          sortable: true
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
      if (confirm("¿BORRAR "+ this.$store.state.categories.data[id].name +"?")) {
        this.$store.dispatch("categories/delete", id)
      }
    },
    createCategory (e) {
      console.log(this.category.name)
      this.$store.dispatch('categories/set', this.category)
      this.resetForm()
    },
    resetForm () {
      this.category.name = ""
      this.category.img = ""
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
          this.category.img = img
          this.uploadValue = 0
        })
      })
    }
  }
}
</script>

<style scoped>
.table-category .card-body{
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
