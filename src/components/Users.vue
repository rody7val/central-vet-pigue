<template>
<b-container id="u" fluid="md">
  <b-row>
    <b-col md="8" sm="12">
    <h3>Usuarios registrados</h3>
    <b-spinner v-if="!users.length" variant="primary" label="Spinning"></b-spinner>
    <b-list-group v-else
      v-for='(user, index) in users' :key='index'>
      <b-list-group-item class="d-flex align-items-center">
        <b-avatar variant="dark" :src="user.img" class="mr-3"></b-avatar>
        <User :user="user"/>
      </b-list-group-item>
    </b-list-group>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import User from '@/components/User'

export default {
  name: 'Users',
  components: {
    User
  },
  firestore () {
    return {
      users: this.$db.collection('users')
    }
  }
}
</script>

<style scoped>
#u{
  min-height: 600px
}
p{margin: 0}
h3{
  margin-top: 30px;
}
</style>
