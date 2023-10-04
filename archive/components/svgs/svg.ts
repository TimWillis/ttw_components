const html = (path, color) => {
  return /*html*/ `    
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" style="pointer-events: none; display: inline-block; width: 2em; height: 2em;fill:${color}; ">
            <g>
                <path d="${path}">
                </path>
            </g>
        </svg>`;
};

export default () => {
  return {
    init: () => {},
    html: html,
  };
};
