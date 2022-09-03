"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (el, callback) => {
    el.addEventListener('touchstart', handleTouchStart, false);
    el.addEventListener('touchmove', handleTouchMove, false);
    let xDown = null;
    let yDown = null;
    function getTouches(evt) {
        return evt.touches;
    }
    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    }
    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }
        const xUp = evt.touches[0].clientX;
        const yUp = evt.touches[0].clientY;
        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;
        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            /*most significant*/
            if (xDiff > 0) {
                callback('left');
            }
            else {
                callback('right');
            }
        }
        else {
            if (yDiff > 0) {
                callback('up');
            }
            else {
                callback('down');
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    }
};
//# sourceMappingURL=touch.js.map