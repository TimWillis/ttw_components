import unique_id from '../utilities/unique_id';

export default (
  on_text: string,
  off_text: string,
  on_color: string,
  off_color: string,
  callback?: (isActive: boolean) => void,
  root: ShadowRoot | Document = document,
  is_active: boolean = false,
): string => {
  //   let is_active = false;
  const container_id = `toggle-container-${unique_id(6)}`;
  const button_id = `toggle-button-${unique_id(6)}`;
  const container = document.createElement('div');
  container.id = container_id;

  const toggle = () => {
    is_active = !is_active;
    update_button();
    if (callback) {
      callback(is_active);
    }
  };

  const update_button = () => {
    const text = is_active ? on_text : off_text;
    const color = is_active ? on_color : off_color;
    const button = root.getElementById(button_id) as HTMLButtonElement;
    button.style.backgroundColor = color;
    button.textContent = text;
  };

  const render = () => {
    const text = is_active ? on_text : off_text;
    const color = is_active ? on_color : off_color;
    container.innerHTML = `
        <div>
          <button id="${button_id}" style="background-color: ${color}" onClick="toggle()">
            ${text}
          </button>
        </div>
      `;
  };

  // Bind toggle as a global function
  (window as any).toggle = toggle;

  render();
  return container.outerHTML;
};
