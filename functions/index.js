const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

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

exports.createPerson = functions.firestore.document('persons/{id}').onCreate((snap, context) => {
  return snap.ref.set({
    created: Date.now()
  }, { merge: true })
})