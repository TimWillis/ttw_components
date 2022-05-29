// import emitter from '../nn_events/nn_events';
import { TTW } from '../../types/types';
declare const ttw: TTW;
export default function () {
  const router = function (event?: any) {
    let page = location.hash ? location.hash.replace('#', '') : location.pathname.split('/')[1];
    page = page === '' ? '/home' : page.includes('/') ? page : '/' + page;
    const stateObj = { page: page };
    history.replaceState(stateObj, page, page);
    const change_page = (current__page: any) => {
      ttw.emitter.emit('page_changed', current__page, ttw.last_page);
      ttw.last_page = current__page;
    };
    ttw.last_page !== page && change_page(page);
    event?.preventDefault();
  };
  window.onpopstate = router;
  window.addEventListener('hashchange', router);
  router();
}
