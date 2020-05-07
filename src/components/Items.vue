<template>
<b-container id="p" fluid="md">
  <b-row>
    <b-col md="6" sm="12">
      <h3 class="mt-3">
        Categoria
        <b-button
          v-if="isAdmin()"
          variant="primary"
          class="pt-0"
          size="sm"
          @click="modalCategory = !modalCategory">crear</b-button>
      </h3>
      <!-- categories -->
      <b-form-select
        @change="getTags"
        v-model="selectedCategory"
        :options="categories">
        <template v-slot:first>
          <b-form-select-option :value="''">Que buscas?</b-form-select-option>
        </template>
      </b-form-select>

      <b-modal
        v-model="modalCategory"
        hide-footer>
        <template v-slot:modal-title>
          <h3 class="mt-3">Crear Categoria</h3>
        </template>
        <b-form
          @submit.prevent="addCategory">
          <!-- new category -->
          <b-form-group label="Nombre de la nueva Categoria" label-for="category">
            <b-input required
              @input="filterCategoryValue"
              id="category"
              v-model="category.text"
              type="text"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder='Nombre'
            ></b-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Agregar</b-button>
        </b-form>
      </b-modal>

    </b-col>
    <b-col md="6" sm="12" v-if="selectedCategory">

      <h3 class="mt-3">
        Marca
        <b-button
          v-if="isAdmin()"
          variant="primary"
          class="pt-0"
          size="sm"
          @click="modalTag = !modalTag">crear</b-button>
      </h3>
      <div v-if="!selectedCategory">
        <b-alert variant="info" show>Seleccione una <b>Categoria</b></b-alert>
      </div>
      <!-- tags -->
      <b-form-select
        v-else
        @change="getItems"
        v-model="selectedTag"
        :options="tags">
        <template v-slot:first>
          <b-form-select-option :value="''">{{!tags.length ? 'no hay marcas para '+selectedCategory : 'Que marca?'}}</b-form-select-option>
        </template>
      </b-form-select>

      <b-modal v-model="modalTag" hide-footer>
        <template v-slot:modal-title>
          <h3 class="mt-3">Crear Marca</h3>
        </template>
        <b-form @submit.prevent="addTag">
          <!-- new tag -->
          <b-form-group label="Nombre de la nueva Marca" label-for="tag">
            <b-input required
              @input="filterTagValue"
              id="tag"
              v-model="tag.text"
              type="text"
              class="mb-2 mr-sm-2 mb-sm-0"
              placeholder='Nombre'
            ></b-input>
          </b-form-group>
          <b-form-group label="Asociada a la Categoria" label-for="category">
            <b-form-select @input='set_cid' v-model="tag.category" :options="categories"></b-form-select>
          </b-form-group>
          <b-button type="submit" variant="primary">Agregar</b-button>
        </b-form>
      </b-modal>
    </b-col>
  </b-row>

  <b-row>
    <b-col md="12" sm="12" v-if="selectedTag">
      <!-- new item -->
      <h3 class="mt-3">
        Inventario
        <CreateItem
          v-if="isAdmin()"
          :categories="categories"/>
      </h3>
      <div v-if="!selectedTag">
        <b-alert variant="info" show>Seleccione una <b>Marca</b></b-alert>
      </div>
      <div v-else>
        <b-spinner v-if="isQuery" variant="primary" label="Spinning"></b-spinner>
        <!-- items -->
        <b-list-group v-else-if="items.length && isQuery === false">
          <b-list-group-item v-for='(item, index) in items' class="m-0 p-0"
            :key='index'>
            <b-container fluid class="m-0 p-0" >
              <b-row class="m-0 p-0" >
                <b-col lg="3" md="3" sm="3" cols="4" class="m-0 p-0" >
                  <b-img style="cursor: pointer" class="m-0 p-0 imgItem card-img-top"
                    :src="item.img" v-b-modal="item.name" fluid></b-img>
                  <b-modal :id="item.name" hide-footer>
                    <b-img :src="item.img" class="mb-2" style="max-height: initial!important" fluid></b-img>
                  </b-modal>
                </b-col>
                <b-col lg="9" md="9" sm="9" cols="8">
                  <p class="lead item_name mb-0 mt-3">{{item.name}}</p>
                  <h3 class="item_price">$ {{Number(item.price).toFixed(0)}}</h3>
                  <b-button class="item_pay_button" v-if="item.pay_button" size="sm" variant="primary" style="color: #fff!important" :href="'https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id='+item.pay_button">Pagar</b-button>
                  <img class="item_pay_img" src="@/assets/MP-payButton-logos.png">
                  <br>
                  <b-badge v-if="isAdmin()" id="btn-view" variant="dark" @click='view = !view'>ver</b-badge>
                  <b-badge variant="danger" v-if="isAdmin()" @click='remove(item)'>borrar</b-badge>
                  <b-modal v-model="view" hide-footer>
                    <ItemView :_key="item['.key']" :tags="tags" :categories="categories"/>
                  </b-modal>
                </b-col>
              </b-row>
            </b-container>
          </b-list-group-item>
        </b-list-group>
        <p v-else>Sin resultados...</p>
      </div>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import CreateItem from '@/components/CreateItem'
