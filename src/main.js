// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';  
import axios from 'axios'
Vue.config.productionTip = false
Vue.use(iView)

Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

router.beforeEach((to,from,next)=>{
    if (to.matched.some(record => record.meta.requiresAuth)) {
    //console.log("拦截"+store.state.loginsuccess)
    if (!store.state.loginsuccess) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})