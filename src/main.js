import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


const options = {
  color: 'var(--color)',
  failedColor: '#ff0000',
  thickness: '2px',
  transition: {
    speed: '0.25s',
    opacity: '0.25s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}


import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA6_kpnZ8UnTVbEv6ojC6y0VcrKsYHe9Rc",
  authDomain: "vuenewloginapp.firebaseapp.com",
  projectId: "vuenewloginapp",
  storageBucket: "vuenewloginapp.appspot.com",
  messagingSenderId: "325315202924",
  appId: "1:325315202924:web:85798553a73ba693886d49"
};

firebase.initializeApp(firebaseConfig);


const app = createApp(App);

app.use(store)
app.use(router)
app.mount('#app')


