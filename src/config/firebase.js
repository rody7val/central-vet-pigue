// ~config/firebase.js
import * as Firebase from 'firebase/app'
import 'firebase/firestore'

function initFirebase () {
  Firebase.initializeApp({
    apiKey: 'AIzaSyDY0S8hpJPuSQXG6mg1eav4xTOad3nE1Bc',
    authDomain: 'central-vet-pigue.firebaseapp.com',
    databaseURL: 'https://central-vet-pigue.firebaseio.com',
    projectId: 'central-vet-pigue',
    storageBucket: 'central-vet-pigue.appspot.com',
    messagingSenderId: '654533145385',
    appId: '1:654533145385:web:5d19e778687609ae917d38',
    measurementId: 'G-XWG7R59W7L'
  })
  return new Promise((resolve, reject) => {
    Firebase.firestore().enablePersistence()
      .then(resolve)
      .catch(err => {
        if (err.code === 'failed-precondition') {
          reject(err)
          // Multiple tabs open, persistence can only be
          // enabled in one tab at a a time.
        } else if (err.code === 'unimplemented') {
          reject(err)
          // The current browser does not support all of
          // the features required to enable persistence
        }
      })
  })
}

export { Firebase, initFirebase }