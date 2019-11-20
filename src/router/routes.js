
const routes = [
  {
    path: '/',
    component: () => import('layouts/LayoutBase.vue'),
    children: [
      { path: '', component: () => import('pages/Inicio.vue') },
      { path: '/detalhes/:id', name: 'detalhes', props: true, component: () => import('pages/Detalhes.vue') }
    ]
  }
]

if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
