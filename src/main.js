import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import VueFirestore from 'vue-firestore'
import mercadopago from 'mercadopago'

import moment from 'moment'
import 'moment/locale/es'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

require('firebase/firestore')
moment.locale('es')
mercadopago.configure({ access_token: 'APP_USR-8942313801155865-042522-556e41b792303f3405807197b8599b1e-200036843' })

Vue.config.productionTip = false
Vue.use(VueFirestore)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

const db = firebase.initializeApp({
  apiKey: 'AIzaSyDY0S8hpJPuSQXG6mg1eav4xTOad3nE1Bc',
  authDomain: 'central-vet-pigue.firebaseapp.com',
  databaseURL: 'https://central-vet-pigue.firebaseio.com',
  projectId: 'central-vet-pigue',
  storageBucket: 'central-vet-pigue.appspot.com',
  messagingSenderId: '654533145385',
  appId: '1:654533145385:web:5d19e778687609ae917d38',
  measurementId: 'G-XWG7R59W7L'
}).firestore()

Vue.use(db)

Vue.prototype.$firebase = firebase
Vue.prototype.$db = db
Vue.prototype.$moment = moment
Vue.prototype.$mp = mercadopago

window.onload = () => {
  firebase.auth().onAuthStateChanged((user) => {
    Vue.prototype.$user = user
    new Vue({
      router,
      components: { App },
      template: '<App/>'
    }).$mount('#app')
  })
}
