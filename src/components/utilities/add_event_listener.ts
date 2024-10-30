export default (callback, element_id, type, root = document, query?) => {
  const element = query ? root.querySelector(query) : root.getElementById(element_id);
  element?.removeEventListener(type, callback);

  element?.addEventListener(type, callback);
};
