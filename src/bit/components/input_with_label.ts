export interface input_with_label_interface {
  html: string;
  for_id: string;
  name: string;
  id?: string;
}

export default ({ html, for_id, name, id }: input_with_label_interface) => {
  id = id ? id : for_id ? for_id + '_label_container' : 'input' + Date.now();
  // const new_id = "input" + Date.now()
  // id = id ? id : new_id;
  const css = /*css*/ `<style>
        #${id}{
            
        }
        .input_with_label{
            margin: 5px;
        }
        .input_with_label label{
            background-color: var(--theme-prim-bgcolor);
            color: var(--theme-prim-forcolor);
            padding: 5px;
        }
    </style>`;
  return /*html*/ `
    ${css}
    <div id="${id}" class="input_with_label layout vertical">
        <label for=${for_id} id='label_${id}' class="layout horizontal">${name}</label>
        ${html}            
    </div>`;
};
