import shorten_string from '../utilities/shorten_string';

export interface ddl_interface {
  options: any[];
  callback?: (e: any, project: string) => void;
  id?: string;
  selected_value?: string;
}

export default ({ options, callback, id = 'select' + Date.now(), selected_value }: ddl_interface) => {
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
      document.getElementById(id).addEventListener('change', (e) => {
        ////debugger;
        callback(e, options[e.target['selectedIndex']].value);

        console.log(e);
      });
    }, 0);
  }
  return `
    ${css}
    <select id="${id}">
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
    </select>`;
};
