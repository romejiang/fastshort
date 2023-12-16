const category: AuthRoute.Route = {
  name: 'category',
  path: '/category',
  component: 'self',
  meta: {
    title: '分类管理',
    requiresAuth: true,
    singleLayout: 'basic',
    // permissions: ['super', 'admin', 'user'],
    icon: 'tabler:category',
    order: 2
  }
};

export default category;
