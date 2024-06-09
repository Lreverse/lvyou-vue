import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Detail from '@/components/Detail'
import Register from '@components/Register'
import Create from '@/components/Create'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: 'register',
      component: 'Register'
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
})
