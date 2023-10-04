// import { unique_id } from 'hlinc_components';
// import unique_id from './unique_id';
export default async (string, len, is_expandable?: boolean) => {
  const unique_id_mod = await import('./unique_id');
  const unique_id = unique_id_mod.default;
  if (is_expandable) {
    const id = unique_id(5);
    console.log(id);
    !window._ttw && (window._ttw = {});
    window._ttw.click_dot_dot_dot = (e) => {
      const dot_dot_dot = e.target;
      if (dot_dot_dot) {
        dot_dot_dot.innerHTML = '';
        dot_dot_dot.parentElement.innerHTML = string;
      }
    };
    return /*html*/ `
        <div class="shorten_string" style="max-width:${len}em;">
          ${
            string.length > len
              ? string.substring(0, len) + `<span onclick='_ttw.click_dot_dot_dot(event)' id=${id}>...</span>`
              : string
          }
        </div>
      `;
  } else {
    return string.length > len ? string.substring(0, len) + '...' : string;
  }
};
