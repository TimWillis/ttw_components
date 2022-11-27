export default (callback, element_id, type, root = document) => {
  root.getElementById(element_id)?.removeEventListener(type, callback);

  root.getElementById(element_id)?.addEventListener(type, callback);
};
