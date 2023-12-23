export interface ddl_interface {
  options: any[];
  callback?: (e: any, value: string) => void;
  id?: string;
  selected_value?: string;
  is_disabled?: boolean;
  shadow_root?: string;
  name_space?: string;
  place_holder?: string;
  // shorten_string_length?: number;
}

export default ({
  options,
  callback,
  id = '',
  selected_value,
  is_disabled = false,
  shadow_root,
  name_space = '_ttw',
  place_holder = 'Select',
}: // shorten_string_length,
ddl_interface) => {
  id = id === '' ? 'select_' + Date.now() : id;
  typeof window[name_space] === 'undefined' && (window[name_space] = {});
  selected_value = selected_value ? selected_value.toString() : selected_value;
  const root = shadow_root ? document.getElementById(shadow_root)?.shadowRoot : document;
  if (options.length > 0 && options[0].value === undefined) {
    options = options.map((option) => {
      return { value: option, name: option };
    });
  }
  const css = `<style>
        #${id}{
            
        }
        .input_like{
          width: 100%;
          height: 40px;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 4px;
          box-sizing: border-box;
        }
        #options_${id}{
          transition: all 0.3s ease;
          transform-origin: top;
          position: absolute;
          z-index: 10;
        }
        
        #options_${id} > div{
          transition: all 0.3s ease;
          background-color: #fff;
          border: 1px solid #ccc;
        }
        #options_${id} .option{
          width: 100%;
          height: 40px;
          padding: 4px;
          box-sizing: border-box;
          cursor: pointer;
        }
        #options_${id} .option:nth-child(even) {
            background-color: var(--main-bg-color);
        }
        #options_${id} .option:hover, #options_${id} .option:nth-child(even):hover{
          background-color: #ccc;
        }
        .hat{
          top: -6px;
          position: relative;
          font-size: 1.5em;
          font-family: cursive;
          transform: rotate(180deg);
          transition: all 0.3s ease;
        }
        
        .hat.rotate{
          top: 6px;
          transform: rotate(0deg);
        }
    </style>`;

  const open_close = (close_it, options, opener) => {
    setTimeout(() => {
      opener.querySelector('.hat').classList.contains('rotate')
        ? opener.querySelector('.hat').classList.remove('rotate')
        : close_it
        ? opener.querySelector('.hat').classList.remove('rotate')
        : opener.querySelector('.hat').classList.add('rotate');
      options.style.transform =
        options.style.transform === 'scaleY(1)' ? 'scaleY(0)' : close_it ? 'scaleY(0)' : 'scaleY(1)';
    }, 0);
    // options.style.display = options.style.display === 'block' ? 'none' : 'block';
  };

  window[name_space][id] = (e: any) => {
    const value = root.getElementById('value_' + id);
    value.innerHTML = e.currentTarget.innerText; //e.target.dataset.value || e.target.parentElement.dataset.value;
    if (callback) {
      callback(e, e.currentTarget.dataset.value);
    }
    // open_close();
  };
  window[name_space]['_open' + id] = (e: any, close_it) => {
    const options = root.getElementById('options_' + id);
    const opener = root.getElementById('opener_' + id);
    const rect = opener.getBoundingClientRect();
    options.style.top = rect.top + rect.height + window.scrollY + 'px';
    options.style.left = rect.left + 'px';
    options.style.width = rect.width + 'px';
    // options.style.height = options.children[0] + 'px';
    // const options = root.getElementById('options_' + id);
    // const opener = root.getElementById('opener_' + id);
    open_close(close_it, options, opener);
  };

  return `
    ${css}
    ${`<div tabindex="0" class='input_like layout horizontal center start-justified' id="opener_${id}" onclick="${name_space}._open${id}(event)" onblur="${name_space}._open${id}(event, true)"  ${
      is_disabled ? 'disabled' : ''
    }>
      <div id="value_${id}">
        ${(selected_value && selected_value.toString().replaceAll("'", ' ').replaceAll('_', ' ')) || place_holder}
      </div>
      <div class='flex'></div>
      <div class='hat'>^</div>
    </div>
         <div  id="options_${id}" style='transform: scaleY(0);'>
          <div>
            ${
              options
                ? options
                    .map((option: any) => {
                      return `
                      <div onmousedown="${name_space}.${id}(event)" class='option layout vertical start center-justified ${
                        selected_value === option.value.toString() ? 'selected' : ''
                      }' data-value='${option.value.toString().replaceAll("'", ' ')}'><div>${
                        option?.name || ''
                      }</div></div>
                    `;
                    })
                    .join('')
                : ''
            }
        </div>
    </div>`}`;
};
