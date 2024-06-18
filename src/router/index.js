import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import PageContainer from '@/components/PageContainer'
import Notice from '@/components/Notice'
import Detail from '@/components/Detail'
import Create from '@/components/Create'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',   // 路由模式，该模式不会在地址中显示井号#
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/explore',
      component: PageContainer,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
        },
        {
          path: '/detail/:scheduleId',
          name: 'Detail',
          component: Detail
        },
        {
          path: '/create',
          name: 'Create',
          component: Create
        }
        ,
        {
          path: '/notice',
          name: 'Notice',
          component: Notice
        },
        {
          path: '/profile/:username',
          name: 'Profile',
          component: Profile
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
    
  ]
})
