
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainPage.vue'),
    children: [
      { path: '', component: () => import('pages/homepage.vue') },
      { path: 'register', component: () => import('pages/register.vue') },
      { path: 'login', component: () => import('pages/login.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
