export const fadeInAnimation = (speed: string = '500ms') => /*css*/ `
    opacity: 0; /* make things invisible upon start */
    animation: fadeIn ease-in 1;
    animation-fill-mode: forwards;
    animation-duration: ${speed};
`;

export const fadeOutAnimation = (speed: string = '500ms') => /*css*/ `
    opacity: 1; /* make things visible upon start */
    animation: fadeOut ease-in 1;
    animation-fill-mode: forwards;
    animation-duration: ${speed};
`;

export default (speed_out: string = '300ms', speed_in = '300ms') => {
  return /*css*/ `
        @keyframes fadeIn {
                from {
                        z-index: 99999;
                        opacity: 0;
                }

                to {
                        opacity: 1;
                }
        }
        @keyframes fadeOut {
                from {
                        opacity: 1;
                }

                to {
                        opacity: 0;
                        z-index: -1;
                }
        }

        .fade_in {
                ${fadeInAnimation(speed_in)}
        }

        .fade_out {
                ${fadeOutAnimation(speed_out)}
        }
    `;
};
