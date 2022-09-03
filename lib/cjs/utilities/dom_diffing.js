"use strict";
// const morphdom = require("morphdom");
Object.defineProperty(exports, "__esModule", { value: true });
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
// import { DiffDOM } from './diff-dom/dist/index.js';
const index_js_1 = require("../../src/utilities/diff-dom/dist/index.js");
const spread_attributes = (attributes) => {
    // debugger;
    return Array.from(attributes)
        .map((attribute) => {
        return `${attribute.name}='${attribute.value}'`;
    })
        .join(' ');
};
exports.default = (id, html, tag = 'div', el = null, use_dom_diff = false) => {
    /*
     *with childrenOnly I don't need
     * , classes, styles
     */
    const current_el = el ? el : document.getElementById(id);
    if (current_el && use_dom_diff && typeof window !== 'undefined') {
        const dd = new index_js_1.DiffDOM();
        // debugger;
        // const dd = DiffDOM;
        if (current_el) {
            const diff = dd.diff(current_el, `<${tag} ${spread_attributes(current_el.attributes)}>${html}</${tag}>`);
            dd.apply(current_el, diff);
        }
    }
    else if (current_el) {
        current_el.innerHTML = html;
    }
};
//# sourceMappingURL=dom_diffing.js.map