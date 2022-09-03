"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shorten_string_1 = __importDefault(require("../utilities/shorten_string"));
exports.default = ({ options, callback, id = 'select' + Date.now(), selected_value, is_disabled = false, }) => {
    // const new_id = "select" + Date.now()
    // id = id ? id : new_id;
    const css = `<style>
        #${id}{
            
        }
        select{
            border: none;
            padding: 4px 2px;
        }
    </style>`;
    if (callback) {
        setTimeout(() => {
            document.getElementById(id).addEventListener('change', (e) => {
                ////debugger;
                callback(e, options[e.target['selectedIndex']].value);
                console.log(e);
            });
        }, 0);
    }
    return `
    ${css}
    ${is_disabled
        ? `<input id="${id}" disabled value='${selected_value && selected_value.toString().replaceAll("'", ' ').replaceAll('_', ' ')}' type="text"/>`
        : `<select id="${id}">
        ${options
            ? options
                .map((option) => {
                return `
                  <option ${selected_value === option.value.toString() ? 'selected' : ''} value='${option.value
                    .toString()
                    .replaceAll("'", ' ')}'>${(0, shorten_string_1.default)((option === null || option === void 0 ? void 0 : option.name) || '', 50)}</option>
                `;
            })
                .join('')
            : ''}
    </select>`}`;
};
//# sourceMappingURL=ddl.js.map