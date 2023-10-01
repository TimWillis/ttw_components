const to_snake_case = (obj) => {
  var newObj = {};
  Object.keys(obj).forEach(function (key) {
    var newKey = key.replace(/([A-Z])/g, function ($1) {
      return '_' + $1.toLowerCase();
    });
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        newObj[newKey] = to_snake_case(obj[key]);
      } else {
        newObj[newKey] = obj[key];
      }
    }
  });
  return newObj;
};

export default to_snake_case;
