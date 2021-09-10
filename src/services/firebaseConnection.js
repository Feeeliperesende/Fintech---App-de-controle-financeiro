import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
  apiKey: 'AIzaSyBvcuscx4VAJ7BokC_2DxCFj_g4bWWuTdQ',
  authDomain: 'fintech-7aa06.firebaseapp.com',
  projectId: 'fintech-7aa06',
  storageBucket: 'fintech-7aa06.appspot.com',
  messagingSenderId: '865219736192',
  appId: '1:865219736192:web:d5db77415cb768526fec65',
  measurementId: 'G-TYK6JGQPQB',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;
