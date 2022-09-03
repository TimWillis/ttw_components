"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const header_1 = __importDefault(require("./header/header"));
const content_1 = __importDefault(require("./content/content"));
const footer_1 = __importDefault(require("./footer/footer"));
const css = () => {
    return `
    <style>
        #page_layout{
            width: 100%;
        }
        #footer{
            min-height: 30px;
        }
        #content{
            margin-top: 70px;
        }
    </style>`;
};
const layout = (page, pages, name = '', address = '', phone = '', facebook_url = '', logo_url = '') => {
    // debugger;
    const init = () => { };
    const html = /*html*/ `${css()}
        <div id='page_layout' class="layout vertical" id=${'test'}>            
            ${(0, header_1.default)(pages.filter((page) => !page.is_hidden), name, logo_url).html}                      
            ${(0, content_1.default)(page).html}                    
            ${(0, footer_1.default)(name, address, phone, facebook_url).html}
        </div>`;
    return {
        init: init,
        html: html,
    };
};
exports.default = layout;
/******to access outside of modules *******/
if (typeof is_node === 'undefined') {
    if (typeof window.components === 'undefined') {
        window.components = {};
    }
    window.components.layout = layout;
    // navigation();
}
/*****************   End *******************/
//# sourceMappingURL=layout.js.map