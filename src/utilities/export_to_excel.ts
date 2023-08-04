import { Workbook } from 'exceljs';
import html_to_excel_cell from './html_to_excel_cell';
import flatten_object, { FlatObject } from './flatten_object';

export interface ExcelData {
  [key: string]: any;
}

const object_to_string = (obj: object): string => {
  return Object.entries(obj)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');
};

const export_to_excel = async (jsonString: string, filename: string): Promise<void> => {
  let data: ExcelData[] = JSON.parse(jsonString);
  
  // Flatten each object in the data array
  data = data.map(flatten_object);

  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  // Extract headers from all objects
  const headers = Array.from(new Set(data.flatMap((obj) => Object.keys(obj))));
  worksheet.columns = headers.map((header) => ({ header, key: header }));

  // Add rows
  data.forEach((row, rowIndex) => {
    const excelRow = worksheet.getRow(rowIndex + 2); // +2 because Excel is 1-indexed and the first row is for headers

    headers.forEach((header) => {
      const cell = excelRow.getCell(header);
      let value = row[header];

      if (Array.isArray(value)) {
        // Convert arrays into comma-separated lists without quotes
        // If the array value is an object, stringify it
        value = value.map(item => typeof item === 'object' ? object_to_string(item) : item).join(", ");
      }

      if (typeof value === 'string' && value.includes('<')) {
        cell.value = value.replace(/<[^>]*>/g, ''); // Strip HTML tags
        const styles = html_to_excel_cell(value);
        Object.assign(cell, styles); // Apply styles
      } else {
        cell.value = value;
      }
    });

    excelRow.commit();
  });

  // Write to Blob
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  // Download
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download.xlsx';
  a.click();
  URL.revokeObjectURL(url);
};

export default export_to_excel;