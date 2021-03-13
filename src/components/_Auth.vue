<template>
  <div>
    <b-nav-item-dropdown right v-if='$user' left>
      <template v-slot:button-content>
        <b-avatar class="mr-1"
        variant="dark"
        size="2rem"
        :src='$user.photoURL'></b-avatar>
      </template>
      <b-dropdown-item
        to='/admin'>
        PANEL DE CONTROL
      </b-dropdown-item>
      <b-dropdown-item
        @click='signOut'>
        SALIR
      </b-dropdown-item>
    </b-nav-item-dropdown>

    <button v-if='!$user' @click='signIn' class="btn btn-vete pb-1">
      <b-icon-people-circle></b-icon-people-circle> <small>ACCEDER</small>
    </button>
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
</style>
