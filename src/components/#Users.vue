<template>
	<div>
  <div>
  	<h4 class="mb-4">Usuarios</h4>
  	<ul>
	  	<li v-for="users in $store.state.users.data">{{users.name}}</li>
  	</ul>
<!--   	<p @click="p=!p" style="cursor: pointer" v-if="$store.state.users.data[$user.email].admin">Prototipo Editar</p> -->
  </div>
  <div v-if="p">
  	<b-row>
	  	<b-col sm="12" md="12" v-if="User">
	  	  <CardUser :left="true" :user="$store.state.users.data[User.email]"/>
	    </b-col>
	  	<b-col sm="12" md="12">
		    <b-list-group>
		      <b-list-group-item 
		        class="d-flex justify-content-between align-items-center"
		        v-for="(user, index) in $store.state.users.data" v-if="$store.state.users.data[index].email != $user.email">
		        {{user.email}}
			      <b-badge v-if="user.admin && !User" pill variant="primary">admin</b-badge>
			      <b-badge v-if="!user.admin && !User" pill variant="success">cliente</b-badge>

		        <b-badge v-if="user.active && !User" pill variant="info">activo</b-badge>
		        <b-badge v-if="!user.active && !User" pill variant="danger">baneado</b-badge>

		        <b-badge v-if="!User || User.email != user.email" variant="secondary" @click="setUser({user})" style="cursor: pointer">ver</b-badge>
		        <b-badge v-if="User && User.email == user.email" variant="secondary" @click="setView" style="cursor: pointer">Guardar</b-badge>
		      </b-list-group-item>
		    </b-list-group>
	    </b-col>
    </b-row>
  </div>
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
