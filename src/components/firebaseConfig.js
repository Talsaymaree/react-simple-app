import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const config = {
  apiKey: 'AIzaSyCZUd6A8AQAXV_WHQ83TlTFgVELWsQCafA',
  authDomain: 'simple-react-app-99fa8.firebaseapp.com',
  databaseURL: 'https://simple-react-app-99fa8-default-rtdb.firebaseio.com',
  projectId: 'simple-react-app-99fa8',
  storageBucket: 'simple-react-app-99fa8.appspot.com',
  messagingSenderId: '310625271477',
  appId: '1:310625271477:web:3af03390597c10adfbc8fc',
  measurementId: 'G-3FCW474E10',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.database()

export default db
