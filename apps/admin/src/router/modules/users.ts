const admin: AuthRoute.Route = {
  name: 'user',
  path: '/user',
  component: 'self',
  meta: {
    title: '用户管理',
    requiresAuth: true,
    singleLayout: 'basic',
    // permissions: ['super', 'admin', 'user'],
    icon: 'material-symbols:account-box-outline',
    order: 5
  }
};

export default admin;
