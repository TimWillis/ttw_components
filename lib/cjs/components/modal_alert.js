"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modal_1 = __importDefault(require("./modal"));
exports.default = ({ callback, id = 'modal' + Date.now(), title = 'Rebind Model', prompt = 'If you continue, you will need to rebind all model fields. Do you wish to continue?', button_one_text = 'Yes', button_two_text = 'No', style = 'width: 300px;', }) => {
    // const new_id = "select" + Date.now()
    // id = id ? id : new_id;
    const css = /*css*/ `<style>
        #${id}{
            
        }
        
    </style>`;
    const modal_html = /*html*/ `
        ${css}
        <div class='layout vertical' style='margin: 5px'>
            <div>
                ${prompt}
            </div>
            <div class="layout horizontal end-justified center">
                <input type='button' id="alert_modal_b_one" value='${button_one_text}'/>
                <input type='button' id="alert_modal_b_two" value='${button_two_text}'/>
            </div>
        </div>
    
    `;
    (0, modal_1.default)({
        html: modal_html,
        callback: callback,
        title: title,
        style: style,
        id: id,
    });
    setTimeout(() => {
        document.getElementById('alert_modal_b_one').addEventListener('click', (e) => {
            callback(e, 'yes');
        });
        document.getElementById('alert_modal_b_two').addEventListener('click', (e) => {
            callback(e, 'no');
        });
    }, 0);
};
//# sourceMappingURL=modal_alert.js.map