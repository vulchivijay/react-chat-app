import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU-cTjyTtDQ8Hs-Yq2cCTX5bRvpCiziCY",
  authDomain: "react-chat-app-17cd2.firebaseapp.com",
  projectId: "react-chat-app-17cd2",
  storageBucket: "react-chat-app-17cd2.appspot.com",
  messagingSenderId: "775879137021",
  appId: "1:775879137021:web:878f7580fac1cc5290d094"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;