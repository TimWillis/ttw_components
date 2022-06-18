import dom_diffing from '../../../utilities/dom_diffing';

declare global {
  var components: any;
  var is_node: any;
}
const css = /*css*/ `
    header{
        --header_padding: 10px;
        z-index: 1;
        width: calc(100% - var(--header_padding) * 2);
        color: var(--fore_color2);
        height: 0;
        background-color: var(--background_color); 
        border-bottom: 4px solid var(--fore_color2);
        position: fixed;
        top: 0;
        overflow-y: visible;
        opacity: 1;
        height: 84px;
        padding: 0 var(--header_padding);
        box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
    }
    #header_inner_container{
        width: 100%;
        height: 100%;
        color: var(--fore_color2);
        background-color: var(--background_color);
        transition: all .3s ease;
    }
    img{
        height: calc(100% - 10px);
        margin: 5px;
    }
    nav{
        height: 100%;
    }
    nav a{
        padding: 0 10px;
        text-decoration: none;
        height: 100%;
        color: var(--fore_color2);
        text-transform: uppercase;
        text-decoration: none;
        font-size: 1.5rem;
        letter-spacing: 4px;
    }
    nav a:hover{
        background-color: var(--background_color_alt);
        color: white;
    }
    nav a.active{
        border-top: 1px solid var(--fore_color2);
    }

    .desktop_nav{
        height: 100%;
    }
    .mobile_nav{
        display: none;
        height: 100%;
    }
    .mobile_nav nav{
        background-color: var(--background_color);
        transition: all .3s ease;
        position: absolute;
        top: 88px;
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
        height: 35px;
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
        background:  var(--fore_color2);
        transition: 0.25s cubic-bezier(0.7, 0, 0.3, 1);
        border-radius: 10px;
    }
    header .navicon:before, .navicon:after {
        display: block;
        content: "";
        height: 2px;
        width: 2rem;
        background:  var(--fore_color2);
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
    .logo{
        line-height: 1;
        padding: 4px;
        text-decoration: none;
        white-space: nowrap;
        letter-spacing: 1px;
        font-size: 2rem;
    }
    @media (max-width: 500px){        
        .logo{
            font-size: 1.5rem;
        }
        #logo{
            height: 75px;
            width: 78px;
        }
    }
    @media (max-width: 1000px){
        .mobile_nav{
            display: block;
        }
        .desktop_nav{
            display: none;
        }
    }
    @media (min-width: 1000px){
        .mobile_nav{
            display: none!important;
        }
        .desktop_nav{
            display: block;
        }
    }
  `;

const mobile_nav = (state) => {
  return `    
        <div id="menu_button">
            <div class="navicon-button x ${state.open ? 'is_open' : ''}">
                <div class="navicon"></div>
            </div>
        </div>
        <nav id='nav_list' class="layout vertical center start-justified ${
          state.open ? 'open' : 'close'
        }" style="display: ${state.styles.nav_display}">                    
            ${state.pages
              .map(function (page) {
                return `<a  class="layout horizontal center-center" href='#${page.url}'>${page.name}</a>`;
              })
              .join('')}
        </nav>
`;
};

const html = (state) => {
  return /*html*/ `
    <style>
        ${css}
    </style>
    <header>
        <div id="header_inner_container" class='layout horizontal center-center fancy_font'>
            <div style="height: 100%;">
                <img id="logo" alt="Home Hero Realty Logo" style="height: 75px; width: 78px;" src="/resources/images/site/logo_small.png"/>
            </div>
            <h1 class='logo'>
                Home Hero Realty
            </h1>
            <div class="flex"></div>
            <div class='desktop_nav'>
                <nav class="layout horizontal center-center">                    
                    ${state.pages
                      .map(function (page) {
                        return `<a  class="layout horizontal center-center" href='#${page.url}'>${page.name}</a>`;
                      })
                      .join('')}
                </nav>
            </div>
            <div id='mobile_nav' class="mobile_nav layout vertical center-center">
                ${mobile_nav(state)}
            </div>
        </div>
    </header>
    `;
};
const header = (pages: Array<any>) => {
  // const store = {
  //     open: false
  // }
  pages = pages.filter((page) => !page.is_hidden);

  const state = {
    open: false,
    styles: { nav_display: 'none' },
    pages: pages,
  };

  const open_close = () => {
    state.open = !state.open;
    dom_diffing('mobile_nav', mobile_nav(state), 'div', undefined, true);
  };
  const nav_display = (display) => {
    state.styles = Object.assign({}, state.styles, {
      nav_display: display,
    });
    dom_diffing('mobile_nav', mobile_nav(state), 'div', undefined, true);
  };

  const setup_events = () => {
    const handle_click = (event: any) => {
      event.stopImmediatePropagation();
      if (state.open) {
        setTimeout(() => {
          nav_display('none');
        }, 500);
      } else {
        nav_display('');
      }
      setTimeout(() => {
        open_close();
      }, 0);
    };
    document.querySelector('#menu_button').addEventListener('click', handle_click);
    document.querySelector('.mobile_nav nav').addEventListener('click', handle_click);
  };

  const init = () => {
    setup_events();
  };
  return { init: init, html: html(state) };
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
