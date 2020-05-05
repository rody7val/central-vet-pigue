<template>
  <b-container class="bg-secondary" fluid>
    <b-alert class="bg-secondary m-0" show dismissible fade>
      <h3 class="h6 m-0">{{msg}}!</h3>
    </b-alert>
   </b-container>
</template>

<script>
export default {
  name: 'Delivery',
  props: ['msg']
}
</script>
<style scoped>
.alert-right{float: right;}
.alert{
border-radius: 0px;
border: 0px solid red;
color: #fff
}
</style>
