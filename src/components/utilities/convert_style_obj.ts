// if (!String.prototype.replaceAll) {
//   function escapeRegExp(str) {
//     return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
//   }
//   String.prototype.replaceAll = function (find, replace) {
//     return this.replace(new RegExp(escapeRegExp(find), 'g'), replace);
//   };
// }

export default (style_obj) => {
  Object.keys(style_obj).forEach((key) => {
    !style_obj[key] && delete style_obj[key];
  });
  return JSON.stringify(style_obj).replaceAll('"', '').replaceAll(',', ';').replaceAll('{', '').replaceAll('}', '');
};
