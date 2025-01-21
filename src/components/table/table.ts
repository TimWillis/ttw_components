import dom_diffing from '../../utilities/dom_diffing';
import unique_id from '../../utilities/unique_id';

interface column_interface {
  value: any;
  sort_value?: any;
  style: string;
}

interface row_interface {
  columns: Array<column_interface>;
  id?: string;
}

interface table_interface {
  headers: Array<{ value: string; style: string; sortable?: boolean; sort_callback?: Function }>;
  rows: Array<row_interface>;
  id?: string;
}

export interface this_interface {
  data: table_interface;
  actions: any;
}

const css = /*css*/ `
                <style>
                        .table_headers .table_header, .table_row .table_column{
                                border-right: 2px solid var(--main-bg-color);
                        }
                        .table_header:last-child, .table_column:last-child, .table_row:nth-child(even) .table_column:last-child{
                                border-right: none;
                        }
                        .table_header, .table_column{
                                padding: 2px 10px;
                                border: none;
                                word-break: break-word;
                                cursor: pointer;
                        }
                        .table_header{
                                text-align: center;
                                color: var(--theme-prim-forcolor);
                                background-color: var(--theme-prim-bgcolor);
                        }
                        .table_column{
                                text-align: left;
                                color: var(--subnav-prim-forcolor);
                                background-color: var(--theme-prim-forcolor);
                                overflow-x: hidden;
                        }
                        .table_column input[type=text]{
                                width: 95%;
                                border: 1px solid var(--canvas-prim-forcolor);
                        }
                        .table_row:nth-child(even) .table_column {
                                background-color: var(--main-bg-color);
                                border-right: 2px solid white;
                        }
                        .table_rows{
                                border: 1px solid var(--canvas-prim-forcolor);
                                border-top: none;
                                overflow-y: overlay;
                        }
                        .table_row:hover .table_column{ 
                                background-color: var(--base_4);
                        }
                        .table.layout.vertical{
                                width: 100%;
                                max-height: 100%;
                                display: contents;
                        }
                        .no_data{
                                text-align: center;
                                padding: 20px;
                        }
                </style>
        `;

const columns = (column_list: Array<column_interface>) => {
  return column_list
    .map((column, index) => {
      return /*html*/ `
                        <div data-col_index="${index}" class="table_column layout vertical center-justified start" style="${column.style}">
                                ${column.value}
                        </div>
                `;
    })
    .join('');
};

const rows = (row_list: Array<row_interface>) => {
  return row_list
    .map((row, index) => {
      return /*html*/ `
                        <div data-id="${row.id}" data-row_index="${index}"  class="table_row layout horizontal">
                                ${columns(row.columns)}
                        </div>
                `;
    })
    .join('');
};

const sortTable = (table: table_interface, colIndex: number, ascending: boolean) => {
  table.rows.sort((a, b) => {
    const aValue = a.columns[colIndex].sort_value || a.columns[colIndex].value;
    const bValue = b.columns[colIndex].sort_value || b.columns[colIndex].value;

    const aString = aValue.toString().toLowerCase();
    const bString = bValue.toString().toLowerCase();

    const aNumber = parseFloat(aString);
    const bNumber = parseFloat(bString);

    if (!isNaN(aNumber) && !isNaN(bNumber)) {
      return ascending ? aNumber - bNumber : bNumber - aNumber;
    } else {
      if (aString < bString) return ascending ? -1 : 1;
      if (aString > bString) return ascending ? 1 : -1;
      return 0;
    }
  });
};

const table = (table: table_interface, sortColumn: number | null, ascending: boolean, id: string) => {
  return /*html*/ `
                <div id="${id}" class="table layout vertical">
                        <div class="table_headers layout horizontal">
                                ${table.headers
                                  .map((header, index) => {
                                    const isSorted = sortColumn === index;
                                    const arrow = isSorted ? (ascending ? '↑' : '↓') : '';
                                    return `
                                                        <div onclick="handle_header_click_${id}(event)" class="table_header layout horizontal center-center ${
                                      header.sortable !== false ? 'sortable' : ''
                                    }" data-col_index="${index}" style="${header.style}">
                                                                <span  data-col_index="${index}" >${
                                      header.value
                                    } </span><span  data-col_index="${index}"  style="color: inherit;">${arrow}</span>
                                                        </div>
                                                `;
                                  })
                                  .join('')}
                        </div>
                        <div class="table_rows">
                                ${
                                  table.rows.length > 0
                                    ? rows(table.rows)
                                    : `
                                                <div class="no_data">
                                                        No Data Available
                                                </div>
                                        `
                                }
                        </div>
                </div>
        `;
};

export default ({ data, actions }: this_interface) => {
  let sortColumn: number | null = null;
  let ascending = true;
  const id = data.id || unique_id(6);
  data.rows = data.rows.map((row) => {
    row.id = row.id || unique_id(6);
    row.columns = row.columns.map((column) => {
      if (typeof column.value === 'string') {
        column.value = column.value.trim();
      }
      if (typeof column.sort_value === 'string') {
        column.sort_value = column.sort_value.trim();
      }
      return column;
    });
    return row;
  });

  window['handle_header_click_' + id] = (event: Event) => {
    const target = event.target as HTMLElement;
    const colIndex = parseInt(target.dataset.col_index || '0', 10);
    if (sortColumn === colIndex) {
      ascending = !ascending;
    } else {
      sortColumn = colIndex;
      ascending = true;
    }
    sortTable(data, sortColumn, ascending);
    const parent = document.getElementById(id).parentElement;
    dom_diffing(undefined, render(), undefined, parent, true); //    parent.innerHTML =  render();
  };

  const render = () => {
    // const container = document.createElement('div');
    // container.innerHTML = `${css}${table(data, sortColumn, ascending)}`;
    // container.querySelectorAll('.table_header.sortable').forEach((header) => {
    //   header.addEventListener('click', handleHeaderClick);
    // });
    // document.body.innerHTML = '';
    // document.body.appendChild(container);
    return `${css}${table(data, sortColumn, ascending, id)}`;
  };

  return render();
};
