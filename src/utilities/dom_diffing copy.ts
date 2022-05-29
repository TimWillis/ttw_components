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

import { DiffDOM } from './diff-dom';

const dd = new DiffDOM();

const spread_attributes = (attributes) => {
  // debugger;
  return Array.from(attributes)
    .map((attribute: any) => {
      return `${attribute.name}='${attribute.value}'`;
    })
    .join(' ');
};

const dom_diffing = (id, html = '', tag = 'div', el = null, use_dom_diff = false) => {
  /*
   *with childrenOnly I don't need
   * , classes, styles
   */
  const current_el = el ? el : document.getElementById(id);
  if (use_dom_diff) {
    if (current_el) {
      const diff = dd.diff(current_el, `<${tag} ${spread_attributes(current_el.attributes)}>${html}</${tag}>`);
      dd.apply(current_el, diff);
    }
  } else if (current_el) {
    current_el.innerHTML = html;
  } else {
    setTimeout(() => {
      dom_diffing(id, html, tag, el, use_dom_diff);
    }, 100);
  }
};

export default dom_diffing;
