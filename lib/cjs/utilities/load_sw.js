"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    if (typeof window !== 'undefined') {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('/sw.js')
                .then(function (registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
                .catch(function (err) {
                console.log('ServiceWorker registration failed: ', err);
            });
        }
    }
};
//# sourceMappingURL=load_sw.js.map