"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const unique_id_1 = __importDefault(require("./unique_id"));
exports.default = () => {
    let user = localStorage.getItem('user');
    try {
        user = user ? JSON.parse(user) : { id: (0, unique_id_1.default)(25) };
        localStorage.setItem('user', JSON.stringify(user));
    }
    catch (e) {
        user = { id: (0, unique_id_1.default)(25) };
        localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
};
//# sourceMappingURL=anonymous_user.js.map