declare global {
  var components: any;
  var is_node: any;
}
const css = () => {
  return /*css*/ `
        <style>
            footer{
                background-color: white; 
                color: var(--fore_color2);
                text-shadow: 1px 2px 4px rgba(0,0,0,0.2);
                border-top: 4px solid var(--fore_color2);               
                box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
                overflow-y: hidden;
                padding: 5px;
            }
            footer a{
                color: var(--fore_color2);
                text-shadow: 1px 2px 4px rgba(0,0,0,0.2);
                text-decoration: underline;
            }
        </style>
    `;
};

const html = (state) => {
  return /*html*/ `
        ${css()}            
        <footer>
            <div class="vertical layout center around-justified wrap" id="footer">
                <div class="horizontal layout center center-justified wrap" >
                    <div>Home Hero Realty LLC</div>
                    <div style="margin: 0 2em;">
                        <a href="#sitemap">Sitemap</a>
                    </div>
                    <div>
                        Copyright © 2017-${state.year}
                    </div>
                </div>
                <div class="horizontal layout center center-justified wrap">
                    <div style="margin: 0 2em;">
                        Rockledge, FL 32955
                    </div>
                    <div style="margin: 0 2em;">                        
                        <a href="tel:+1-321-209-1519">321-209-1519</a>                        
                    </div>
                    <div style="margin: 0 2em;">
                        <a target="_blank" rel="noopener" href="https://www.facebook.com/Homeherorealtycom-126932002917385/">Facebook!</a>
                    </div>
                </div>
            </div>
        </footer>
    `;
};
const footer = () => {
  const state = { year: new Date(Date.now()).getFullYear() };

  const init = () => {};
  return { init: init, html: html(state) };
};

export default footer;

/******to access outside of modules *******/
if (typeof is_node === 'undefined') {
  if (typeof window.components === 'undefined') {
    window.components = {};
  }
  window.components.footer = footer;
}
/*****************   End *******************/
