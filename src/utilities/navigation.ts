export default function (callback, default_page = 'home', user_check_function = undefined) {
  let last_route = '';
  const router = function (event?: any) {
    const location_split = location.pathname.split('/');
    let route = location.hash ? location.hash.replace('#', '') : location_split[1];
    route = !location.hash && route && location_split[2] ? route + '/' + location_split[2] || '' : route || '';
    const user_json = sessionStorage.getItem('user');
    user_check_function && (route = user_check_function(user_json, route));
    if (route !== last_route) {
      route = route === '' ? default_page : route;
      let page = '/' + route;
      const stateObj = { page: page };
      history.replaceState(stateObj, page, page);
      event?.preventDefault();
      last_route = route;
      const route_split = route.split('/');
      callback(route_split[0], route_split[1] || undefined);
    } else {
      location.hash = '';
    }
  };
  window.onpopstate = router;
  window.addEventListener('hashchange', router);
  router();
}
