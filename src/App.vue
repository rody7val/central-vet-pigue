<template>
  <div id='app'>
    <Menu/>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import Menu from '@/components/Menu'

export default {
  components: {
    Menu
  },
  name: 'App'
}
</script>

<style>
.truncate {
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.box {
  display: flex;
  align-items:center;
}
</style>
