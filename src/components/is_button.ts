import unique_id from '../utilities/unique_id';

import svg from './svgs/svg';
const new_svg = svg().html;

export interface is_button_interface {
  color?: string;
  bg_color?: string;
  text?: string;
  callback: (e: any, value: string) => void;
  path?: string;
  name_space?: string;
  id?: string;
  svg?: string;
  disabled?: boolean;
}

const default_options: is_button_interface = {
  name_space: '_ttw',
  callback: () => {},
  color: '',
  bg_color: '',
  text: '',
  path: '',
};

const html = (options: is_button_interface = default_options) => {
  options = Object.assign({ id: unique_id(6) }, default_options, options);
  typeof window[options.name_space] === 'undefined' && (window[options.name_space] = {});
  window[options.name_space][options.id + '_button'] = options.callback;
  return /*html*/ ` 
        <button type='button' ${options.disabled ? 'disabled' : ''} class='layout horizontal center-center' 
        style='color: ${options.color}; background-color: ${options.bg_color}; ${
    options.path || options.svg ? 'padding: 5px;' : ''
  }' onclick="${options.name_space}['${options.id + '_button'}'](event)">
            ${options.text} ${(options?.path && new_svg(options?.path, options?.color)) || ''} ${
    options?.svg ? options?.svg : ''
  }
        </button>
    `;
};

export default () => {
  return {
    init: () => {},
    html: html,
  };
};
