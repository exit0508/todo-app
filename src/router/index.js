import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from "firebase"
import Home from '../views/Home.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    //ログインフォームにリダイレクト
    path: '*',
    redirect: 'SignIn'

  },
  {
    //認証が無いとアクセスできないページ
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: "/SignIn",
    name: 'SignIn',
    component: SignIn
  },
  {
    path: "/SignUp",
    name: 'SignUp',
    component: SignUp
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if(requiresAuth) {
    //このルートはログインされているかどうか認証が必要
    //もしされていなければ，ログインページにリダイレクト
    firebase.auth().onAuthStateChanged(function (user) {
      if(user) {
        next()
      } else {
        next({
          path: '/SignIn',
          query: {redirect: to.fullPath}
        })
      }
    })
  } else {
    next()
  }
})

export default router
