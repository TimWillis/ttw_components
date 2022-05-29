/*
 * override datalist styles have to recreate the list with js - https://dev.to/siddev/customise-datalist-45p0
 */

import dom_diffing from '../utilities/dom_diffing';

interface this_interface {
  list: Array<any>;
  callback?: (e: any, create_data_list) => void;
  id?: string;
  value?: string;
  placeholder?: string;
}

export default ({
  list = [],
  value = '',
  callback,
  id = 'list_' + Date.now(),
  placeholder = 'Select Value',
}: this_interface) => {
  // const new_id = "select" + Date.now()
  // id = id ? id : new_id;
  const css = /*css*/ `<style>
        #${id}_container{
            background-color: var(--theme-prim-forcolor);
        }
    </style>`;
  const create_data_list = (list) => {
    dom_diffing(
      id + '_items',
      list
        ? list
            .map((sib) => {
              return `
    <option value="${sib}">${sib}</option>
`;
            })
            .join('')
        : '',
      'datalist',
    );
    //     document.getElementById(id + "_items").innerHTML = list
    //         ? list
    //               .map((sib) => {
    //                   return `
    //     <option value="${sib}">${sib}</option>
    // `;
    //               })
    //               .join("")
    //         : "";
  };
  setTimeout(() => {
    document.getElementById(id).addEventListener('keyup', (e) => {
      callback(e, create_data_list);
    });
    create_data_list(list);
  }, 0);
  return /*html*/ `
    ${css}
    <div class='layout vertical' id='${id}_container'> 
        <div class='list_container layout horizontal wrap'>
            <input list="${id}_items" value="${value}" placeholder="${placeholder}" id="${id}" style="width: 100%;" autocomplete="off"/>
            <datalist id="${id}_items">
            </datalist>
        </div>
    </div>
    
    `;
};
