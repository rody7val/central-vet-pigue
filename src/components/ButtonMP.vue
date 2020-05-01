<template>
  <form id="ButtonMP" action="/procesar-pago" method="POST"></form>
</template>

<script>
export default {
  props: ['initPoint'],
  name: 'ButtonMP',
  updated () {
    console.log(this.$mp.preferences.id)
    let mpScript = document.createElement('script')
    mpScript.setAttribute('src', 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js')
    mpScript.setAttribute('data-preference-id', this.props.initPoint)
    document.getElementById('ButtonMP').appendChild(mpScript)
  }
}
</script>

<style scoped>
</style>
