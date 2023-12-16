const admin: AuthRoute.Route = {
  name: 'admin',
  path: '/admin',
  component: 'self',
  meta: {
    title: '管理员',
    requiresAuth: true,
    singleLayout: 'basic',
    // permissions: ['super', 'admin', 'user'],
    icon: 'material-symbols:account-box',
    order: 5
  }
};

export default admin;
