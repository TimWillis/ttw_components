// import { Datepicker } from './libs/date_picker/main.js'; /*https://github.com/mymth/vanillajs-datepicker*/
// import flatpickr from 'flatpickr';
// import svg from './svg';
// import date_picker_style from '../css/date_picker_style';
export interface IDatePicker {
  html: () => string;
  init: () => void;
  style: string;
}

const create = async (
  id: string,
  date: string = '',
  callback?: (e: Event, value: string) => void,
  should_init: boolean = true,
  is_range: boolean = false,
): Promise<IDatePicker> => {
  const date_picker_style_mod = await import('../css/date_picker_style');
  const date_picker_style = date_picker_style_mod.default;
  const svg_mod = await import('./svg');
  const svg = svg_mod.default;
  const init = async () => {

    const elem = document.getElementById(`date_${id}`);
    if (elem) {
      const flatpickr_mod = await import('flatpickr');
      const flatpickr = flatpickr_mod.default;
      // const { Datepicker } = await import('vanillajs-datepicker');
      /* NOTE: This is a hack to get the date picker to show the svg date icon*/
      const svg_container_el = document.getElementById(`svg_container_${id}`);
      svg_container_el.innerHTML = svg().html(
        'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z',
        'var(--theme-prim-bgcolor)',
      );
      const cb = (selectedDates, dateStr, instance) => {
        const e: any = { target: elem };
        // e.target = elem;
        callback(e, dateStr);
      };

      const default_date: any = is_range ? date.split(' to ') : date;
      default_date[1] === 'undefined' && default_date.splice(1, 1);
      const options: any = is_range
        ? {
            mode: 'range',
            dateFormat: 'm-d-Y',
          }
        : { dateFormat: 'm-d-Y', mode: 'single' };
      options.defaultDate = default_date;

      callback && (options.onChange = cb);
      const date_picker = flatpickr(elem, options);
      // setTimeout(() => {
      //     const date = document.getElementById(`date_${id}`);
      //     const cb = (e) => {
      //         const value = date?.value;
      //         callback && callback(e, value);
      //     };
      //     date?.addEventListener('onChange', cb);
      // }, 10);
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
            <input   autocomplete="off" style='width: 100%;' type="text" placeholder="Start Date" id="date_${id}"/>
        </div>
    </div> `;
  const style = await date_picker_style();
  return { html, init, style };
};
export default { create };
