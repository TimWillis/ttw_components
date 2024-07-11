export default () => {
  return `
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
    opacity: 0; /* make things invisible upon start */
    animation: fadeIn ease-in 1;
    animation-fill-mode: forwards;
    animation-duration: 300ms;
}

.fade_out {
    opacity: 1; /* make things invisible upon start */
    animation: fadeOut ease-in 1;
    animation-fill-mode: forwards;
    animation-duration: 300ms;
}

`;
};
