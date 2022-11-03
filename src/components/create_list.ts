import dom_diffing from '../utilities/dom_diffing';
import unique_id from '../utilities/unique_id';
export default (
  list: any[],
  type: 'table' | 'bubble' | 'comma' | 'dash',
  is_link: boolean,
  id: string = unique_id(6),
  grow_wider: boolean = true,
  root: Document | ShadowRoot = document,
  callback?: (e: any, id: string, list: any) => void,
) => {
  const create_list = (l) => {
    return l
      .map((item: { value: string; id: any }) => {
        return `<div class='list_item layout horizontal type_${type} '>
        ${is_link ? `<a target="_blank" href="${item.value}">${item.value}</a>` : item.value}
        ${type === 'table' ? `<div class='flex'></div>` : ''}
        ${callback ? `<div class='close' data-id="${item.id}">X</div>` : ''}
    </div>
`;
      })
      ?.join('');
  };
  const init = () => {
    root.querySelector(`#${id}`)?.addEventListener('click', (e) => {
      ////debugger;
      const dataset: any = e.target ? e.target['dataset'] : {};
      if (dataset.id) {
        list = list.filter((item) => item.id !== dataset.id);
        callback(e, id, list);
        dom_diffing(id, create_list(list), 'div', root.querySelector(`#${id}`)?.querySelector('#list_container'));
        console.log(e);
      }
    });
  };
  if(callback){
    setTimeout(init, 0);
  }
  const css = /*css*/ `<style>
    

    #${id}.type_table{
        flex-direction: column;
    }

    #${id}.type_table:nth-child(odd){
        background-color: white;
    }
    
    #${id}.type_bubble{
      display: flex;
    }

    #${id} .list_item.type_bubble{
        background-color: var(--theme-prim-forcolor);
        border-radius: 5px;
        margin: 4px;
        padding: 4px 6px;
        box-shadow: var(--base_box_shadow_1);
    }
    #${id} .list_item.type_table{
        background-color: var(--theme-prim-forcolor);
        margin: 0;
        padding: 4px 6px;
        display: flex;
        width: calc(100% - 10px);
        justify-content: flex-start;
    }
    #${id} .list_item.type_table:nth-child(even){
        background-color: var(--base_1);
    }
    #${id} .list_item, #${id}  .list_item{
        height: 2em;
        line-break: anywhere;
        align-items: center;
        justify-content: flex-center;
    }
    .list_item.type_comma::after {
        content: ", ";
      }
    .list_item.type_dash::after {
        content: " - ";
    }
    .list_item:last-child:after {
        content: '';
    }
    #${id} .close{
        border-radius: 50%;
        background-color: var(--base_1);
        box-shadow: var(--base_box_shadow_1);
        color: var(--theme-prim-forcolor);
        margin: 0 0 0 8px;
        padding: 0 2px;
        cursor: pointer;
    }
</style>`;
  return (
    css +
    `<div id='${id}'   class='layout wrap type_${type}  ${grow_wider ? 'flex' : ''}'>
    ${create_list(list)}
    </div>`
  );
};