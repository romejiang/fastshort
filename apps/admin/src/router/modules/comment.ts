const comment: AuthRoute.Route = {
  name: 'comment',
  path: '/comment',
  component: 'self',
  meta: {
    title: '评论管理',
    requiresAuth: true,
    singleLayout: 'basic',
    // permissions: ['super', 'admin', 'user'],
    icon: 'tabler:category',
    order: 4
  }
};

export default comment;
