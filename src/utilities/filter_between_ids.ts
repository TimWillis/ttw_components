export default (list, ids) => {
  var filteredList = [];
  var firstIndex = 0;
  var lastIndex = 0;
  for (var i = 0; i < list.length; i++) {
    if (ids.indexOf(list[i].id) > -1) {
      filteredList.push(list[i]);
      if (firstIndex === 0) {
        firstIndex = i;
      }
      lastIndex = i;
    }
  }
  return list.slice(firstIndex, lastIndex + 1);
};
