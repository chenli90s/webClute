import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import UserInfos from '@/components/UserInfos'
import UserInfo from '@/components/UserInfo/UserInfo'
import PageInfo from '@/components/UserInfo/PageInfo'

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
      children:[
        {
          path: 'userinfo',
          component: UserInfo
        },
        {
          path: 'pageinfo',
          component: PageInfo
        }
      ]
    }
  ]
})
