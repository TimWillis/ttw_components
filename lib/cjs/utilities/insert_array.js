"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (arr, index, ...newItems) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted items
    ...newItems,
    // part of the array after the specified index
    ...arr.slice(index),
];
//# sourceMappingURL=insert_array.js.map