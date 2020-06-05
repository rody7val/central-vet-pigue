const functions = require('firebase-functions')
const admin = require('firebase-admin')
const mercadopago = require('mercadopago')
const axios = require('axios')

admin.initializeApp(functions.config().firebase)
mercadopago.configure({
  client_id: "8942313801155865",
  client_secret: "eiPDPiTOxXCBI0WUf9C77Geh5oSPMxla"
})

exports.welcome = functions.auth.user().onCreate( user => {
  console.log(user)
  admin.firestore().collection('users').doc(user.email).set({
    email: user.email,
    name: user.displayName,
    img: user.photoURL,
    uid: user.uid,
    active: true,
    admin: false,
    created: Date.now()
  })
  return true
})

exports.createItem = functions.firestore.document('items/{id}').onCreate((snap, context) => {
  snap.ref.set({
    created: Date.now(),
  }, { merge: true })
})

exports.createPreference = functions.https.onCall((data, context) => {
  if (data.items) {
    let preference = { items: data.items }
    console.log(preference)
    return mercadopago.preferences.create(preference).then(data => {
      console.log(data.body)
      return { success: true, init_point: data.body.init_point }
    }).catch(error => {
      console.log(error)
      return { success: false, error: error }
    })
  } else {
    return {success: false}
  }
})

// GET /api/categories
exports.getAllCategories = functions.https.onCall((data, context) => {
  return axios.get("http://web-central-vet.herokuapp.com/api/categories").then(response => {
    console.log(response.data.categories)
    return { 
      success: response.data.success || false,
      categories: response.data.categories || []
    }
  }).catch(err => {return { success: false, err: err }})
})

// POST /api/items/search
exports.getItemsSearch = functions.https.onCall((data, context) => {
  if (data.tag || data.category || data.title) {
    let item = {
      category: "",
      title: "",
      tag: ""
    }
    if (data.category) item.category = data.category
    if (data.title) item.title = data.title
    if (data.tag) item.tag = data.tag
    console.log(item)
    return axios.post("http://web-central-vet.herokuapp.com/api/items/search", {item: item}).then(response => {
      console.log(response.data)
      return { 
        success: response.data.success || false,
        items: response.data.items || [],
        filters: response.data.filters
      }
    }).catch(err => {return { success: false, err: err }})
  } else {return { success: false }}
})