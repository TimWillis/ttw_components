"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        }
        else {
            collection.push(item);
        }
    });
    return map;
};
//# sourceMappingURL=group_by.js.map