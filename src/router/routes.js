
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Dashboard.vue')
      },
      {
        path: 'dashboard',
        component: () => import('pages/Dashboard.vue')
      },
      {
        path: 'piechart',
        component: () => import('pages/ChartDonut.vue')
      },
      {
        path: 'timeline',
        component: () => import('pages/ChartTimeline.vue')
      },
      {
        path: 'map',
        component: () => import('pages/MapPage.vue')
      },
      {
        path: 'cesium',
        component: () => import('pages/CesiumPage.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
