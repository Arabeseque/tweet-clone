// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyARp0e3Ln8oJtzEiOEG-bKoSaef4j_OPW4',
  authDomain: 'qweet-79983.firebaseapp.com',
  projectId: 'qweet-79983',
  storageBucket: 'qweet-79983.appspot.com',
  messagingSenderId: '167704849661',
  appId: '1:167704849661:web:459fa2237b2ca96b556294'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