import ItemView from '@/components/Item'

export default {
  name: 'Items',
  components: {
    CreateItem,
    ItemView
  },
  firestore () {
    return {
      categories: this.$db.collection('categories'),
      userDb: this.$user ? this.$db.collection('users').doc(this.$user.email) : []
    }
  },
  data () {
    return {
      isQuery: false,
      view: false,
      modalCategory: false,
      modalTag: false,
      selectedCategory: '',
      selectedTag: '',
      category: {
        text: '',
        value: ''
      },
      tag: {
        text: '',
        value: '',
        category: '',
        cid: ''
      },
      tags: [],
      items: []
    }
  },
  methods: {
    isAdmin () {
      return this.userDb ? this.userDb.admin : false
    },
    isLogin () {
      return this.user
    },
    getTags (e) {
      this.selectedTag = ''
      this.items = []
      this.tags = []

      this.$db.collection('tags')
        .where('cid', '==', this.get_category_key(e))
        .get().then(snap => {
          snap.forEach(doc => {
            let tag = doc.data()
            tag['.key'] = doc.id // add .key
            this.tags = this.tags.concat(tag)
          })
          if (this.selectedTag) this.getItems()
        }).catch(error => {
          alert('Error getting documents: ', error)
        })
    },
    get_category_key (e) {
      let index = this.categories.map(obj => { return obj.value }).indexOf(e)
      return this.categories[index]['.key']
    },
    getItems () {
      this.isQuery = true
      this.items = []

      this.$db.collection('items')
        .where('category', '==', this.selectedCategory ? this.selectedCategory : '')
        .where('tag', '==', this.selectedTag ? this.selectedTag : '')
        .get().then(snap => {
          snap.forEach(doc => {
            let item = doc.data()
            item['.key'] = doc.id // add .key
            this.items = this.items.concat(item)
          })
          this.isQuery = false
        }).catch(error => {
          alert('Error getting documents: ', error)
        })
    },
    set_cid (e) {
      let index = this.categories.map(obj => { return obj.value }).indexOf(e)
      this.tag.cid = this.categories[index]['.key']
    },
    filterCategoryValue () {
      this.category.value = this.category.text.toLowerCase().split(' ').join('')
    },
    filterTagValue () {
      this.tag.value = this.tag.text.toLowerCase().split(' ').join('')
    },
    addCategory () {
      this.$db.collection('categories').add(this.category).then(() => {
        this.selectedCategory = ''
        this.selectedTag = ''
        this.category.text = ''
        this.category.value = ''
        this.tag.text = ''
        this.tag.value = ''
        this.modalCategory = !this.modalCategory
      })
    },
    addTag () {
      if (!this.tag.category) return alert('Debes asociarla a una categoria')
      this.$db.collection('tags').add(this.tag).then(() => {
        this.selectedCategory = ''
        this.selectedTag = ''
        this.category.text = ''
        this.category.value = ''
        this.tag.text = ''
        this.tag.value = ''
        this.modalTag = !this.modalTag
      })
    },
    remove (e) {
      if (confirm('Borrar ' + e.name + '?')) this.$firestore.items.doc(e['.key']).delete()
    }
  }
}
</script>

<style scoped>
#p{
  min-height: 600px
}
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
  position: absolute;
  top: 2px;
  right: 2px;
}
#btn-view{
  right: 50px
}
@media (max-width: 991px) {

}
/*md*/
@media (max-width: 776px) {

}
/*sm*/
/*col*/
  .item_pay_img{
   display: block;
  }
@media (max-width: 500px) {
  .item_name{
    margin-top: 3px!important;
    font-size: 16px!important;
  }
  .item_price, .item_pay_button, .item_pay_img{
    display: inline-block;
  }
  .item_pay_button, .item_pay_img{
    margin-top: 6px!important;
    display: inline-flex;
    float: right;
  }
}
</style>
