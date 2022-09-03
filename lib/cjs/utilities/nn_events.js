"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    events: {},
    emit(event, ...args) {
        for (let i of this.events[event] || []) {
            i(...args);
        }
    },
    on(event, cb) {
        (this.events[event] = this.events[event] || []).push(cb);
        return () => (this.events[event] = this.events[event].filter((i) => i !== cb));
    },
};
//# sourceMappingURL=nn_events.js.map