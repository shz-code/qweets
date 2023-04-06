const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        name: "Home",
      },
      {
        path: "/about",
        component: () => import("src/pages/PageAbout.vue"),
        name: "About",
      },
      {
        path: "/register",
        component: () => import("src/pages/UserAuth.vue"),
        name: "Register",
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
