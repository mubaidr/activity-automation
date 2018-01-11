import vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'
// Home
import index from '../views/home/index.vue'
import feedback from '../views/home/feedback.vue'
import about from '../views/home/about.vue'
import contact from '../views/home/contact.vue'
// Error
import notFound from '../views/error/notFound.vue'
// Account
import register from '../views/account/register.vue'
import login from '../views/account/login.vue'
import account from '../views/account/index.vue'
// Profile
import careers from '../views/steps/careers.vue'
import application from '../views/steps/application.vue'

vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  root: '/',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: index,
      meta: {
        isOpen: true
      }
    },
    {
      path: '/about',
      component: about,
      meta: {
        isOpen: true
      }
    },
    {
      path: '/contact',
      component: contact,
      meta: {
        isOpen: true
      }
    },
    {
      path: '/feedback',
      component: feedback,
      meta: {
        isOpen: true
      }
    },
    {
      path: '/auth/register',
      component: register,
      meta: {
        skipIfAuthorized: true,
        isOpen: true
      }
    },
    {
      path: '/auth/login',
      component: login,
      meta: {
        skipIfAuthorized: true,
        isOpen: true
      }
    },
    {
      path: '/account',
      component: account
    },
    {
      path: '/careers',
      component: careers,
      meta: {
        isOpen: true
      }
    },
    {
      path: '/application',
      component: application
    },
    {
      path: '*',
      component: notFound,
      meta: {
        isOpen: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (store.getters.isAuthenticated) {
    if (to.path === '/auth/logout') {
      store.commit('removeAuthentication')
      next({
        path: '/home'
      })
    } else if (to.matched.some(record => record.meta.skipIfAuthorized)) {
      next({
        path: '/home'
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.isOpen)) {
    next()
  } else {
    next({
      path: '/auth/login',
      query: {
        redirect: to.fullPath
      }
    })
  }
})

export default router
