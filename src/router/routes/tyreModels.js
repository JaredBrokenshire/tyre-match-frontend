export default [
  {
    path: '/tyre-model',
    name: "tyre-model-list",
    component: () => import('@/views/tyre_models/TyreModelList.vue'),
  },
  {
    path: "/tyre-model/:id",
    name: "tyre-model-detail",
    component: () => import('@/views/tyre_models/TyreModelDetails.vue'),
  }
]