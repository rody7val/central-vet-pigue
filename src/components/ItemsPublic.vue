<template>
<b-container class="itemContainer" fluid >
  <!-- link -->
  <b-row>
    <b-col>
      <p></p>
      <a class="back" @click="$router.go(-1)">Volver</a>
    </b-col>
  </b-row>

  <!-- tags -->
  <b-row>
    <b-col md="2" lg="2"></b-col>
    <b-col md="8" lg="8">
    <b-row>
      <b-col cols="10" sm="7" md="7" lg="7">
        <b-form-group>
          <b-input-group size="sm" class="mb-2">
            <b-input-group-prepend is-text variant="primary">
              <b-icon icon="tag"></b-icon>
            </b-input-group-prepend>
                <b-form-select @input="getItems" v-model="tag" :options="tags">
                  <template v-slot:first>
                    <b-form-select-option :value="''" disabled>Que marca?</b-form-select-option>
                  </template>
                </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    </b-col><b-col md="2" lg="2"></b-col>
  </b-row>

  <!-- 3_ items -->
  <b-row>
    <b-col md="2" lg="2"></b-col>
    <b-col sm="12" md="8" lg="8" class="m-0 p-0">
      <div v-if="!tag">
        <b-alert variant="info" show>Seleccione una <b>Marca</b></b-alert>
        <br><br><br><br><br>
      </div>
      <div v-else>
        <b-spinner v-if="!items.length" variant="primary" label="Spinning"><br><br><br><br></b-spinner>
        <b-list-group v-else>
          <b-list-group-item v-for='(item, index) in items' class="m-0 p-0"
            :key='index'>
            <b-container fluid class="m-0 p-0" >
              <b-row class="m-0 p-0" >
                <b-col lg="3" md="3" sm="3" cols="4" class="m-0 p-0" >
                  <router-link class="m-0 p-0" style="display: grid;"
                    :to="{
                      name: 'itemPublic',
                      params: { key: item['.key'] }
                    }">
                    <b-img class="m-0 p-0 imgItem card-img-top" :src="item.img" fluid></b-img>
                  </router-link>
                </b-col>
                <b-col lg="9" md="9" sm="9" cols="8">
                  <router-link class="lead itemName"
                    :to="{
                      name: 'itemPublic',
                      params: { key: item['.key'] }
                    }">
                    <p class="mb-0 mt-3">{{item.name}}</p>
                  </router-link>
                  <h3>$ {{item.price}}</h3>
                  <b-badge class="mr-2" style="cursor: initial"
                    :variant="item.qty > 0 ? 'success' : 'danger'">{{ item.qty || 0 }} u</b-badge>
                </b-col>
              </b-row>
            </b-container>
          </b-list-group-item>
        </b-list-group>
      </div>
      <br>
    </b-col>
    <b-col md="2" lg="2"></b-col>
  </b-row>

</b-container>
</template>

<script>
export default {
  name: 'ItemsPublic',
  firestore () {
    return {
      tags: this.$db.collection('tags')
    }
  },
  methods: {
    getItems () {
      const prop = `tags.${this.tag}`
      this.items = []

      this.$db.collection('items').where(prop, '==', true).get().then(snap => {
        snap.forEach(doc => {
          let item = doc.data()
          item['.key'] = doc.id // add .key
          this.items = this.items.concat(item)
        })
      }).catch(error => {
        alert('Error getting documents: ', error)
      })
    }
  },
  data () {
    return {
      tags: [],
      tag: '',
      items: []
    }
  }
}
</script>

<style scoped>
.resetCategory .input-group-text{
  background-color: #007bff;
  border-color: #007bff;
  cursor: pointer;
  color: #fff;
}
.resetCategory .input-group-text:hover{
  color: #fff;
  background-color: #0069d9;
  border-color: #0062cc;
}
.m-0, .p-0{
  margin: 0!important;
  padding: 0!important;
}
.back{
  color: #007bff!important;
}
label.btn{
  color: #fff!important;
  background-color: #563d7c!important;
  border-color: #7952b3!important;
}
label.btn:focus,label.btn:active,label.btn:hover,label.btn:visited,label.btn:focus-within{
  background-color: #7952b3!important;
  border-color: #563d7c!important;
}
a, .card, .card:focus, .card:hover {
  color: #212529!important;
  text-decoration: none!important;
  cursor: pointer;
}
.card:hover{
  box-shadow: 0 0.25rem 0.25rem rgba(0,0,0,.25), inset 0 -1px 5px rgba(0,0,0,.25);
}
img{
  max-height: 150px;
  margin: 0 auto

}
.itemName{
  font-size: 1.5rem!important;
}
  .imgItem{
    margin: 0 auto!important;
  }

/*lg*/
@media (max-width: 991px) {
  .itemName{
    font-size: 1.2rem!important;
  }
    .imgItem{
    margin: 0 auto!important;
  }
}
/*md*/
@media (max-width: 776px) {
  .itemName{
    font-size: 18px!important;
  }
    .imgItem{
    margin: 0 auto!important;
  }
}
/*sm*/
/*col*/
@media (max-width: 575px) {
  .form-group{
    margin-bottom: 0px;
  }
  .itemName, .itemDesc{
    font-size: 16px!important;
  }
}
</style>
