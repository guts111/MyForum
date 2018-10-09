import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import post from '@/components/post/post'
import user from '@/components/user/user'
import postNew from '@/components/post/post-new'
import settings from '@/components/common/settings.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    }, {
      path: '/post/:id',
      name: 'posts',
      component: post
    }, {
      path: '/user/:id',
      name: 'users',
      component: user
    }, {
      path: '/post',
      name: 'post',
      component: postNew
    }, {
      path: '/settings',
      name: 'settings',
      component: settings
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition)
        }
        resolve({ x: 0, y: 0 })
      }, 350)
    })
  }
})

