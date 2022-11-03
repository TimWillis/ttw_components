"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dom_diffing_1 = __importDefault(require("../utilities/dom_diffing"));
exports.default = ({ list = [], callback, id = 'list_gen' + Date.now() }) => {
    // const new_id = "select" + Date.now()
    // id = id ? id : new_id;
    const css = /*css*/ `<style>
        #${id}{
            background-color: var(--theme-prim-forcolor);
        }
        #${id} .list_container{
            background-color: var(--theme-prim-forcolor);
        }
        #${id} .list_container .list_item{
            border-radius: 2px;
            margin: 4px;
            padding: 4px 6px;
            background-color: var(--canvas-outline-color);
        }
        
        #${id} input[type=text]{
            width: 100%;
            border: 1px solid var(--canvas-prim-forcolor);
        }
        #${id} .close{
            border-radius: 50%;
            background-color: var(--base_1);
            box-shadow: var(--base_box_shadow_1);
            color: var(--theme-prim-forcolor);
            margin: 0 0 0 8px;
            padding: 0 2px;
            cursor: pointer;
        }
    </style>`;
    const create_list_html = (list) => {
        var _a;
        return (_a = list
            .map((item) => {
            return `
                <div class='list_item layout horizontal center-center'>
                    <div>${item}</div>
                    <div class='close' data-id="${item}">X</div>
                </div>
            `;
        })) === null || _a === void 0 ? void 0 : _a.join('');
    };
    if (callback) {
        setTimeout(() => {
            document.querySelector(`#${id} input[type=button]`).addEventListener('click', (e) => {
                ////debugger;
                const value = document.querySelector(`#${id} input[type=text]`)['value'];
                if (value && !list.find((l) => l === value)) {
                    list.push(value);
                    callback(e, id, list);
                    (0, dom_diffing_1.default)('', create_list_html(list), 'div', document.getElementById(id).querySelector('.list_container'));
                    // document
                    //     .getElementById(id)
                    //     .querySelector(".list_container").innerHTML =
                    //     create_list_html(list);
                }
                else {
                    console.log('duplicate value');
                }
                console.log(e);
            });
            document.querySelector(`#${id}`).addEventListener('click', (e) => {
                ////debugger;
                if (e.target['dataset'].id) {
                    list = list.filter((item) => item !== e.target['dataset'].id);
                    callback(e, id, list);
                    (0, dom_diffing_1.default)(id, create_list_html(list));
                    (0, dom_diffing_1.default)('', create_list_html(list), 'div', document.getElementById(id).querySelector('.list_container'));
                    // document
                    //     .getElementById(id)
                    //     .querySelector(".list_container").innerHTML =
                    //     create_list_html(list);
                    console.log(e);
                }
            });
        }, 0);
    }
    return /*html*/ `
    ${css}
    <div class='layout vertical' id=${id}>
        <div class='list_container layout horizontal wrap'>
            ${create_list_html(list)}
        </div>
        <div class='layout horizontal' style="max-width: 100%; margin: 5px;">
            <input type='text'/>
            <input type='button' value='Add'/>
        </div>
    </div>
    
    `;
};
//# sourceMappingURL=list_gen.js.map