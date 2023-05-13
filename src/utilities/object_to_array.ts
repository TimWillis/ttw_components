export default (obj) => {
  const result = [];

  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      result.push({
        id: prop,
        ...obj[prop],
      });
    }
  }

  return result;
};
