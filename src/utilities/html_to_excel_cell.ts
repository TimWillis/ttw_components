export interface ExcelFontStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  vertAlign?: string;
  color?: { rgb: string };
}

export interface ExcelFillStyle {
  fgColor?: { rgb: string };
}

export interface ExcelStyle {
  font?: ExcelFontStyle;
  fill?: ExcelFillStyle;
  border?: {
    top?: { style: string; color: { rgb: string } };
    bottom?: { style: string; color: { rgb: string } };
    left?: { style: string; color: { rgb: string } };
    right?: { style: string; color: { rgb: string } };
  };
}

const generate_styles = (html: string): ExcelStyle => {
  const styles: ExcelStyle = {};
  let font: ExcelFontStyle = {};
  let fill: ExcelFillStyle = {};
  let border = {};

  // Font styles
  if (html.includes('<b>')) font.bold = true;
  if (html.includes('<i>')) font.italic = true;
  if (html.includes('<u>')) font.underline = true;
  if (html.includes('<s>') || html.includes('<strike>')) font.strike = true;
  if (html.includes('<sup>')) font.vertAlign = 'superscript';
  if (html.includes('<sub>')) font.vertAlign = 'subscript';

  // Font color
  const colorMatch = html.match(/color:\s*(#[0-9A-F]{6}|#[0-9A-F]{3}|[a-z]+);/i);
  if (colorMatch) {
    const rgb = parse_css_color(colorMatch[1]);
    if (rgb) font.color = { rgb: rgb };
  }

  // Background color
  const bgColorMatch = html.match(/background-color:\s*(#[0-9A-F]{6}|#[0-9A-F]{3}|[a-z]+);/i);
  if (bgColorMatch) {
    const rgb = parse_css_color(bgColorMatch[1]);
    if (rgb) fill.fgColor = { rgb: rgb };
  }

  // Border color
  const borderColorMatch = html.match(/border-color:\s*(#[0-9A-F]{6}|#[0-9A-F]{3}|[a-z]+);/i);
  if (borderColorMatch) {
    const rgb = parse_css_color(borderColorMatch[1]);
    if (rgb)
      border = {
        top: { style: 'thin', color: { rgb: rgb } },
        bottom: { style: 'thin', color: { rgb: rgb } },
        left: { style: 'thin', color: { rgb: rgb } },
        right: { style: 'thin', color: { rgb: rgb } },
      };
  }

  // Apply styles
  if (Object.keys(font).length > 0) styles.font = font;
  if (Object.keys(fill).length > 0) styles.fill = fill;
  if (Object.keys(border).length > 0) styles.border = border;

  return styles;
};

const parse_css_color = (color: string): string => {
  // Handle named colors - this list is not complete
  const namedColors: { [key: string]: string } = {
    red: 'FF0000',
    green: '00FF00',
    blue: '0000FF',
    black: '000000',
    white: 'FFFFFF',
    // add more named colors here...
  };

  // Handle hex colors
  if (color.startsWith('#')) {
    return color.slice(1).toUpperCase().padStart(6, '0');
  }

  // Handle named colors
  return namedColors[color.toLowerCase()];
};

export default generate_styles;
