export default function (callback, logged_in_default_page = 'scripts', logged_out_default_page = 'sign_in') {
  let last_route = '';
  const router = function (event?: any) {
    const location_split = location.pathname.split('/');
    let route = location.hash ? location.hash.replace('#', '') : location_split[2];
    route = !location.hash && route && location_split[3] ? route + '/' + location_split[3] || '' : route || '';
    const user_json = sessionStorage.getItem('user');
    route = !route ? logged_out_default_page : route;
    route = user_json && (!route || route === logged_out_default_page) ? logged_in_default_page : route;
    if (route !== last_route) {
      route = route === '' ? logged_in_default_page : route;
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
