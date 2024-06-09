import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import PageContainer from '@/components/PageContainer'
import Detail from '@/components/Detail'
import Create from '@/components/Create'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
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
