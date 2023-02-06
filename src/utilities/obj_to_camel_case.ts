const to_camel_case = (obj) => {
  var newObj = {};
  Object.keys(obj).forEach(function (key) {
    var newKey = key.replace(/(_\w)/g, function (m) {
      return m[1].toUpperCase();
    });
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        newObj[newKey] = to_camel_case(obj[key]);
      } else {
        newObj[newKey] = obj[key];
      }
    }
  });
  return newObj;
};

export default to_camel_case;
