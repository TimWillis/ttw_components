let Reef = require('reefjs');
// import Reef from 'https://cdn.jsdelivr.net/npm/reefjs/dist/reef.es.min.js'
declare global {
  var components: any;
  var is_node: any;
}
const css = () => {
  return `
        .toolTipContainer {
            max-width: 300px;
            z-index: 9999;
            background: #8296AA;
            color: white;
            padding: 10px;
            text-align: left;
            border-radius: 5px;
            position: absolute;
            -webkit-box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
            -moz-box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
            box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
        }
        .toolTipContainer .closeContainer{
            position: relative;
            top: -5px;
            left: 5px;
        }
        .toolTipContainer div{
            width: 20px;
            overflow: visible;
            text-align: end;
            float: right;
        }
        svg{
            transition: all .5s ease;
            height: 1em;
            position: relative;
            background: white;
            fill: red;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 4px 5px 0 rgba(0,0,0,.08), 0 1px 10px 0 rgba(0,0,0,.08), 0 2px 4px -1px rgba(0,0,0,.3);
        }
        .toolTipContainer div svg:hover {
            -webkit-box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
            -moz-box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
            box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.4);
        }
        .toolTipContainer div span {
            text-align: left;
        }


        .fadeOut {
            visibility: hidden;
            opacity: 0;
            transition: visibility .3s, opacity .3s linear;
        }

        .fadeIn {
            visibility: visible;
            opacity: 1;
            transition: visibility 0s, opacity .3s linear;
        }
        @Media only screen and (max-width:840px) {
            .toolTipContainer{
                max-width: 200px;
            }
        }
        @media only screen and (max-width:400px) {
            .toolTipContainer{
                max-width: 150px;
            }
        }
    `;
};

interface IToolTipProps {
  id?: string;
}
interface IToolTipStateStyle {
  left: string;
  top: string;
  position: string;
  [key: string]: string | number;
}
interface IToolTipState {
  title?: string;
  tempTitle?: string;
  target?: any;
  style?: IToolTipStateStyle;
  titleElements: Array<any>;
  clicked: boolean;
  open: boolean;
}

const mouseX = (evt: any) => {
  if (!evt) evt = window.event;
  if (evt.pageX) return evt.pageX;
  else if (evt.clientX)
    return (
      evt.clientX +
      (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft)
    );
  else {
    let arr = evt.keys(evt).map(function (key: any) {
      return evt[key];
    });
    let pageX = 0;
    arr.forEach((value: any) => {
      if (value && value.pageX) {
        pageX = value.pageX;
      }
    });
    return pageX;
  }
};
const mouseY = (evt: any) => {
  if (!evt) evt = window.event;
  if (evt.pageY) return evt.pageY;
  else if (evt.clientY)
    return (
      evt.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)
    );
  else {
    let arr = evt.keys(evt).map(function (key: any) {
      return evt[key];
    });
    let pageY = 0;
    arr.forEach((value: any) => {
      if (value && value.pageY) {
        pageY = value.pageY;
      }
    });
    return pageY;
  }
};

if (!String.prototype.replaceAll) {
  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  }
  String.prototype.replaceAll = function (find, replace) {
    return this.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  };
}
const convert_style_obj = (style_obj) => {
  Object.keys(style_obj).forEach((key) => {
    !style_obj[key] && delete style_obj[key];
  });
  return JSON.stringify(style_obj).replaceAll('"', '').replaceAll(',', ';').replaceAll('{', '').replaceAll('}', '');
};

