"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
};
//# sourceMappingURL=random_int.js.map