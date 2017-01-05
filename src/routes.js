export default [{
    path: '/about/',
    component: require('./pages/about.vue')
  },
  {
    path: '/form/',
    component: require('./pages/form.vue')
  },
  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: require('./pages/dynamic-route.vue')
  },
  {
    path: '/data-binding/',
    component: require('./pages/data-binding.vue')
  },
  {
    path: '/lists/:name',
    component: require('./pages/lists.vue')
  },
  {
    path: '/edit/:id',
    component: require('./pages/edit.vue')
  },
  {
    path: '/data-binding-edit/',
    component: require('./pages/data-binding-edit.vue')
  }
]
