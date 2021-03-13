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
    let preference = data
    return mercadopago.preferences.create(preference).then(data => {
      return {
        success: true,
        init_point: data.body.init_point
      }
    }).catch(error => {
      console.log(error)
      return {
        success: false,
        error: error
      }
    })
  } else {
    return {success: false}
  }
})