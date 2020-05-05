const functions = require('firebase-functions')
const admin = require('firebase-admin')
const mercadopago = require('mercadopago')

admin.initializeApp(functions.config().firebase)
mercadopago.configure({
  client_id: '8942313801155865',
  client_secret: 'eiPDPiTOxXCBI0WUf9C77Geh5oSPMxla',
  access_token: 'TEST-8942313801155865-050202-af0fde1fc733a4152ca18e189d29dd9c-200036843'
})

exports.welcome = functions.auth.user().onCreate( user => {
  console.log(user)
  admin.firestore().collection('users').add({
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
  if (context.auth && data.items) {
    console.log(data.items)
    mercadopago.preferences.create(data).then(data => {
      console.log(data)
      return { success: true, init_point: data.body.init_point }
    }).catch(error => {
      console.log(error)
      return { success: false, error: error }
    })
  } else {
    return {success: false}
  }
});