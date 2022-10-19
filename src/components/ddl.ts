import shorten_string from '../utilities/shorten_string';

export interface ddl_interface {
  options: any[];
  callback?: (e: any, project: string) => void;
  id?: string;
  selected_value?: string;
  is_disabled?: boolean;
  shadow_root?: string;
}

export default ({
  options,
  callback,
  id = 'select' + Date.now(),
  selected_value,
  is_disabled = false,
  shadow_root,
}: ddl_interface) => {
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
  if (callback) {
    setTimeout(() => {
      root.getElementById(id).addEventListener('change', (e) => {
        ////debugger;
        callback(e, options[e.target['selectedIndex']].value);

        console.log(e);
      });
    }, 0);
  }
  return `
    ${css}
    ${
      is_disabled
        ? `<input id="${id}" disabled value='${
            selected_value && selected_value.toString().replaceAll("'", ' ').replaceAll('_', ' ')
          }' type="text"/>`
        : `<select id="${id}">
        ${
          options
            ? options
                .map((option: any) => {
                  return `
                  <option ${selected_value === option.value.toString() ? 'selected' : ''} value='${option.value
                    .toString()
                    .replaceAll("'", ' ')}'>${shorten_string(option?.name || '', 50)}</option>
                `;
                })
                .join('')
            : ''
        }
    </select>`
    }`;
};
