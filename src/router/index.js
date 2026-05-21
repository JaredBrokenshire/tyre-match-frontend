import VueRouter from 'vue-router'
import tyreModels from "@/router/routes/tyreModels";
import tyreImpressions from "@/router/routes/tyreImpressions";

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/Home.vue'),
    },
    ...tyreModels,
    ...tyreImpressions,
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        action: 'Read',
      },
    },
    {
      path: '*',
      redirect: {name: 'error-404'},
    }
  ]
})

router.beforeEach((to, _, next) => {
  if (router.options.routes.map(r => r.name).includes(to.name)) {
    return next()
  }

  return router.replace({name: 'error-404'})
})

export default router