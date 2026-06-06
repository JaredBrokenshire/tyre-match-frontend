export default [
  {
    path: '/tyre-impression',
    name: "tyre-impression-list",
    component: () => import('@/views/tyre_impressions/TyreImpressionList.vue'),
  },
  {
    path: "/tyre-impression/:id",
    name: "tyre-impression-detail",
    component: () => import("@/views/tyre_impressions/TyreImpressionDetails.vue")
  }
]