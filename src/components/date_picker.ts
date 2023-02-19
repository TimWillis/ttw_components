// import { Datepicker } from './libs/date_picker/main.js'; /*https://github.com/mymth/vanillajs-datepicker*/
import flatpickr from "flatpickr";
import svg from './svg';
import date_picker_style from '../css/date_picker_style';
export interface IDatePicker {
  html: () => string;
  init: () => void;
}

const create = (
  id: string,
  date: string = '',
  callback?: (e: Event, value: string) => void,
  should_init: boolean = true,
): IDatePicker => {
  const init = async () => {
    const elem = document.getElementById(`date_${id}`);
    if (elem) {
      // const { Datepicker } = await import('vanillajs-datepicker');
      /* NOTE: This is a hack to get the date picker to show the svg date icon*/
      const svg_container_el = document.getElementById(`svg_container_${id}`);
      svg_container_el.innerHTML = svg().html(
        'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z',
        'var(--theme-prim-bgcolor)',
      );
      const date_picker = flatpickr(elem, {
        // ...options
      });
      setTimeout(() => {
        const date = document.getElementById(`date_${id}`);
        const cb = (e: Event) => {
          const value = (date as HTMLInputElement)?.value;
          callback && callback(e, value);
        };
        date?.addEventListener('changeDate', cb);
      }, 10);
      // setTimeout(() => {
      //   /* NOTE: This is a hack to get the date picker to show the svg date icon*/
      //   const svg_container_el = document.getElementById(`svg_container_${id}`);
      //   svg_container_el.innerHTML = svg().html(
      //     'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z',
      //     'var(--theme-prim-bgcolor)',
      //   );
      // }, 0);
    } else if (document.querySelector('div')) {
      setTimeout(init, 50);
    }
  };
  should_init && setTimeout(init, 0);
  const html = /*html*/ () => /*html*/ `
    <div id="date_container_${id}" class="layout horizontal center" style='width: 100%;'>
        <div id='svg_container_${id}'>
            ${svg().html(
              'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z',
              'var(--theme-prim-bgcolor)',
            )}
        </div>
        <div style='width: 100%;'>                
            <input   autocomplete="off" style='width: 100%;' type="text" value="${date}" placeholder="Start Date" id="date_${id}"/>
        </div>
    </div> `;
  return { html, init };
};
const style = date_picker_style();
export default { create, style };