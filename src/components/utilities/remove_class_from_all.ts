export default (class_name: string): void => {
  const elements = document.querySelectorAll(`.${class_name}`);
  elements.forEach((element) => element.classList.remove(class_name));
};