const tooltip = (selector: string, all_titles: boolean = false, id: string = 'tooltip') => {
  const selector_el = document.querySelector(selector);
  debugger;
  typeof is_node === 'undefined' && (Reef = !Reef.default ? Reef : Reef.default);
  let clicked = false,
    open = false,
    lastE: any,
    counter = 0,
    title = '',
    temp_title = '',
    style: IToolTipStateStyle = {
      left: '',
      top: '',
      position: '',
    };
  const set_style = (evt: any) => {
    counter += 1;
    const toolTipContainer = document.getElementById('toolTipContainer');
    if ((toolTipContainer!.offsetHeight > 30 && toolTipContainer!.offsetWidth > 30) || counter > 5) {
      const offY = 10,
        offX = 10,
        mx = parseInt(mouseX(evt)),
        my = parseInt(mouseY(evt)),
        windowHeight = window.innerHeight / 2,
        windowWidth = window.innerWidth / 2;
      const new_style = {
        position: 'absolute',
        left: '',
        top: '',
      };
      new_style.left = evt.clientX < windowWidth ? mx + offX + 'px' : mx - offX - toolTipContainer!.offsetWidth + 'px';
      new_style.top = evt.clientY < windowHeight ? my + offY + 'px' : my - offY - toolTipContainer!.offsetHeight + 'px';

      style = new_style;
      open = true;
      counter = 0;
    } else {
      setTimeout(() => {
        set_style(evt);
      }, 100);
    }
  };
  const setup_mouse = () => {
    const titleElements = Array.from(
      document.querySelectorAll(`${all_titles ? ':not([data-no_tooltip])' : '[data-tooltip]'} > [title]`),
    );
    let count = 0; /*actually the id so we can have more than 1 tooltip open at the same time*/
    titleElements.forEach((e) => {
      e.addEventListener('click', (evt: any) => {
        console.log('test1');
        evt.stopImmediatePropagation();
        clicked = true;
      });
      e.addEventListener('mouseover', (evt: any) => {
        console.log('test2');
        evt.stopImmediatePropagation();
        const target = evt.target;
        if (clicked || lastE === target) {
          return;
        }
        title = target.title || title;
        temp_title = target.title || title;
        lastE = target;
        if (target.title !== '') {
          set_style(evt);
          store.data = update_store(style, title, temp_title);
        }
        target.title = '';
      });
      e.addEventListener('mouseleave', (evt: any) => {
        console.log('test3');
        evt.stopImmediatePropagation();
        if (clicked) {
          return;
        }
        store.data = close(store.data);
      });
    });
  };
  const setup_click = () => {
    document.querySelector('#' + id).addEventListener('click', (event: any) => {
      console.log('test1');
      event.stopImmediatePropagation();
      const close_el = event.target.closest('[data-close]');
      if (close_el) {
        clicked = false;
        store.data = close(store.data);
      }
    });
  };
  const close = (old_store) => {
    (lastE.title = title), (lastE = null);
    return Object.assign({}, old_store, {
      open: false,
      title: '',
    });
  };

  const update_store = (style: IToolTipStateStyle, title, temp_title) => {
    return {
      open: true,
      title: title,
      style: convert_style_obj(style),
      temp_title: temp_title,
    };
  };
  const store = new Reef.Store({
    data: {
      open: false,
      style: convert_style_obj(style),
      title: title,
      temp_title: temp_title,
      id: id,
    },
  });
  const app = new Reef(selector_el, {
    store: store,
    template: function (props) {
      return `<div style="height: 0; width: 0; overflow: visible;" id=${props.id}>
            <div id='toolTipContainer' class="toolTipContainer ${!props.open ? 'fadeOut' : 'fadeIn'}" style=${
        props.style
      }>                 
                <div id="tooltip_closer" data-close="true" class=" ${
                  !props.open ? 'fadeOut' : 'fadeIn'
                } closeContainer"  >
                    <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"><g><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></g>
                </div>
                <span >
                    ${props.title ? props.title : props.temp_title}
                </span>
            </div>
        </div>`;
    },
  });
  const init = (app_to_render) => {
    const element = app_to_render.render();
    if (typeof is_node === 'undefined') {
      setTimeout(() => {
        setup_mouse();
        setup_click();
      }, 1000);
    }
    return { element: element };
  };
  return { init: init, app: app, css: css() };
};
export default tooltip;

/******to access outside of modules *******/
if (typeof is_node === 'undefined') {
  if (typeof window.components === 'undefined') {
    window.components = {};
  }
  window.components.tooltip = tooltip;
}
/*****************   End *******************/
