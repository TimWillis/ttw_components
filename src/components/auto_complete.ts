/*
 * override datalist styles have to recreate the list with js - https://dev.to/siddev/customise-datalist-45p0
 */

import dom_diffing from '../utilities/dom_diffing';

export interface this_interface {
  list: Array<any>;
  callback?: (e: any, create_data_list, is_selected?: boolean) => void;
  id?: string;
  value?: string;
  placeholder?: string;
  select_only?: boolean;
  is_disabled?: boolean;
  namespace?: string;
}

export default ({
  list = [],
  value = '',
  callback,
  id = 'list_' + Date.now(),
  placeholder = 'Select Value',
  select_only = false,
  is_disabled = false,
  namespace: name_space = '_ttw',
}: this_interface) => {
  

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
      list && list.length
        ? `<div style="overflow-y: auto;overflow-x: hidden; width: 100%; max-width: 100%;  max-height: 100px; border: 1px solid lightgrey; 
        position: relative; background-color: white; ">${list
          .map((sib) => {
            return `<div data-value="${sib.value}" style='height: fit-content; width: 100%;' class='autocomplete_item'>${sib.name}</div>`;
          })
          .join('')}</div>`
        : '',
      'div',
    );
    const item_el = document.getElementById(id + '_items');
    item_el.addEventListener('click', (e: MouseEvent) => {
      const input_el = document.getElementById(id) as HTMLInputElement | null;
      input_el.value = (e.target as HTMLElement).innerText;
      // input_el.value = (e.target as HTMLElement).dataset.value;
      callback
        ? callback(e, create_data_list, true)
        : create_data_list(list.filter((item) => item.value.includes(input_el.value)));
    });
  };
  /*if window namespace does not exist create it*/
  if (typeof window[name_space] === 'undefined') {
    window[name_space] = {};
    window[name_space][id] = { focus: null, blur: null, keyup: null };
  } else if (typeof window[name_space][id] === 'undefined') {
    window[name_space][id] = { focus: null, blur: null, keyup: null };
  }

  window[name_space][id].focus = (e) => {
    callback
      ? callback(e, create_data_list, false)
      : create_data_list(list.filter((item) => item.value.includes(e.target.value)));
  };
  window[name_space][id].blur = (e) => {
    setTimeout(() => {
      if (select_only) {
        e.target.value = current_list.find((item) => item.value === e.target.value) ? e.target.value : '';
      }
      create_data_list([]);
    }, 300);
  };
  window[name_space][id].keyup = (e) => {
    callback
      ? callback(e, create_data_list, false)
      : create_data_list(list.filter((item) => item.value.includes(e.target.value)));
  };
  // setTimeout(() => {

  // const input_el = document.getElementById(id) as HTMLInputElement | null;
  // input_el?.addEventListener('keyup', (e) => {
  //   callback
  //     ? callback(e, create_data_list, true)
  //     : create_data_list(list.filter((item) => item.value.includes(input_el.value)));
  // });
  // //create_data_list(list);
  // // input_el?.addEventListener('focus',
  // // input_el?.addEventListener('blur', (e) => {
  //   setTimeout(() => {
  //     if (select_only) {
  //       input_el.value = current_list.find((item) => item.value === input_el.value) ? input_el.value : '';
  //     }
  //     create_data_list([]);
  //   }, 300);
  // });
  // }, 0);
  return /*html*/ `
    ${css}
    <div class='layout vertical' id='${id}_container'> 
        <div class='list_container layout vertical'>
          <input type='text' ${
            is_disabled ? 'disabled' : ''
          } value="${value}" placeholder="${placeholder}" id="${id}" autocomplete="off" onblur='${name_space}.${id}.blur(event)' onfocus='${name_space}.${id}.focus(event)' 
          onkeyup='${name_space}.${id}.keyup(event)' />
            <div   style="overflow: visible; height: 0;">
              <div id="${id}_items"  >
              </div> 
            </div> 
        </div>
    </div>
    
    `;
};
