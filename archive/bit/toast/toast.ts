let Reef = require('reefjs');
Reef = typeof Reef.default !== 'undefined' ? Reef.default : Reef;

const toast = (selector: string, parent_app: any, id: string = 'toast') => {
  // debugger;
  const css = () => {
    return `
            #toaster {
                min-width: 120px;
                text-align: center;
                position: fixed;
                right: 20px;
                bottom: 100vh;
                z-index: 10010;
                padding: 10px;
                border-radius: 10px;
                font-size: 14px;
                transition: all 1s ease-in-out;
                display:block;
            }
                #toaster.bottom {
                    bottom: 20px !important;
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
    let class_list = `${props.is_fade_in ? 'fade_in' : props.is_fade_in === null ? 'start_hidden' : 'fade_out'}`;
    class_list += ` ${props.is_bottom ? 'bottom' : ''}`;
    return `
        <style>${css()}</style>
        <div class="${class_list}" id="toaster" style="color: ${props.color}; background-color: ${
      props.bg_color
    }; padding-right: ${props.fade_time ? '' : '20px'};">
            <div class="message">
                ${props.msg}
            </div>
                <div class='close_x ${props.fade_time ? 'hidden' : ''}'>
                    X
                </div>
        </div>`;
  };
  const app = new Reef(selector, {
    data: {
      id: id,
      is_fade_in: null,
      is_bottom: false,
    },
    template: html,
    attachTo: parent_app ? parent_app : undefined,
  });
  function close_toast() {
    app.data.is_fade_in = false;
    setTimeout(() => {
      app.data.is_bottom = false;
    }, 300);
  }
  function show_message(
    msg: string,
    fade_time: number,
    bg_color = 'var(--alert_warning_bg)',
    color = 'var(--alert_warning_color)',
  ) {
    //
    app.data.msg = msg;
    app.data.fade_time = fade_time;
    app.data.bg_color = bg_color;
    app.data.color = color;
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
  return { app: app, css: css, show_message: show_message };
};
export default toast;
