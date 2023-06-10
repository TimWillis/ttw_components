export interface toggle_switch_options {
    height?: number;
    width?: number;
    color?: string;
    background_color?: string;
    on_toggle?: (checked: boolean) => void;
  }
  
  export const create_toggle_switch = ({height = 20, width = 40, color = 'white', background_color = 'gray', on_toggle}: toggle_switch_options) => {
    const template = document.createElement('template');
    template.innerHTML = `
      <style>
        .switch {
          position: relative;
          display: inline-block;
          width: ${width}px;
          height: ${height}px;
        }
        
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: ${background_color};
          transition: .4s;
        }
        
        .slider:before {
          position: absolute;
          content: "";
          height: ${height - 10}px;
          width: ${height - 10}px;
          left: ${height / 5}px;
          bottom: ${height / 5}px;
          background-color: ${color};
          transition: .4s;
        }
        
        .switch input:checked + .slider {
          background-color: ${color};
        }
        
        .switch input:checked + .slider:before {
          transform: translateX(${width - height}px);
        }
      </style>
      <label class="switch">
        <input type="checkbox">
        <span class="slider"></span>
      </label>
    `;
  
    class toggle_switch extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
      }
  
      connectedCallback() {
        this.shadowRoot.querySelector('input').addEventListener('click', () => {
          const event = new CustomEvent('toggle', { 
            detail: { checked: this.shadowRoot.querySelector('input').checked }
          });
          this.dispatchEvent(event);
  
          if (on_toggle) {
            on_toggle(this.shadowRoot.querySelector('input').checked);
          }
        });
      }
    }
  
    window.customElements.define('toggle-switch', toggle_switch);
  }


  /*
   ///* How to use:
   import { create_toggle_switch, toggle_switch_options } from './path-to-module';

const options: toggle_switch_options = {
  height: 30,
  width: 60,
  color: 'red',
  background_color: 'blue',
  on_toggle: (checked: boolean) => {
    console.log('Toggle state: ', checked);
  },
};

create_toggle_switch(options);
    */