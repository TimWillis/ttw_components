export default (content, el, id) => {
  const newDiv = document.createElement('div');
  newDiv.innerHTML = content;
  newDiv.id = id;
  el.appendChild(newDiv);
  return newDiv;
};
