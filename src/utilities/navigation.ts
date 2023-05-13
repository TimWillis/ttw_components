export default function (
  callback,
  logged_out_default_page = 'sign_in',
  logged_in_default_page = 'home',
  base_route = '/',
) {
  let last_route = '';
  const router = function (event?: any) {
    const location_split = location.pathname.replace(base_route, '').split('/');
    let route = location.hash ? location.hash.replace('#', '') : location_split[0];
    route = !location.hash && route && location_split[1] ? route + '/' + location_split[1] || '' : route || '';
    const user_json = sessionStorage.getItem('user');
    route = !route ? logged_out_default_page : route;
    route = user_json && (!route || route === logged_out_default_page) ? logged_in_default_page : route;
    // route = route.replace('popup/', '');

    if (route !== last_route && !route.includes('undefined')) {
      route = route === '' ? logged_in_default_page : route;
      let page = base_route + route;
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
