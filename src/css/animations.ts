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
    @mixin fadeIn($speed: 500ms) {
        opacity: 0; /* make things invisible upon start */
        animation: fadeIn ease-in 1;
        animation-fill-mode: forwards;
        animation-duration: $speed;
    }

    @mixin fadeOut($speed: 500ms) {
        opacity: 1; /* make things invisible upon start */
        animation: fadeOut ease-in 1;
        animation-fill-mode: forwards;
        animation-duration: $speed;
    }

    .fade_in {
        @include fadeIn(300ms);
    }

    .fade_out {
        @include fadeOut(300ms);
    }
`;
};
