<template>
	<div>
  <b-row>
    <b-col md="12">
      <!-- table -->
      <b-card class="table-users">
        <b-table
          :fields="fields"
          :items="Object.keys($store.state.users.data).map(key => $store.state.users.data[key])"
          :striped="false"
          :borderless="true"
          :fixed="false"
          :hover="true"
          head-variant="light">
          <!-- Nombre -->
          <template v-slot:cell(name)="data">
            <small class="lead">{{ data.value }}</small>
          </template>
          <!-- Email -->
          <template v-slot:cell(email)="data">
            <b class="">{{ data.value }}</b>
          </template>
          <!-- Imagen -->
          <template v-slot:cell(img)="data">
            <b-img :src="data.value" width="60px"></b-img>
          </template>
        </b-table>
      </b-card>
    </b-col>
  </b-row>
  </div>
</template>

<script>
import CardUser from "./#CardUser"
export default {
  name: "usersAdmin",
  components: {CardUser},
  data () {
  	return {
  		User: null,
  		p: false,
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
          key: 'email',
          label: 'Email',
          sortable: true
        }
      ]
  	}
  },
  methods: {
  	setUser (data) {
  		console.log(data)
  		this.User = data.user
  	},
  	setView () {
  		this.User = null
  	}
  }
}
</script>

<style scoped>
.table-users .card-body{
  padding: 0px
}
</style>
