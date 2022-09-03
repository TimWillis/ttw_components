"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_loader = (el, parent) => {
    let div = document.getElementById(el);
    if (!div) {
        div = document.createElement('div');
        const img = document.createElement('img');
        div.setAttribute('id', el);
        div.classList.value = 'layout vertical center-center fade_out fit loading';
        img.src = '/Images/ellipse_1.gif';
        img.style.width = '10%';
        div.appendChild(img);
        parent.appendChild(div);
    }
    return div;
};
const transition_content = (is_out, where_el = 'l_v_canvas', spinner_el = 'l_v_canvas_loader') => {
    const out_in = is_out ? 'out' : 'in';
    const out_in_reverse = is_out ? 'in' : 'out';
    const canvas = document.getElementById(where_el);
    if (canvas) {
        const canvas_loader = create_loader(spinner_el, canvas.parentElement);
        canvas.classList.remove('fade_' + out_in_reverse);
        canvas.classList.add('fade_' + out_in);
        canvas_loader.classList.remove('fade_' + out_in);
        canvas_loader.classList.add('fade_' + out_in_reverse);
    }
};
exports.default = transition_content;
//# sourceMappingURL=spinner.js.map