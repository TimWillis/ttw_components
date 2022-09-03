"use strict";
/*
 * override datalist styles have to recreate the list with js - https://dev.to/siddev/customise-datalist-45p0
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_diffing_1 = __importDefault(require("../utilities/dom_diffing"));
exports.default = ({ list = [], value = '', callback, id = 'list_' + Date.now(), placeholder = 'Select Value', }) => {
    // const new_id = "select" + Date.now()
    // id = id ? id : new_id;
    // list = list.map((item) => {
    //   return { value: item.value ? item.value : item, name: item.name ? item.name : item };
    // });
    list = list.map((item) => {
        return item.name ? item.name : item;
    });
    const css = /*css*/ `<style>
        #${id}_container{
            background-color: var(--theme-prim-forcolor);
        }
    </style>`;
    const create_data_list = (list) => {
        (0, dom_diffing_1.default)(id + '_items', list
            ? list
                .map((sib) => {
                return `
    <option value="${sib}">${sib}</option>
`;
            })
                .join('')
            : '', 'datalist');
        //     document.getElementById(id + "_items").innerHTML = list
        //         ? list
        //               .map((sib) => {
        //                   return `
        //     <option value="${sib}">${sib}</option>
        // `;
        //               })
        //               .join("")
        //         : "";
    };
    setTimeout(() => {
        document.getElementById(id).addEventListener('keyup', (e) => {
            callback(e, create_data_list);
        });
        create_data_list(list);
    }, 0);
    return /*html*/ `
    ${css}
    <div class='layout vertical' id='${id}_container'> 
        <div class='list_container layout horizontal wrap'>
            <input list="${id}_items" value="${value}" placeholder="${placeholder}" id="${id}" style="width: 100%;" autocomplete="off"/>
            <datalist id="${id}_items">
            </datalist>
        </div>
    </div>
    
    `;
};
//# sourceMappingURL=auto_complete.js.map