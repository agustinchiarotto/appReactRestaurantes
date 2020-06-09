import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDcZ5FiCMJsMunk8hdgGZgg-zdO90F3O7A",
    authDomain: "tenedores-1d063.firebaseapp.com",
    databaseURL: "https://tenedores-1d063.firebaseio.com",
    projectId: "tenedores-1d063",
    storageBucket: "tenedores-1d063.appspot.com",
    messagingSenderId: "285588507544",
    appId: "1:285588507544:web:6c25f31b731b7ad2eaf9ed"
}


export const firebaseApp = firebase.initializeApp(firebaseConfig);