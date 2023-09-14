// import { dom_diffing } from './../bit/index';
import dom_diffing from '../utilities/dom_diffing';
// import dom_diffing from '../utilities/dom_diffing';

export interface this_interface {
  callback?: (e: any, value: string) => void;
  id?: string;
  html: string;
  style: string;
  title: string;
  root?: Document | ShadowRoot;
  closable?: boolean;
  moveable?: boolean;
}

export default ({
  callback,
  id = 'modal' + Date.now(),
  html,
  style,
  title = '',
  root = document,
  closable = true,
  moveable = false,
}: this_interface) => {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  const move_status = (top?: string, left?: string) => {
    const modal_el: any = root.querySelector(`#${id} .modal`);
    if (!modal_el) return; // Exit if the element is not found

    // Calculate new top and left
    const newTop = top ? parseInt(top) : modal_el.offsetTop - pos2;
    const newLeft = left ? parseInt(left) : modal_el.offsetLeft - pos1;

    // Get the element dimensions
    const statusWidth = modal_el.offsetWidth;
    const statusHeight = modal_el.offsetHeight;

    // Get the viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Boundary checks
    const finalTop = Math.min(Math.max(newTop, 0), viewportHeight - statusHeight);
    const finalLeft = Math.min(Math.max(newLeft, 0), viewportWidth - statusWidth);

    // Set the element's new position
    modal_el.style.top = `${finalTop > 0 ? finalTop : 0}px`;
    modal_el.style.left = `${finalLeft > 0 ? finalLeft : 0}px`;

    modal_el.style.position = 'fixed'; // Assuming you want to keep it fixed
    modal_el.style.bottom = '';
    modal_el.style.right = '';
  };
  function element_drag(e: any) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    move_status();
  }

  function close_drag_element(e: MouseEvent) {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
  setTimeout(() => {
    const model_el = root.getElementById(id);
    moveable && model_el && ((model_el.querySelector('.modal_header') as HTMLElement)['onmousedown'] = drag_mouse_down);
    root
      .getElementById(id)
      .querySelector('.close')
      .addEventListener('click', (e) => {
        modal.remove();
      });
    root.querySelector('.modal_cover').addEventListener('click', (e) => {
      e.target['classList'].contains('modal_cover') && closable && modal.remove();
    });
  }, 0);

  function drag_mouse_down(e: any) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = close_drag_element;
    // call a function whenever the cursor moves:
    document.onmousemove = element_drag;
  }

  const modal = document.createElement('div');

  const css = /*css*/ `<style>
        #${id}{
            
        .modal_header{
            width: calc(100% - 20px);
            font-size: 14px;
            padding: 5px 10px;
        }
        .modal_title{
            width: calc(100% - 20px);
            cursor: ${moveable ? 'move' : 'default'};
        }
        .modal_close{
            width: 0;
        }
        .modal_close .close{
            position: relative;
            right: 10px;
            top: 0;
            width: 5px;
            color: var(--base_3);
            cursor: pointer;
            font-size: 14px;
            font-weight: bolder;
        }
        
        .modal_container{
            height: 0;
            width: 0;
            z-index: 9999;    
            position: fixed;
            top: 0;
            left: 0;
        }
        .modal_cover{
            position: fixed;
            top:0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: rgba(255,255,255, .5);
        }
        .modal{
            box-shadow: var(--base_box_shadow_1);
            background-color: var(--main-bg-color);
        }
      }
    </style>`;
  const modal_html = /*html*/ `
    ${css}
    <div class="modal_cover layout vertical center-center"  >
        <div class="modal layout vertical "  style="${style}">
            <div class="modal_header layout horizontal" >
                <div class="modal_title flex">
                    ${title}
                </div>
                <div class="modal_close" ${closable ? '' : 'hidden'}>
                    <div class="close">X</div>
                </div>
            </div>
            <div class="modal_content flex" style="height: 100%; width: 100%;">
                ${html}
            </div>
        </div>
    </div>
    `;
  if (callback) {
    setTimeout(() => {
      root.getElementById(id).addEventListener('change', (e) => {
        ////debugger;
        callback(e, 'url');

        console.log(e);
      });
    }, 0);
  }

  modal.id = id;
  modal.className = 'modal_container';
  dom_diffing('', modal_html, 'div', modal);
  // modal.innerHTML = modal_html;
  const body = root?.querySelector('body') ?? root;
  body.appendChild(modal);
  return () => {
    modal.remove();
  };
};
