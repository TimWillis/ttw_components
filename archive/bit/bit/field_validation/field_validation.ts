import add_el from '../add_elements/add_element';

export default (text, el, id = '', z_index = '') => {
  if (el) {
    const close_validation = (el) => {
      el.innerHTML = '';
    };
    const style = `<style>
            .field_validation{
                background-color: var(--field_validation_bg);
                color: var(--field_validation_color);
                border-radius: 5px;
                padding: 2px 5px;
            }
        </style>`;

    const content = `
            <div class="field_validation"
                style="margin: 0.5em; display: block; position:absolute;
                left: ${el.getBoundingClientRect().left - 10}px; 
                top:${el.getBoundingClientRect().top - 30}px;
                z-index: ${z_index};"            
                id="${id ? id : el.id}" >
                <span > </span>
                <span id="tooltip_text">${text}</span>
                <div></div>
            </div>`;
    // debugger;
    let container_el = document.querySelector('#validation_message');
    if (container_el) {
      const message_el = add_el(content, container_el, id);
      el.addEventListener('click', close_validation.bind(this, message_el));
      container_el
        .querySelector('#' + (id ? id : el.id))
        .addEventListener('click', close_validation.bind(this, message_el));
    } else {
      add_el(style, document.body, 'validation_message');
      // setTimeout(() => {
      container_el = document.querySelector('#validation_message');
      const message_el = add_el(content, container_el, id);
      el.addEventListener('click', close_validation.bind(this, message_el));
      container_el
        .querySelector('#' + (id ? id : el.id))
        .addEventListener('click', close_validation.bind(this, message_el));
      // }, 0)
    }
  }
};
