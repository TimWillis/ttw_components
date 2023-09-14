let Reef = require('reefjs');
Reef = typeof Reef.default !== 'undefined' ? Reef.default : Reef;

const modal = (selector: string, parent_app: any, id: string = 'modal') => {
  // debugger;
  const css = () => {
    return `
            #modal_container{
                position: absolute;
                z-index: 10010;
                top: 0;
                left: 0;
                height: 100vh;
                width: 100vw;
                background-color: rgba(100,100,100, .5);
            }
            #modal {
                min-width: 120px;
                text-align: center;
                padding: 10px;
                border-radius: 10px;
                font-size: 14px;
                transition: all 1s ease-in-out;
                background-color: rgba(100,100,100, .8);
            }
            .close_x {
                position: absolute;
                top: 3px;
                right: 5px;
                border-radius: 50%;
                background-color: var(field_validation_bg);
                color: var(field_validation_color);
                padding: 0 3px;
                cursor: pointer; 
            }`;
  };

  const html = (props: any) => {
    debugger;
    let class_list = `${props.is_fade_in ? 'fade_in' : props.is_fade_in === null ? 'start_hidden' : 'fade_out'}`;
    return `
        <style>${css()}</style>
        <div id="modal_container" class="layout vertical center-center ${class_list}">
            <div  id="modal" style="${props.styles};">
                <div class="message">
                    ${props.html}
                </div>
                    <div class='close_x ${props.fade_time ? 'hidden' : ''}'>
                        X
                    </div>
            </div>
        </div>
        `;
  };
  const app = new Reef(selector, {
    data: {
      id: id,
      is_fade_in: null,
      is_bottom: false,
    },
    template: html,
    allowHTML: true,
    attachTo: parent_app ? parent_app : undefined,
  });
  function close_modal() {
    app.data.is_fade_in = false;
    // setTimeout(() => {
    //     app.data.is_bottom = false;
    //     },
    //     300);
  }
  function show_modal(html: string, fade_time: number, styles: string) {
    //
    app.data.html = html;
    app.data.fade_time = fade_time;
    app.data.styles = styles;
    app.data.is_fade_in = true;
    app.data.is_bottom = true;
    if (fade_time) {
      setTimeout(() => {
        app.data.is_fade_in = false;
        setTimeout(() => {
          app.data.is_bottom = false;
        }, 300);
      }, fade_time);
    }
  }
  // const init = (app_to_render: any) => {
  // //   const element = app_to_render.render();

  //   if (typeof is_node === "undefined") {
  //     // setup_events();
  //   }
  //   return { ShowContentMessage: ShowContentMessage };
  // };
  return { app: app, css: css, show_modal: show_modal, close_modal: close_modal };
};
export default modal;
