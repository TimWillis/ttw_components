"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_diffing_1 = __importDefault(require("../utilities/dom_diffing"));
exports.default = ({ callback, id = 'modal' + Date.now(), html, style, title = '' }) => {
    // const new_id = "select" + Date.now()
    // id = id ? id : new_id;
    const modal = document.createElement('div');
    setTimeout(() => {
        document
            .getElementById(id)
            .querySelector('.close')
            .addEventListener('click', (e) => {
            modal.remove();
        });
        document.querySelector('.modal_cover').addEventListener('click', (e) => {
            e.target['classList'].contains('modal_cover') && modal.remove();
        });
    }, 0);
    const css = /*css*/ `<style>
        #${id}{
            
        }
        .modal_header{
            width: calc(100% - 20px);
            font-size: 14px;
            padding: 5px 10px;
        }
        .modal_title{
            width: calc(100% - 20px);
        }
        .modal_close{
            width: 0;
        }
        .modal_close .close{
            position: relative;
            right: 10px;
            top: 0;
            width: 5px;
            color: var(--base_3);
            cursor: pointer;
            font-size: 14px;
            font-weight: bolder;
        }
        
        .modal_container{
            height: 0;
            width: 0;
            z-index: 100;
        }
        .modal_cover{
            position: absolute;
            top:0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(255,255,255, .5);
        }
        .modal{
            box-shadow: var(--base_box_shadow_1);
            background-color: var(--main-bg-color);
        }
    </style>`;
    const modal_html = /*html*/ `
    ${css}
    <div class="modal_cover layout vertical center-center"  >
        <div class="modal layout vertical "  style="${style}">
            <div class="modal_header layout horizontal" >
                <div class="modal_title flex">
                    ${title}
                </div>
                <div class="modal_close">
                    <div class="close">X</div>
                </div>
            </div>
            <div class="modal_content flex" style="height: 100%; width: 100%;">
                ${html}
            </div>
        </div>
    </div>
    `;
    if (callback) {
        setTimeout(() => {
            document.getElementById(id).addEventListener('change', (e) => {
                ////debugger;
                callback(e, 'url');
                console.log(e);
            });
        }, 0);
    }
    modal.id = id;
    modal.className = 'modal_container';
    (0, dom_diffing_1.default)('', modal_html, 'div', modal);
    // modal.innerHTML = modal_html;
    const body = document.body;
    body.appendChild(modal);
};
//# sourceMappingURL=modal.js.map