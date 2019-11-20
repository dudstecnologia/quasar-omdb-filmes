
const routes = [
  {
    path: '/',
    component: () => import('layouts/LayoutBase.vue'),
    children: [
      { path: '', component: () => import('pages/Inicio.vue') }
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
