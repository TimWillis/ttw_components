import header from './header/header';
import page_content from './content/content';
import footer from './footer/footer';
declare global {
  var components: any;
  var is_node: any;
}

const layout = (
  page: string,
  pages: Array<any>,
  name = '',
  address = '',
  phone = '',
  facebook_url = '',
  logo_url = '',
) => {
  const css = () => {
    return `
      <style>
          #page_layout{
              width: 100%;
          }
          #footer{
              min-height: 30px;
          }
          #content{
              margin-top: 70px;
          }
      </style>`;
  };
  // debugger;
  const init = () => {};

  const html = /*html*/ `${css()}
        <div id='page_layout' class="layout vertical" id=${'test'}>            
            ${
              header(
                pages.filter((page) => !page.is_hidden),
                name,
                logo_url,
              ).html
            }                      
            ${page_content(page).html}                    
            ${footer(name, address, phone, facebook_url).html}
        </div>`;
  return {
    init: init,
    html: html,
  };
};
export default layout;

/******to access outside of modules *******/
if (typeof is_node === 'undefined') {
  if (typeof window.components === 'undefined') {
    window.components = {};
  }
  window.components.layout = layout;
  // navigation();
}
/*****************   End *******************/
