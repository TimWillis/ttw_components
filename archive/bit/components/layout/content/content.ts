interface this_interface {
  // content: any;
  page: string;
}

const data_defaults = {
  sync_url: 'https://localhost:44316/testgen/testgen_login',
};

export default (page) => {
  ////debugger;

  // const init = () => {};

  const css = /*css*/ `<style>
        #main_content{
            height: calc(100% - 20px);
            width: calc(100% - 20px);
            padding: 10px;
            margin-top: 90px;
        }
    </style>`;
  const html = `
            ${css}
            <div id="main_content">
                ${page().html}
            </div>
        `;

  // init();

  return { html: html };
};
