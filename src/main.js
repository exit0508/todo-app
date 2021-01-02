import Vue from 'vue'
import firebase from 'firebase'
import App from './App.vue'
import router from './router'
import VCalendar from 'v-calendar';

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyCxn221dzyVAtDPGIBAi62k_qUD2seZxHs",
  authDomain: "todo-app-45e88.firebaseapp.com",
  databaseURL: "https://todo-app-45e88-default-rtdb.firebaseio.com",
  projectId: "todo-app-45e88",
  storageBucket: "todo-app-45e88.appspot.com",
  messagingSenderId: "53752902064",
  appId: "1:53752902064:web:cba277cd27c52b45b66675"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

Vue.use(VCalendar)

