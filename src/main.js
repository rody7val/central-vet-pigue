import Vue from 'vue'
import App from './App'
import router from './router'
import store from  './store/index.js'
import firebase from 'firebase'
import cart from '@/plugins/cart'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import moment from 'moment'
import 'moment/locale/es'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
moment.locale('es')

window.onload = () => {
  Vue.prototype.$firebase = firebase
  Vue.prototype.$moment = moment

  firebase.auth().onAuthStateChanged(user => {
    Vue.prototype.$user = user
    new Vue({
      router,
      store,
      components: { App },
      template: '<App/>'
    }).$mount('#app')
  })
}
