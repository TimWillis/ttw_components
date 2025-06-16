import dom_diffing from '../utilities/dom_diffing';

const css = /*css*/ `
        #toaster {
            min-width: 120px;
            text-align: center;
            position: fixed;
            right: 20px;
            bottom: 100vh; /* Initial position off-screen (top) */
            z-index: 10010;
            padding: 10px;
            border-radius: 10px;
            font-size: 14px;
            /* Separate transitions for properties */
            transition: bottom 1s ease-in-out, opacity 0.3s ease-in-out;
            display: block;
            opacity: 0; /* Start transparent, replaces .start_hidden */
        }
        #toaster.bottom {
            bottom: 20px !important; /* Target position for sliding animation */
            /* Opacity is handled by fade_in/fade_out to allow different timings if needed,
               or if bottom implies opacity 1, fade_in can ensure it */
        }
        /* These classes primarily control opacity */
        #toaster.fade_in {
            opacity: 1;
        }
        #toaster.fade_out {
            opacity: 0;
        }
        .close_x {
            position: absolute;
            top: 3px;
            right: 5px;
            border-radius: 50%;
            background-color: rgba(100, 100, 100, 0.2);
            padding: 0 3px;
            cursor: pointer;
        }`;

// Module-scoped timeout IDs
let fadeOutTimer: number | undefined;
let hideTimer: number | undefined;

const create = (el: string, parent: HTMLElement): HTMLElement => {
  let div = document.getElementById(el);
  if (!div) {
    div = document.createElement('div');
    const style = document.createElement('style');
    style.innerText = css;
    div.setAttribute('id', el);
    // Initial state (opacity: 0, off-screen) is handled by base CSS for #toaster
    parent.appendChild(style);
    parent.appendChild(div);
  }
  return div;
};

// Helper function to start the hide animation sequence
const startHideAnimation = () => {
    const msg_box = document.getElementById('toaster');
    if (!msg_box) return;

    // 1. Start fading out (opacity)
    msg_box.classList.add('fade_out');
    msg_box.classList.remove('fade_in');

    // 2. After fade out duration (0.3s), start moving it off-screen
    // Clear any existing hideTimer before setting a new one
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
        const current_msg_box = document.getElementById('toaster');
        if (current_msg_box) { // Check if element still exists and is relevant
            current_msg_box.classList.remove('bottom');
        }
        hideTimer = undefined;
    }, 300); // This 300ms should match the opacity transition duration from CSS
};

// Define the type for the second argument, which can be a number or an object
export interface ToastOptions {
  duration: number;
  type?: string; // type is optional, as it's not used yet but might be in the future
}

export default (msg: string, options?: number | ToastOptions, bg_color = '#e5c80e', color = '#1f1f1f') => {
  const msg_box = create('toaster', document.body);

  // Determine the actual fade_time based on the type of 'options'
  let fade_time: number | undefined;
  if (typeof options === 'number') {
    fade_time = options;
  } else if (options && typeof options === 'object' && 'duration' in options) {
    fade_time = options.duration;
    // We could potentially use options.type here in the future for different styles
  }

  // 1. Clear any pending hide operations from previous toasts
  if (fadeOutTimer) clearTimeout(fadeOutTimer);
  if (hideTimer) clearTimeout(hideTimer);
  fadeOutTimer = undefined;
  hideTimer = undefined;

  // 2. Update appearance and content
  msg_box.style.backgroundColor = bg_color;
  msg_box.style.color = color;

  let close_html = '';
  if (!fade_time) {
    // Use a unique ID for the closer to ensure event listener is specific
    close_html = `<div class='close_x' id='toast_closer_button'>X</div>`;
    msg_box.style.paddingRight = '20px'; // Make space for X
  } else {
    msg_box.style.paddingRight = '10px'; // Default padding
  }

  // Update content using dom_diffing. This might recreate the close button.
  dom_diffing('', msg + close_html, 'div', msg_box);

  // 3. Add event listener for the X button if it was added
  if (!fade_time) {
      const closerButton = document.getElementById('toast_closer_button');
      if (closerButton) {
          // Remove any old listener before adding a new one to prevent duplicates.
          // A more robust approach might involve storing and removing the exact listener function
          // if this component is frequently re-rendered in complex ways.
          closerButton.onclick = null;
          closerButton.onclick = () => startHideAnimation();
      }
  }

  // 4. Show the toast: Ensure it's visually ready and animate into view
  msg_box.classList.remove('fade_out'); // Crucial: if it was fading out, stop that.
  msg_box.classList.add('fade_in');    // Make it opaque (0.3s transition).
  msg_box.classList.add('bottom');     // Animate to visible position (1s transition).

  // 5. Set up auto-hide if fade_time is provided
  if (fade_time) {
    fadeOutTimer = window.setTimeout(() => {
        startHideAnimation();
        fadeOutTimer = undefined; // Clear after execution
    }, fade_time);
  }
};
