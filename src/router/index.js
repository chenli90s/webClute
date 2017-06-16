import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import UserInfos from '@/components/UserInfos'
import UserInfo from '@/components/UserInfo/UserInfo'
import PageInfo from '@/components/UserInfo/PageInfo'
import Announce from "@/components/Announce"
 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello', 
      name: 'hello',
      component: Hello
    },
    {
      path: '/userInfos',
      name: 'userInfos',
      component: UserInfos,
      meta: { requiresAuth: true },
      children:[
        {
          path: 'userinfo',
          component: UserInfo,
          meta: { requiresAuth: true }
        },
        {
          path: 'pageinfo',
          component: PageInfo,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/announce',
      name: 'announce',
      component: Announce
    }
  ]
})
