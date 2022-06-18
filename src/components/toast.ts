import  dom_diffing  from '../utilities/dom_diffing';

const css = /*css*/ `
        #toaster {
            min-width: 120px;
            text-align: center;
            position: fixed;
            right: 20px;
            bottom: 100vh;
            z-index: 10010;
            padding: 10px;
            border-radius: 10px;
            font-size: 14px;
            transition: all 1s ease-in-out;
            display:block;
        }
            #toaster.bottom {
                bottom: 20px !important;
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

const create = (el, parent) => {
  let div = document.getElementById(el);
  if (!div) {
    div = document.createElement('div');
    const style = document.createElement('style');
    style.innerText = css;
    div.setAttribute('id', el);
    div.classList.value = 'start_hidden';
    parent.appendChild(style);
    parent.appendChild(div);
  }
  return div;
};
function close_toast() {
  const msg_box = document.getElementById('#toaster');
  msg_box.classList.add('fade_out');
  msg_box.classList.remove('fade_in');
  setTimeout(() => {
    msg_box.classList.remove('bottom');
    //msgBox.html("");
  }, 300);
}
export default (msg, fade_time, bg_color = '#e5c80e', color = '#1f1f1f') => {
  //

  const msg_box = create('toaster', document.body);
  let close = '';
  if (!fade_time) {
    close = `
            <div class='close_x' onclick='close_toast()'>
                X
            </div>
        `;
    msg_box.style.paddingRight = '20px';
  }
  msg_box.style.backgroundColor = bg_color;
  msg_box.style.color = color;
  // msg_box.innerHTML = msg + close;
  dom_diffing('', msg + close, 'div', msg_box);
  msg_box.classList.remove('start_hidden');
  msg_box.classList.remove('fade_out');
  msg_box.classList.add('fade_in');
  msg_box.classList.add('bottom');
  if (fade_time) {
    setTimeout(() => {
      msg_box.classList.add('fade_out');
      msg_box.classList.remove('fade_in');
      setTimeout(() => {
        msg_box.classList.remove('bottom');
        //msgBox.html("");
      }, 300);
    }, fade_time);
  }
};
