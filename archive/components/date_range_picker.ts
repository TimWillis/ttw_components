// import { flatpickr } from 'flatpickr';
// import { DateRangePicker } from './libs/date_picker/main'; /*https://github.com/mymth/vanillajs-datepicker*/
import svg from './svg';
// import flatpickr from 'flatpickr';
export default (id: string, value: string) => {
  const [start_date, end_date] = (value && value.split(',')) || ['', ''];
  const init_date_picker = async () => {
    const flatpickr_mod = await import('flatpickr');
    const flatpickr = flatpickr_mod.default;
    const elem = document.getElementById(`date_range_${id}`);
    if (elem) {
      // const { DateRangePicker } = await import('vanillajs-datepicker');
      const rangepicker = flatpickr(elem, {
        mode: "range",
        dateFormat: "Y-m-d",
        defaultDate: ["2016-10-10", "2016-10-20"]
    });
      setTimeout(() => {
        const start_date = document.getElementById(`start_date_${id}`);
        const end_date = document.getElementById(`end_date_${id}`);
        const callback = (e: Event) => {
          // const value = (e.target as HTMLInputElement)?.value;
          const value = (start_date as HTMLInputElement)?.value + ',' + (end_date as HTMLInputElement)?.value;
          //value_selected(e, value);
        };
        start_date?.addEventListener('changeDate', callback);
        end_date?.addEventListener('changeDate', callback);
      }, 0);
    } else {
      setTimeout(init_date_picker, 50);
    }
  };
  setTimeout(init_date_picker, 0);
  return /*html*/ `
        <div id="date_range_${id}" class="layout horizontal center">
            <div>
                ${svg().html(
                  'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z',
                  'var(--theme-prim-bgcolor)',
                )}
            </div>
            <div name='start' class="width_150" style='margin-right: 10px;'>                
                <input   autocomplete="off" style='width: 100%;' type="text" value="${start_date}" placeholder="Start Date" id="start_date_${id}"/>
            </div>
            <span style='font-weight: bolder; margin: 0 10px;'> to </span>
            <div name='end' class="width_150" style='margin-right: 10px;'>                
                <input  autocomplete="off" style='width: 100%;' type="text" value="${end_date}" placeholder="End Date" id="end_date_${id}"/>
            </div>
        </div> `;
};
