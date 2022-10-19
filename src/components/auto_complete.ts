/*
 * override datalist styles have to recreate the list with js - https://dev.to/siddev/customise-datalist-45p0
 */

import dom_diffing from '../utilities/dom_diffing';

export interface this_interface {
  list: Array<any>;
  callback?: (e: any, create_data_list, data?: boolean) => void;
  id?: string;
  value?: string;
  placeholder?: string;
  select_only?: boolean;
}

export default ({
  list = [],
  value = '',
  callback,
  id = 'list_' + Date.now(),
  placeholder = 'Select Value',
  select_only = false,
}: this_interface) => {
  // const new_id = "select" + Date.now()
  // id = id ? id : new_id;
  // list = list.map((item) => {
  //   return { value: item.value ? item.value : item, name: item.name ? item.name : item };
  // });

  const css = /*css*/ `<style>
        #${id}_container{
            background-color: var(--theme-prim-forcolor);
        }        
        #${id}_items{
          background-color: lightgrey;
        }
        .autocomplete_item:hover{
            background-color: lightgrey;
            cursor: pointer;
        }
    </style>`;
  let current_list = list;
  const create_data_list = (list) => {
    list = list.map((item) => {
      return { name: item.name !== undefined ? item.name : item, value: item.value !== undefined ? item.value : item };
    });
    current_list = list;
    dom_diffing(
      id + '_items',
      list
        ? list
            .map((sib) => {
              return `<div data-value="${sib.value}" style='height: 1.5em;' class='autocomplete_item'>${sib.name}</div>`;
            })
            .join('')
        : '',
      'div',
    );
    const item_el = document.getElementById(id + '_items');
    item_el.addEventListener('click', (e: MouseEvent) => {
      const input_el = document.getElementById(id) as HTMLInputElement | null;
      input_el.value = (e.target as HTMLElement).dataset.value;
      callback
        ? callback(e, create_data_list, true)
        : create_data_list(list.filter((item) => item.value.includes(input_el.value)));
    });
  };
  setTimeout(() => {
    const input_el = document.getElementById(id) as HTMLInputElement | null;
    input_el.addEventListener('keyup', (e) => {
      callback
        ? callback(e, create_data_list, true)
        : create_data_list(list.filter((item) => item.value.includes(input_el.value)));
    });
    //create_data_list(list);
    input_el.addEventListener('focus', (e) => {
      callback
        ? callback(e, create_data_list, true)
        : create_data_list(list.filter((item) => item.value.includes(input_el.value)));
    });
    input_el.addEventListener('blur', (e) => {
      setTimeout(() => {
        if (select_only) {
          input_el.value = current_list.find((item) => item.value === input_el.value) ? input_el.value : '';
        }
        create_data_list([]);
      }, 300);
    });
  }, 0);
  return /*html*/ `
    ${css}
    <div class='layout vertical' id='${id}_container'> 
        <div class='list_container layout vertical'>
          <input list="${id}_items" value="${value}" placeholder="${placeholder}" id="${id}" autocomplete="off"/>
            <div   style="overflow-y: visible; height: 0;">
              <div id="${id}_items"  
                style="overflow-y: auto; max-height: 100px; height: auto; border: 1px solid lightgrey; 
                position: relative; background-color: white;">
              </div> 
            </div> 
        </div>
    </div>
    
    `;
};
