<template>
  <div>
    <b-card
      img-topbg-variant="dark"
      :img-src="getUser('img')"
      :img-alt="getUser('email')">
      <h6><b>{{getUser('email')}}</b></h6>
      <p class="lead mb-0">{{getUser('name')}}</p>
      <!-- is admin -->
      <div v-if="getUser('admin')" class="text-left">
        <b-badge pill variant="primary">admin</b-badge>
      </div>
      <div v-else class="text-left">
        <b-badge pill variant="success">cliente</b-badge>
      </div>
      <!-- is active -->
      <div v-if="getUser('active')" class="text-left">
        <b-badge pill variant="info">activo</b-badge>
      </div>
      <div v-else class="text-left">
        <b-badge pill variant="danger">baneado</b-badge>
      </div>
      <!-- is active
      <div style="display: none" v-if="$store.state.users.data[$user.email].admin && left">
        <hr>
        <em>Acciones:</em>
        <form class="lead mb-0">
          <b-form-checkbox switch v-if="$store.state.users.data[$user.email].admin"
            @change="handleAdminChange"
            v-model="user.admin"
            name="admin"
            :value="true"
            :unchecked-value="false">
            <small>{{ user.admin ? "ser cliente" : "ser admin" }}</small>
          </b-form-checkbox>
          <b-form-checkbox switch
            @change="handleActiveChange"
            v-model="user.active"
            name="active"
            :value="true"
            :unchecked-value="false">
            <small>{{ user.active ? "bannearse" : "activarse" }}</small>
          </b-form-checkbox>
        </form>
      </div> -->
      <!-- actions 
      <template style="display: none" v-slot:footer v-if="$store.state.users.data[$user.email].admin && !left">
        <em>Acciones:</em>
        <form class="lead mb-0">
          <b-form-checkbox switch v-if="$store.state.users.data[$user.email].admin"
            @change="handleAdminChange"
            v-model="user.admin"
            name="admin"
            :value="true"
            :unchecked-value="false">
            <small>{{ user.admin ? "ser cliente" : "ser admin" }}</small>
          </b-form-checkbox>
          <b-form-checkbox switch
            @change="handleActiveChange"
            v-model="user.active"
            name="active"
            :value="true"
            :unchecked-value="false">
            <small>{{ user.active ? "bannearse" : "activarse" }}</small>
          </b-form-checkbox>
        </form>
      </template>-->

    </b-card>
  </div>

</template>

<script>

export default {
  name: 'cardUser',
  props: ["user"],
  methods: {
    getUser(type) {
      if (this.user){
        return this.user[type]
      }
      return ""
    },
    handleAdminChange(event){
      this.$store.dispatch('users/patch', {id: this.user.email, admin: event})
    },
    handleActiveChange(event){
      this.$store.dispatch('users/patch', {id: this.user.email, active: event})
    }
  }
}
</script>

<style scoped>
.card-img {
    max-height: 250px;
    -o-object-fit: cover;
    object-fit: cover;
}
.userCard {
/*  max-width: 260px;
  margin: 0 auto;*/
}
.userCardLeft{
  width: 100%;
  margin: initial
}
.userCardLeft img {
  width: 160px
}
.userCard .card-body, .userCard .card-footer{
  padding: .6rem
}
</style>
