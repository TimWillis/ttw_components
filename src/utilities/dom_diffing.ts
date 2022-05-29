// const morphdom = require("morphdom");

// export default (id, html, tag = "div", el = null, use_dom_diff = false) => {
//     /*
//      *with childrenOnly I don't need
//      * , classes, styles
//      */
//     const current_el = el ? el : document.getElementById(id);
//     if (use_dom_diff) {
//         current_el &&
//             morphdom.default(
//                 current_el,
//                 `<${tag} id="${id}">${html}</${tag}>`,
//                 {
//                     childrenOnly: true,
//                 }
//             );
//     } else {
//         current_el.innerHTML = html;
//     }
// };

import { DiffDOM } from './diff-dom/dist/index.js';

const spread_attributes = (attributes) => {
  // debugger;
  return Array.from(attributes)
    .map((attribute: any) => {
      return `${attribute.name}='${attribute.value}'`;
    })
    .join(' ');
};

export default (id, html, tag = 'div', el = null, use_dom_diff = false) => {
  /*
   *with childrenOnly I don't need
   * , classes, styles
   */
  const current_el = el ? el : document.getElementById(id);
  if (use_dom_diff && typeof window !== 'undefined') {
    const dd = new DiffDOM();
    if (current_el) {
      const diff = dd.diff(current_el, `<${tag} ${spread_attributes(current_el.attributes)}>${html}</${tag}>`);
      dd.apply(current_el, diff);
    }
  } else {
    current_el.innerHTML = html;
  }
};
