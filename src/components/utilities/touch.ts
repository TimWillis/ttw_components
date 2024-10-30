export default (el: { addEventListener: (arg0: string, arg1: { (evt: any): void; (evt: any): void; }, arg2: boolean) => void; }, callback: (arg0: string) => void) => {
  el.addEventListener('touchstart', handleTouchStart, false);
  el.addEventListener('touchmove', handleTouchMove, false);

  let xDown = null;
  let yDown = null;

  function getTouches(evt: { touches: any; }) {
    return evt.touches;
  }

  function handleTouchStart(evt: any) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt: { touches: { clientY: any, clientX: any }[]; }) {
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
      } else {
        callback('right');
      }
    } else {
      if (yDiff > 0) {
        callback('up');
      } else {
        callback('down');
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }
};
