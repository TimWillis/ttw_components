// import { DiffDOM } from '/utilities/diff-dom/dist/index.js';
// import DiffDOM from './dom_differ';
import morphdom from 'morphdom';
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

// declare const browser: any;

export default (
  id,
  html,
  tag = 'div',
  el: Element | HTMLElement | null = null,
  use_dom_diff = false,
  root: Document | ShadowRoot = document,
) => {
  // let DiffDOM: any = await import('./dom_differ');
  // const diff = DiffDOM();
  // import { DiffDOM } from './diff-dom/dist/index.js';
  // import DiffDOM from "DiffDOM";
  // import DiffDOM from '../../node_modules/diff-dom/dist/index.js';
  const spread_attributes = (attributes) => {
    // debugger;
    return Array.from(attributes)
      .map((attribute: any) => {
        return `${attribute.name}='${attribute.value}'`;
      })
      .join(' ');
  };
  /*
   *with childrenOnly I don't need
   * , classes, styles
   */
  const current_el = el ? el : root.getElementById(id);
  if (current_el && use_dom_diff && typeof window !== 'undefined') {
    // const dd = new diff.DiffDOM();
    // debugger;
    // const dd = DiffDOM;
    // var el1 = document.createElement('div');
    // el1.className = 'foo';

    // var el2 = document.createElement('div');
    // el2.className = 'bar';

    // morphdom(el1, el2);
    if (current_el) {
      morphdom(current_el, `<${tag} ${spread_attributes(current_el.attributes)}>${html}</${tag}>`);
      // const diff = dd.diff(current_el, `<${tag} ${spread_attributes(current_el.attributes)}>${html}</${tag}>`);
      // dd.apply(current_el, diff);
    }
  } else if (current_el) {
    current_el.innerHTML = html;
  }
};
