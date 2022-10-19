export default (
  list: any[],
  type: 'table' | 'bubble' | 'comma' | 'dash',
  is_link: boolean,
  deletable: boolean,
  id: string,
  grow_wider: boolean = true,
) => {
  const css = /*css*/ `<style>
    

    #${id}.type_table{
        flex-direction: column;
    }

    #${id}.type_table:nth-child(odd){
        background-color: white;
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
    `<div id='${id}'   class='layout wrap type_${type}  ${grow_wider ? 'flex' : ''}'>` +
    list
      .map((item: { value: string; id: any }) => {
        return `<div class='list_item layout horizontal type_${type} '>
        ${is_link ? `<a target="_blank" href="${item.value}">${item.value}</a>` : item.value}
        ${type === 'table' ? `<div class='flex'></div>` : ''}
        ${deletable ? `<div class='close' data-id="${item.id}">X</div>` : ''}
    </div>
`;
      })
      ?.join('') +
    '</div>'
  );
};
