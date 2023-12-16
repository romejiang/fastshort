const admin: AuthRoute.Route = {
  name: 'episode',
  path: '/episode',
  component: 'self',
  
  meta: {
    title: '分集管理',
    requiresAuth: true,
    singleLayout: 'basic',
    // dynamicPath: '/episode/:id',
    // permissions: ['super', 'admin', 'user'],
    icon: 'material-symbols:video-library-rounded',
    // hide: true,
    order: 3
  }
};

export default admin;
