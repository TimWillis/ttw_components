export default function (callback) {
  let last_route = '';
  const router = function (event?: any) {
    const location_split = location.pathname.split('/');
    let route = location.hash ? location.hash.replace('#', '') : location_split[2];
    route = !location.hash && route && location_split[3] ? route + '/' + location_split[3] || '' : route || '';
    const user_json = sessionStorage.getItem('user');
    route = user_json ? route : 'sign_in';
    if (route !== last_route) {
      route = route === '' ? 'scripts' : route;
      let page = '/popup/' + route;
      const stateObj = { page: page };
      history.replaceState(stateObj, page, page);
      event?.preventDefault();
      last_route = route;
      const route_split = route.split('/');
      callback(route_split[0], route_split[1] || undefined);
    }
  };
  window.onpopstate = router;
  window.addEventListener('hashchange', router);
  router();
}
