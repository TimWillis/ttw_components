"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addElement = (content, el, id) => {
    const newDiv = document.createElement('div');
    newDiv.innerHTML = content;
    newDiv.id = id;
    el.appendChild(newDiv);
    return newDiv;
};
exports.default = (text, el, id = '', z_index = '', offset_top = -55) => {
    let message_el;
    const close_validation = (el) => {
        el.innerHTML = '';
    };
    if (el) {
        const content = `
            <div class="field_validation"
                style="margin: 0.5em; display: block; position:absolute;
                left: ${el.getBoundingClientRect().left}px; 
                top:${el.getBoundingClientRect().top + offset_top}px;
                z-index: ${z_index};"            
                id="release_new_name_validation_message" role="alert">
                <span class="k-icon k-i-warning"> </span>
                <span id="tooltip_text">${text}</span>
                <div class="k-callout k-callout-n"></div>
            </div>`;
        const container_el = document.querySelector('#validation_message')
            ? document.querySelector('#validation_message')
            : addElement('', document.body, 'validation_message');
        message_el = addElement(content, container_el, id);
        el.parentElement.addEventListener('click', close_validation.bind(this, message_el));
        const observer = new MutationObserver(function (mutations) {
            if (!document.body.contains(el.parentElement)) {
                observer.disconnect();
                close_validation(message_el);
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
    return close_validation.bind(this, message_el);
};
//# sourceMappingURL=field_validation.js.map