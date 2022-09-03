"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (array, prop) => {
    const result = [];
    const map = new Map();
    for (const item of array) {
        if (!map.has(item[prop])) {
            map.set(item[prop], true); // set any value to Map
            result.push(item);
        }
    }
    return result;
};
//# sourceMappingURL=distinct_array_by_prop.js.map