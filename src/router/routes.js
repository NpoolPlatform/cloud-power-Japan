const routes = [
  {
    path: "/",
    component: () => import("layouts/MainPage.vue"),
    children: [
      { path: "", component: () => import("pages/homepage.vue") },
      { path: "home", component: () => import("pages/homepage.vue") },
      { path: "login", component: () => import("pages/login.vue") },
      { path: "order", component: () => import("pages/mining.vue") },
      { path: "wallet", component: () => import("pages/wallet.vue") },
      { path: "account", component: () => import("pages/account.vue") },
      { path: "invitation", component: () => import("pages/invitation.vue") },
      { path: "dashboard", component: () => import("pages/dashboard.vue") },
      {
        path: "forgetpassword",
        component: () => import("pages/forgetpassword/index.vue"),
        children: [
          {
            path: "email",
            component: () => import("pages/forgetpassword/email.vue"),
          },
          {
            path: "phone",
            component: () => import("pages/forgetpassword/phone.vue"),
          },
        ],
      },
      { path: "faq", component: () => import("pages/faq.vue") },
      { path: "legal", component: () => import("pages/legal.vue") },
      {
        path: "phoneregister",
        component: () => import("pages/Register/PhoneRegister.vue"),
      },
      {
        path: "emailregister",
        component: () => import("pages/Register/EmailRegister.vue"),
      },
      {
        path: "ChangePassword",
        component: () => import("pages/changepassword/index.vue"),
        children: [
          {
            path: "email",
            component: () => import("pages/changepassword/email.vue"),
          },
          {
            path: "phone",
            component: () => import("pages/changepassword/phone.vue"),
          },
        ],
      },
    ],
  },
  { path: "/warning", component: () => import("pages/warning.vue") },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
