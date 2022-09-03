"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    const new_date = new Date(Date.now());
    return `${new_date.getMonth() + 1}-${new_date.getDate()}-${new_date.getFullYear()}`;
};
//# sourceMappingURL=get_date.js.map