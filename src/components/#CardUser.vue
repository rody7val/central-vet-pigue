<template>
  <div>
    <em>Mi usuario</em>
    <b-card
      :class="left ? 'userCardLeft ' : ' userCard '"
      img-topbg-variant="dark"
      :img-left="left ? true : false"
      :img-src="user.img"
      :img-alt="user.email">
      <h5><b>{{user.email}}</b></h5>
      <p class="lead mb-0">{{user.name}}</p>
      <!-- is admin -->
      <div v-if="user.admin" class="text-left">
        <b-badge pill variant="primary">admin</b-badge>
      </div>
      <div v-else class="text-left">
        <b-badge pill variant="success">cliente</b-badge>
      </div>
      <!-- is active -->
      <div v-if="user.active" class="text-left">
        <b-badge pill variant="info">activo</b-badge>
      </div>
      <div v-else class="text-left">
        <b-badge pill variant="danger">baneado</b-badge>
      </div>
      <div v-if="$store.state.users.data[$user.email].admin && left">
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
      </div>
      <!-- actions -->
      <template v-slot:footer v-if="$store.state.users.data[$user.email].admin && !left">
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
      </template>

    </b-card>
  </div>

</template>

<script>

export default {
  name: 'cardUser',
  props: ["user", "left"],
  methods: {
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
