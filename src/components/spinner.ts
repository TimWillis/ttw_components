const create_loader = async (el, parent, current_el, root = document, add_css = false) => {
  let div_old = root.getElementById(el);
  if (!div_old) {
    // Create a div element
    const div = document.createElement('div');

    /*svgTemplate,  make the circles 50 percent transparent */
    const svgTemplate = `
    <svg width="100%" height="100%" viewBox="0 0 100 100" style="width: 20%; height: 20%;">
    <circle cx="50" cy="50" r="45" fill="none" stroke-width="10" stroke="rgba(211, 211, 211, 0.75)"></circle>
    <circle cx="50" cy="50" r="45" fill="none" stroke-width="10" stroke="rgba(128, 128, 128, 0.75)" class="spin-circle"></circle>
    </svg>`;

    div.innerHTML = svgTemplate;

    // Set attributes for the div
    div.setAttribute('id', 'l_v_canvas_loader');
    div.classList.add('layout', 'vertical', 'center-center', 'fit', 'loading', 'fade_in');
    div.style.zIndex = (parseInt(current_el.style.zIndex) + 1).toString();
    /* make the div have a transparent grey background */
    div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    // Append the div to the parent element
    parent.appendChild(div);

    const css = await import('./css/animations');

    // Create a style element for the CSS animation
    const style = document.createElement('style');
    style.textContent = `
      ${css.default()}
      .spin-circle {
        animation: spin 1s linear infinite;
        transform-origin: 50% 50%;
        stroke-dasharray: 283;
        stroke-dashoffset: 75;
      }

      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `;

    // Append the style element to the head of the document
    root.head ? root.head.appendChild(style) : root.appendChild(style);

    // If the circle doesn't render correctly, force a redraw
    setTimeout(() => {
      const circle = div.querySelector('circle');
      circle.setAttribute('r', '45'); // Reset the radius after appending
    }, 0);

    return div;
  } else {
    return div_old;
  }
};

let last_canvas = null;
const transition_content = async (
  is_out,
  where_el = 'l_v_canvas',
  spinner_el = 'l_v_canvas_loader',
  root: any = document,
  do_add_css = false,
) => {
  const out_in = is_out ? 'out' : 'in';
  const out_in_reverse = is_out ? 'in' : 'out';
  let canvas = root.getElementById(where_el);
  if (!canvas) {
    canvas = last_canvas; //document.querySelector(last_canvas);
  }
  if (canvas) {
    // if (!last_canvas && do_add_css) {
    //   await add_css(root);
    // }
    last_canvas = canvas;

    const canvas_loader = await create_loader(spinner_el, canvas.parentElement, canvas, root, do_add_css);

    canvas.classList.remove('fade_' + out_in_reverse);
    canvas.classList.add('fade_' + out_in);

    canvas_loader.classList.remove('fade_' + out_in);
    canvas_loader.classList.add('fade_' + out_in_reverse);
  }
};

export default transition_content;
