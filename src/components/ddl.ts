// import shorten_string from '../utilities/shorten_string';
import unique_id from '../utilities/unique_id';

export interface ddl_interface {
  options: any[];
  callback?: (e: any, value: string) => void;
  id?: string;
  selected_value?: string;
  is_disabled?: boolean;
  shadow_root?: string;
  name_space?: string;
  attr?: Array<string>;
  // shorten_string_length?: number;
}

export default ({
  options,
  callback,
  id = 'select' + unique_id(6),
  selected_value,
  is_disabled = false,
  shadow_root,
  name_space = '_ttw',
  attr = [],
}: // shorten_string_length,
ddl_interface) => {
  typeof window[name_space] === 'undefined' && (window[name_space] = {});
  selected_value = selected_value ? selected_value.toString() : selected_value;
  const root = shadow_root ? document.getElementById(shadow_root)?.shadowRoot : document;
  if (options.length > 0 && options[0].value === undefined) {
    options = options.map((option) => {
      return { value: option, name: option };
    });
  }
  // const shorten_string_mod = await import('../utilities/shorten_string');
  // const shorten_string = shorten_string_mod.default;

  // const new_id = "select" + Date.now()
  // id = id ? id : new_id;
  const css = `<style>
        #${id}{
            
        }
        select{
            border: none;
            padding: 4px 2px;
        }
    </style>`;

  window[name_space][id] = (e) => {
    if (callback) {
      callback(e, options[e.target['selectedIndex']].value);
    }
    console.log(e);
  };

  // if (callback) {

  //   setTimeout(() => {
  //     root.getElementById(id).addEventListener('change', (e) => {
  //       ////debugger;
  //       callback(e, options[e.target['selectedIndex']].value);

  //       console.log(e);
  //     });
  //   }, 0);
  // }

  // .replaceAll("'", ' ')}'>${
  //   shorten_string_length ? shorten_string(option?.name || '', 50) : options?.name || ''
  // }</option>
  return `
    ${css}
    ${
      is_disabled
        ? `<input id="${id}" disabled value='${
            selected_value && selected_value.toString().replaceAll("'", ' ').replaceAll('_', ' ')
          }' type="text"/>`
        : `<select ${attr.join(' ')} onchange="${name_space}.${id}(event)" id="${id}">
        ${
          options
            ? options
                .map((option: any) => {
                  return `
                  <option ${selected_value === option.value.toString() ? 'selected' : ''} value='${option.value
                    .toString()
                    .replaceAll("'", ' ')}'>${option?.name || ''}</option>
                `;
                })
                .join('')
            : ''
        }
    </select>`
    }`;
};
