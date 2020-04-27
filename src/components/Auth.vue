<template>
  <div>
    <b-nav-item-dropdown right v-if='$user'>
      <template v-slot:button-content>
        <b-avatar class="mr-1"
        variant="dark"
        size="2rem"
        :src='$user.photoURL'></b-avatar>
      </template>
      <b-dropdown-item @click='signOut'>Salir</b-dropdown-item>
    </b-nav-item-dropdown>

    <b-button variant='outline-primary' v-if='!$user' @click='signIn'>
      <b-icon-people-circle></b-icon-people-circle> <small>ACCEDER</small>
    </b-button>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Auth',
  methods: {
    signIn () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(result => {
        console.log('signIn!', result)
        this.$router.replace('/items')
      }).catch(error => {
        alert(error)
      })
    },
    signOut () {
      firebase.auth().signOut().then(result => {
        console.log('signOut!', result)
        this.$router.replace('/')
      }).catch(error => {
        alert(error)
      })
    }
  }
}
</script>

<style scoped>
button, button:hover{
  background-color: #fff;
  color: #007bff;
}
.box {
  display: flex;
  align-items:center;
}
</style>
