import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import(/* webpackChunkName: "favorite" */ '../views/Favorite'),
    meta: {
      title: 'Избранное'
    }
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: 'Главная'
    }
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "e404" */ '../views/technical/E404'),
    meta: {
      title: '404'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - OMDb фильмы`
  next()
})

export default router
