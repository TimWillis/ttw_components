import input_with_label from './input_with_label';
import dom_diffing from '../utilities/dom_diffing';
import unique_id from '../utilities/unique_id';
import create_list from './create_list';
import ddl from './ddl';

export interface this_interface {
  list?: Array<any>;
  type?: 'table' | 'bubble' | 'comma' | 'dash';
  grow_wider?: boolean;
  position?: 'top' | 'bottom' | 'left' | 'right';
  // width?: string;
  input_type?: 'text' | 'ddl';
  input_list?: Array<any>;
  title?: string;
  label: string;
  callback: (e: any, id: string, list: any) => void;
  id?: string;
  shadow_root?: string;
}
export default ({
  list = [],
  grow_wider = false,
  callback,
  position = 'top',
  // width = "150px",
  type = 'bubble',
  input_type = 'text',
  input_list = [],
  label,
  title,
  shadow_root,
  id = 'list_' + Date.now(),
}: this_interface) => {
  const root = shadow_root ? document.getElementById(shadow_root)?.shadowRoot : document;
  if (callback) {
    setTimeout(() => {
      root.querySelector(`#${id} input[type=button]`)?.addEventListener('click', (e) => {
        ////debugger;
        const ilc_value_el = <any>root.querySelector(`#${id}`)?.querySelector(`#${id}_ilc_value`);
        const value = ilc_value_el?.value;
        const ilc_text = ilc_value_el?.options && ilc_value_el?.options[ilc_value_el.selectedIndex || 0]?.text;
        const ilc_value = ilc_text ? ilc_text : value;
        const ilc_id = ilc_text ? value : unique_id(6);
        if (ilc_value) {
          list.push({
            value: ilc_value,
            id: ilc_id,
          });
          callback(e, id, list);
          dom_diffing(
            '',
            create_list(list, type, true, id + '_list', grow_wider, root, callback),
            'div',
            root.querySelector(`#${id}`)?.querySelector('#list_container'),
          );

          ilc_value_el['value'] = '';
        } else {
          console.log('duplicate value');
        }

        console.log(e);
      });
      // const list_callback = (e: any, id: string, list: any) => {

      //   callback(e, id, list);
      // }
      // root.querySelector(`#${id}`)?.addEventListener('click', (e) => {
      //   ////debugger;
      //   const dataset: any = e.target ? e.target['dataset'] : {};
      //   if (dataset.id) {
      //     list = list.filter((item) => item.id !== dataset.id);

      //     callback(e, id, list);
      //     dom_diffing(
      //       '',
      //       create_list(list, type, true, id + '_list', grow_wider),
      //       'div',
      //       root.querySelector(`#${id}`)?.querySelector('#list_container'),
      //     );
      //     console.log(e);
      //   }
      // });
    }, 0);
  }

  const css = /*css*/ `<style>
        #${id}{
            
        }
    </style>`;
  // ${input_with_label({
  return /*html*/ `
    ${css}

    <div class="layout horizontal" style='width: 100%; height: 100%;'>
        <div class="layout vertical flex" style='height: 100%'>
            <div class='layout vertical form_set end-justified' style='height: 100%' id="${id}">
                <h3  style='text-align: center; margin: 0;'>${title ? title : ''}</h3>
                ${
                  position === 'top'
                    ? `<div id="list_container">${create_list(
                        list,
                        type,
                        true,
                        id + '_list',
                        grow_wider,
                        root,
                        callback,
                      )}</div>
                        <div class='flex'></div>`
                    : ''
                }
                
                <div class='layout horizontal center start-justified '>
                    <div  style='max-width: 75%;' class='flex-4'>  
                        ${
                          input_type === 'text'
                            ? `<input style='width: 100%' type="text" value="" placeholder=${label} id="${id}_ilc_value"/>`
                            : ddl({
                                options: input_list,
                                id: id + '_ilc_value',
                              })
                        }
                    </div>
                    <div class='flex'></div>
                    <input class="self-end-justified " type='button' value='Add'/>
                </div>
                <div class='flex'></div>
                ${
                  position === 'bottom'
                    ? `<div class='flex'></div>
                    <div id="list_container">${create_list(
                      list,
                      type,
                      true,
                      id + '_list',
                      grow_wider,
                      root,
                      callback,
                    )}</div>`
                    : ''
                }
            </div>  
        </div>
    </div>
      
    `;
};