<template>
	<div>
  <b-row>
    <b-col md="6">
      <h4 class="my-2">Usuarios</h4>
      <ul>
        <li v-for="user in $store.state.users.data" :key="user.email">{{user.name}}</li>
      </ul>
    </b-col>
    <b-col md="6">
      <h4 class="my-2">Mi Perfil</h4>
      <CardUser :left="false" :user="$store.state.users.data[$user.email]"/>
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
  		p: false
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
</style>
