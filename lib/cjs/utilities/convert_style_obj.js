"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
if (!String.prototype.replaceAll) {
    function escapeRegExp(str) {
        return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
    }
    String.prototype.replaceAll = function (find, replace) {
        return this.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    };
}
exports.default = (style_obj) => {
    Object.keys(style_obj).forEach((key) => {
        !style_obj[key] && delete style_obj[key];
    });
    return JSON.stringify(style_obj).replaceAll('"', '').replaceAll(',', ';').replaceAll('{', '').replaceAll('}', '');
};
//# sourceMappingURL=convert_style_obj.js.map