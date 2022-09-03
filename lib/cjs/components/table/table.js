"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// data: {
//     [index: number]: {
//         id: string,
//         role: string,
//         feature: string,
//         action: string,
//         expected_results
//      };
// },
const css = /*css*/ `
        <style>
            .table_headers .table_header, .table_row .table_column{
                border-right: 2px solid white;
            }
            .table_header:last-child, .table_column:last-child{
                border-right: none;
            }
            .table_header, .table_column{
                padding: 2px 10px;
                border: none;
                text-align: center;
                word-break: break-word;
            }
            .table_header{
                color: var(--theme-prim-forcolor);
                background-color: var(--theme-prim-bgcolor);
            }
            .table_column{
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
// const column_html = (value, type) => {
//     let html = "";
//     if(type === "text_input"){
//         html =  `
//         <input type="text" value="${value}"/>
//         `
//     }else if(type === "text_input"){
//         html =  `
//         <input type="text" value="${value}"/>
//         `
//     }  else{
//         html = value;
//     }
//     return html
// }
const columns = (column_list) => {
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
const rows = (row_list) => {
    return row_list
        .map((row, index) => {
        return /*html*/ `
            <div data-row_index="${index}"  class="table_row layout horizontal">
                ${columns(row.columns)}
            </div>
        `;
    })
        .join('');
};
const table = (table) => {
    return /*html*/ `
        <div class="table layout vertical">
            <div class="table_headers layout horizontal">
                ${table.headers
        .map((header) => {
        return `
                        <div class="table_header " style="${header.style}">
                            ${header.value}
                        </div>
                    `;
    })
        .join('')}
            </div>
            <div class="table_rows">
                ${table.rows.length > 0
        ? rows(table.rows)
        : `
                <div class="no_data">
                    No Data Available
                </div>
                `}
            </div>
        </div>

    `;
};
exports.default = ({ data, actions }) => {
    return /*html*/ `
        ${css}
        ${table(data)}
    `;
};
//# sourceMappingURL=table.js.map