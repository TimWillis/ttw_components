let Reef = require('reefjs');
let LogRocket = require('logrocket');
LogRocket.init('jiljd1/home-hero-realty');
import convert_style_obj from '../../../utilities/convert_style_obj';
import touch from '../../../utilities/touch';
// import Reef from 'https://cdn.jsdelivr.net/npm/reefjs/dist/reef.es.min.js'
declare global {
  var components: any;
  var is_node: any;
}
const css = /*css*/ `
    header{
        width: 100%;
        color: red;
        height: 0;
        background-color: white;
        border-bottom: 1px solid red;
        position: fixed;
        top: 0;
        overflow-y: visible;
    }
    #header_inner_container{
        width: 100%;
        color: red;
        background-color: white;
        border-bottom: 1px solid red;
        transition: all .3s ease;
    }
    nav{
        height: 100%;
    }
    nav a{
        padding: 0 10px;
        text-decoration: none;
        height: 100%;
    }
    nav a:hover{
        background-color: red;
        color: white;
    }
    nav a.active{
        border-top: 1px solid red;
    }

    .desktop_nav{
        height: 100%;
    }
    .mobile_nav{
        display: none;
        height: 100%;
    }
    .mobile_nav nav{
        background-color: white;
        transition: all .3s ease;
        position: absolute;
        top: 51px;
        left: 0;
        height: auto;
        width: 100%;
    }
    .mobile_nav nav.close{        
        z-index: -1;
        opacity: 0;
    }
    .mobile_nav nav.open{        
        z-index: 1;
        opacity: 1;
        
    }
    .mobile_nav nav a{
        padding: 10px 0;
        height: 20px;
        width: 100%;
    }
    header #menu_button{
        height: 100%;
        cursor: pointer;
        margin: 0 10px;
    }
    
    header .navicon-button {
        position: relative;
        user-select: none;
        opacity: .8;
        top: 50%;
    }
    header #menu_button:hover .navicon-button {
        background: none;
        transition: 0.25s;
        opacity: 1;
    }
    header #menu_button:hover .navicon-button .navicon:before {
        top: .825rem;
    }
    header  #menu_button:hover .navicon-button .navicon:after {
        top: -.825rem;
    }
    header .navicon {
        position: relative;
        width: 2rem;
        height: 2px;
        background: red;
        transition: 0.25s cubic-bezier(0.7, 0, 0.3, 1);
        border-radius: 10px;
    }
    header .navicon:before, .navicon:after {
        display: block;
        content: "";
        height: 2px;
        width: 2rem;
        background: red;
        position: absolute;
        transition: 0.25s cubic-bezier(0.7, 0, 0.3, 1);
        border-radius: 10px;
    }
    header .navicon:before {
        top: .625rem;
    }
    header .navicon:after {
        top: -.625rem;
    } 
    
    .is_open:not(.steps) .navicon:before,
    .is_open:not(.steps) .navicon:after {
        top: 0 !important;
    }

    .is_open .navicon:before,
    .is_open .navicon:after {
        transition: 0.75s;
    }

    .is_open.x .navicon {
        background: transparent;
    }
    .is_open.x .navicon:before {
        transform: rotate(-45deg);
    }
    .is_open.x .navicon:after {
        transform: rotate(45deg);
    }
    @media (max-width: 1000px){
        .mobile_nav{
            display: block;
        }
        .desktop_nav{
            display: none;
        }
    }
  `;
const styles = {
  header: {
    opacity: '1',
    height: '50px',
  },
};
const html = (props) => {
  return /*html*/ `
    <header>
        <div id="header_inner_container" class='layout horizontal center-center' style=${convert_style_obj(
          props.styles.header,
        )}>
            <div class='logo'>LOGO
            </div>
            <div class="flex"></div>
            <div class='desktop_nav'>
                <nav class="layout horizontal center-center">                    
                    ${props.pages
                      .map(function (page) {
                        return `<a  class="layout horizontal center-center" href='#${page.url}'>${page.name}</a>`;
                      })
                      .join('')}
                </nav>
            </div>
            <div class="mobile_nav">
                <div id="menu_button">
                    <div class="navicon-button x ${props.open ? 'is_open' : ''}">
                        <div class="navicon"></div>
                    </div>
                </div>
                <nav class="layout vertical center start-justified ${
                  props.open ? 'open' : 'close'
                }">                    
                    ${props.pages
                      .map(function (page) {
                        return `<a  class="layout horizontal center-center" href='#${page.url}'>${page.name}</a>`;
                      })
                      .join('')}
                </nav>
            </div>
        </div>
    </header>
    `;
};
const header = (selector: string, parent_app: any, pages: Array<any>) => {
  let clicked = false,
    open = false,
    header_shown = true;

  typeof is_node === 'undefined' && (Reef = !Reef.default ? Reef : Reef.default);
  const store = new Reef.Store({
    data: {
      pages: pages,
      styles: styles,
      open: false,
    },
  });
  const update_store = (new_store) => {
    store.data = Object.assign({}, store.data, new_store);
  };

  const hide_header = () => {
    styles.header.height = '25px';
    styles.header.opacity = '.01';
    update_store({ styles: styles });
    header_shown = false;
  };

  const show_header = () => {
    // header.style.height = "50px";
    // header.style.opacity = "1";
    styles.header.height = '50px';
    styles.header.opacity = '1';
    update_store({ styles: styles });
    if (!header_shown) {
      setTimeout(() => {
        if (!store.data.open) {
          hide_header();
        }
      }, 4000);
      header_shown = true;
    }
  };

  const setup_events = () => {
    document.querySelector('#menu_button').addEventListener('click', (event: any) => {
      //   console.log("test1");
      event.stopImmediatePropagation();
      store.data = toggle(store.data);
    });
    document.querySelector('.mobile_nav nav').addEventListener('click', (event: any) => {
      //   console.log("test1");
      event.stopImmediatePropagation();
      store.data = toggle(store.data);
    });
    if (window.innerWidth < 1080) {
      setTimeout(() => {
        const header = document.getElementById('header_inner_container');
        hide_header();
        const swiped = (direction) => {
          if (direction == 'down') {
            show_header();
          }
          console.log(direction);
        };
        touch(header, swiped);
      }, 4000);
    }
  };

  const toggle = (old_store) => {
    old_store.open && hide_header();
    return Object.assign({}, old_store, {
      open: !old_store.open,
    });
  };

  // const selector_el = document.querySelector(selector);
  // debugger;
  const app = new Reef(selector, {
    store: store,
    template: html,
    attachTo: parent_app,
  });
  // app.stringToHTML()
  const init = (app_to_render) => {
    const element = app_to_render.render();
    if (typeof is_node === 'undefined') {
      setup_events();
    }
    return { element: element };
  };
  return { init: init, app: app, css: css };
};

export default header;

/******to access outside of modules *******/
if (typeof is_node === 'undefined') {
  if (typeof window.components === 'undefined') {
    window.components = {};
  }
  window.components.header = header;
}
/*****************   End *******************/
