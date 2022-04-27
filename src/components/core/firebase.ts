import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";
import 'firebase/storage';

export const firebaseConfig = {
    apiKey: 'AIzaSyCKpBhJ51OU7QaVDKkjeey-XxfCoQft2XM',
    authDomain: 'recipe-d58ba.firebaseapp.com',
    // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: 'recipe-d58ba',
    storageBucket: 'recipe-d58ba.appspot.com',
    messagingSenderId: '616607490325',
    appId: '1:616607490325:web:aaf5563126103106de091c'
};

const app = firebase.initializeApp(firebaseConfig);
// const fireStore = app.fireStore();
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;