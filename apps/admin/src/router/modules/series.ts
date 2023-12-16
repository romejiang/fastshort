const series: AuthRoute.Route = {
  name: 'series',
  path: '/series',
  component: 'self',
  meta: {
    title: '短剧管理',
    requiresAuth: true,
    singleLayout: 'basic',
    // permissions: ['super', 'admin', 'user'],
    icon: 'icon-park-outline:video-two',
    order: 2
  }
};

export default series;
