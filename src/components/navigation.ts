export default function (callback, base_route = '/popup/') {
  let last_route = sessionStorage.getItem('ttw_last_route') || '';
  const router = function (event?: any) {
    // const user_json = sessionStorage.getItem("user");
    // if (user_json) {
    //     document.getElementById("user").innerHTML = user_comp(
    //         JSON.parse(user_json)
    //     );
    //     //mount_scripts();
    // } else {
    //     mount_sign_in();
    // }

    const location_split = location.pathname.split('/');
    let route = location.hash ? location.hash.replace('#', '') : location_split[2];
    route = !location.hash && route && location_split[3] ? route + '/' + location_split[3] || '' : route || '';
    const user_json = sessionStorage.getItem('user');
    route = user_json ? route : 'sign_in';
    if (route !== last_route) {
      // page = "popup.html?route=" + page;
      route = route === '' ? 'scripts' : route;
      // let page =
      //     route === ""
      //         ? "/scripts"
      //         : route.includes("/")
      //         ? route
      //         : "/" + route;
      let page = base_route + route;
      const stateObj = { page: page };
      history.replaceState(stateObj, page, page);
      // const change_page = (current__page: any) =>{
      //     ttw.emitter.emit("page_changed", current__page, ttw.last_page);
      //     ttw.last_page = current__page
      // }
      // ttw.last_page !== page && change_page(page);
      event?.preventDefault();
      last_route = route;
      sessionStorage.setItem('ttw_last_route', route);
      const route_split = route.split('/');
      callback(route_split[0], route_split[1] || undefined);
    }
  };
  window.onpopstate = router;
  window.addEventListener('hashchange', router);
  router();
}
