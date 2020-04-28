<template>
<b-container class="itemContainer" fluid>
  <b-row>
    <b-col sm="2" md="2" lg="2">
      <br>
  <div>
    <b-form-group label="Marca">
      <!-- prop `add-on-change` is needed to enable adding tags vie the `change` event -->
      <b-form-tags v-model="value" size="lg" add-on-change no-outer-focus class="mb-2">
        <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
            <li v-for="tag in tags" :key="tag" class="list-inline-item">
              <b-form-tag
                @remove="removeTag(tag)"
                :title="tag"
                :disabled="disabled"
                variant="info"
              >{{ tag }}</b-form-tag>
            </li>
          </ul>
          <b-form-select
            v-bind="inputAttrs"
            v-on="inputHandlers"
            :disabled="disabled || availableOptions.length === 0"
            :options="availableOptions"
          >
            <template v-slot:first>
              <!-- This is required to prevent bugs with Safari -->
              <option disabled value="">Seleccionar...</option>
            </template>
          </b-form-select>
        </template>
      </b-form-tags>
    </b-form-group>
  </div>
    </b-col>
    <b-col sm="10" md="10" lg="10">
      <br>
      <b-form-group label="Categorías">
        <b-form-radio-group
          v-model="selected"
          :options="options"
          button-variant="primary"
          buttons
        ></b-form-radio-group>
      </b-form-group>
      <div v-if="!selected">
        <b-alert variant="info" show>Selecciona una <b>categoría</b> para ver resultados</b-alert>
        <br><br><br><br><br>
      </div>
      <div v-else>
        <b-spinner v-if="!items.length" variant="primary" label="Spinning"></b-spinner>
        <b-list-group v-else>
          <b-list-group-item v-for='(item, index) in items'
            :key='index'>
            <b-container fluid>
              <b-row>
                <b-col lg="3" md="3" sm="3" cols="5">
                  <router-link class="itemImg"
                    :to="{
                      name: 'itemPublic',
                      params: { key: item['.key'] }
                    }">
                    <b-img :src="item.img" fluid></b-img>
                  </router-link>
                </b-col>
                <b-col lg="9" md="9" sm="9" cols="7">
                  <router-link class="lead itemName"
                    :to="{
                      name: 'itemPublic',
                      params: { key: item['.key'] }
                    }">
                    {{item.name}}
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
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  name: 'ItemsPublic',
  firestore () {
    return {
      items: this.$db.collection('items')
    }
  },
  data () {
    return {
      optionsTags: ['RoyalCanin', 'Balanced', 'Excellent', 'DogChow', 'CatChow', 'ProPlan', 'OldPrince'],
      valueTags: [],
      selected: 'food',
      options: [
        { text: 'Alimento', value: 'food' },
        { text: 'Accesorios', value: 'accessory' },
        { text: 'Farmacia', value: 'drug' }
      ]
    }
  },
  computed: {
    availableOptions () {
      return this.optionsTags.filter(opt => this.valueTags.indexOf(opt) === -1)
    }
  }
}
</script>

<style scoped>
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

</style>
