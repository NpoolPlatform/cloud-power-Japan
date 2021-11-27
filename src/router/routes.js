
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainPage.vue'),
    children: [
      { path: '', component: () => import('pages/homepage.vue') },
      { path: 'register', component: () => import('pages/register.vue') },
      { path: 'login', component: () => import('pages/login.vue') },
      { path: 'mining', component: () => import('pages/mining.vue') },
      { path: 'wallet', component: () => import('pages/wallet.vue') },
      { path: 'account', component: () => import('pages/account.vue') },
      { path: 'firstsetpassword', component: () => import('pages/firstsetpassword.vue') },
      { path: 'forgetpassword', component: () => import('pages/forgetpassword.vue') },
      { path: 'faq', component: () => import('pages/faq.vue') },
      { path: 'legal', component: () => import('pages/legal.vue') },
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
