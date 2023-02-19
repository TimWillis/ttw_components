export default () => {
  return `        
        /*******************************
         Flex Layout
        *******************************/
        .layout.horizontal,
        .layout.vertical {
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
        }

        .layout.inline {
            display: -ms-inline-flexbox;
            display: -webkit-inline-flex;
            display: inline-flex;
        }

        .layout.horizontal {
            -ms-flex-direction: row;
            -webkit-flex-direction: row;
            flex-direction: row;
        }
        .layout.horizontal.start-justified{
            text-align: left;
        }

        .layout.vertical {
            -ms-flex-direction: column;
            -webkit-flex-direction: column;
            flex-direction: column;
        }
        .layout.vertical.start{
            text-align: left;
        }

        .layout.wrap {
            -ms-flex-wrap: wrap;
            -webkit-flex-wrap: wrap;
            flex-wrap: wrap;
        }

        .layout.center,
        .layout.center-center {
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
        }

        .layout.center-justified,
        .layout.center-center {
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
        }

        .flex {
            -ms-flex: 1 1 0.000000001px;
            -webkit-flex: 1;
            flex: 1;
            -webkit-flex-basis: 0.000000001px;
            flex-basis: 0.000000001px;
        }

        .flex-auto {
            -ms-flex: 1 1 auto;
            -webkit-flex: 1 1 auto;
            flex: 1 1 auto;
        }

        .flex-none {
            -ms-flex: none;
            -webkit-flex: none;
            flex: none;
        }

        .layout.horizontal-reverse,
        .layout.vertical-reverse {
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
        }

        .layout.horizontal-reverse {
            -ms-flex-direction: row-reverse;
            -webkit-flex-direction: row-reverse;
            flex-direction: row-reverse;
        }

        .layout.vertical-reverse {
            -ms-flex-direction: column-reverse;
            -webkit-flex-direction: column-reverse;
            flex-direction: column-reverse;
        }

        .layout.wrap-reverse {
            -ms-flex-wrap: wrap-reverse;
            -webkit-flex-wrap: wrap-reverse;
            flex-wrap: wrap-reverse;
        }

        /**
        * Alignment in cross axis.
        */
        .layout.start {
            -ms-flex-align: start;
            -webkit-align-items: flex-start;
            align-items: flex-start;
        }

        .layout.center,
        .layout.center-center {
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
        }

        .layout.end {
            -ms-flex-align: end;
            -webkit-align-items: flex-end;
            align-items: flex-end;
        }

        .layout.baseline {
            -ms-flex-align: baseline;
            -webkit-align-items: baseline;
            align-items: baseline;
        }
        /**
        * Alignment in main axis.
        */
        .layout.start-justified {
            -ms-flex-pack: start;
            -webkit-justify-content: flex-start;
            justify-content: flex-start;
        }

        .layout.center-justified,
        .layout.center-center {
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
        }

        .layout.end-justified {
            -ms-flex-pack: end;
            -webkit-justify-content: flex-end;
            justify-content: flex-end;
        }

        .layout.around-justified {
            -ms-flex-pack: distribute;
            -webkit-justify-content: space-around;
            justify-content: space-around;
        }

        .layout.justified {
            -ms-flex-pack: justify;
            -webkit-justify-content: space-between;
            justify-content: space-between;
        }
        /**
        * Self alignment.
        */
        .self-start {
            -ms-align-self: flex-start;
            -webkit-align-self: flex-start;
            align-self: flex-start;
        }

        .self-center {
            -ms-align-self: center;
            -webkit-align-self: center;
            align-self: center;
        }

        .self-end {
            -ms-align-self: flex-end;
            -webkit-align-self: flex-end;
            align-self: flex-end;
        }

        .self-stretch {
            -ms-align-self: stretch;
            -webkit-align-self: stretch;
            align-self: stretch;
        }

        .self-baseline {
            -ms-align-self: baseline;
            -webkit-align-self: baseline;
            align-self: baseline;
        }

        ;
        /**
        * multi-line alignment in main axis.
        */
        .layout.start-aligned {
            -ms-flex-line-pack: start; /* IE10 */
            -ms-align-content: flex-start;
            -webkit-align-content: flex-start;
            align-content: flex-start;
        }

        .layout.end-aligned {
            -ms-flex-line-pack: end; /* IE10 */
            -ms-align-content: flex-end;
            -webkit-align-content: flex-end;
            align-content: flex-end;
        }

        .layout.center-aligned {
            -ms-flex-line-pack: center; /* IE10 */
            -ms-align-content: center;
            -webkit-align-content: center;
            align-content: center;
        }

        .layout.between-aligned {
            -ms-flex-line-pack: justify; /* IE10 */
            -ms-align-content: space-between;
            -webkit-align-content: space-between;
            align-content: space-between;
        }

        .layout.around-aligned {
            -ms-flex-line-pack: distribute; /* IE10 */
            -ms-align-content: space-around;
            -webkit-align-content: space-around;
            align-content: space-around;
        }

        .flex,
        .flex-1 {
            -ms-flex: 1 1 0.000000001px;
            -webkit-flex: 1;
            flex: 1;
            -webkit-flex-basis: 0.000000001px;
            flex-basis: 0.000000001px;
        }

        .flex-2 {
            -ms-flex: 2;
            -webkit-flex: 2;
            flex: 2;
        }

        .flex-3 {
            -ms-flex: 3;
            -webkit-flex: 3;
            flex: 3;
        }

        .flex-4 {
            -ms-flex: 4;
            -webkit-flex: 4;
            flex: 4;
        }

        .flex-5 {
            -ms-flex: 5;
            -webkit-flex: 5;
            flex: 5;
        }

        .flex-6 {
            -ms-flex: 6;
            -webkit-flex: 6;
            flex: 6;
        }

        .flex-7 {
            -ms-flex: 7;
            -webkit-flex: 7;
            flex: 7;
        }

        .flex-8 {
            -ms-flex: 8;
            -webkit-flex: 8;
            flex: 8;
        }

        .flex-9 {
            -ms-flex: 9;
            -webkit-flex: 9;
            flex: 9;
        }

        .flex-10 {
            -ms-flex: 10;
            -webkit-flex: 10;
            flex: 10;
        }

        .flex-11 {
            -ms-flex: 11;
            -webkit-flex: 11;
            flex: 11;
        }

        .flex-12 {
            -ms-flex: 12;
            -webkit-flex: 12;
            flex: 12;
        }

        .block {
            display: block;
        }
        /* IE 10 support for HTML5 hidden attr */
        [hidden] {
            display: none !important;
        }

        .invisible {
            visibility: hidden !important;
        }

        .relative {
            position: relative;
        }

        .fit {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }



        body.fullbleed {
            margin: 0;
            height: 100vh;
        }

        .scroll {
            -webkit-overflow-scrolling: touch;
            overflow: auto;
        }
        /* fixed position */
        .fixed-bottom,
        .fixed-left,
        .fixed-right,
        .fixed-top {
            position: fixed;
        }

        .fixed-top {
            top: 0;
            left: 0;
            right: 0;
        }

        .fixed-right {
            top: 0;
            right: 0;
            bottom: 0;
        }

        .fixed-bottom {
            right: 0;
            bottom: 0;
            left: 0;
        }

        .fixed-left {
            top: 0;
            bottom: 0;
            left: 0;
        }
        /*******************************
        Other Layout
        *******************************/

        .spacer_1 {
            width: 1em;
        }

        .spacer_2 {
            width: 2em;
        }
        .spacer_5 {
            width: 5em;
        }
        .spacer_10 {
            width: 10em; 
        }
        .spacer_25 {
            width: 25%;
        }
        .spacer_h_5 {
            height: 5em;
        }
        .spacer_h_2 {
            height: 2em;
        }

        .loading{
            font-size: 3em;
        }

        .hidden{
            display: none!important;
        }
        .start_hidden{
            display: none;
        }
        .resizable {
            resize: both;
            max-height: 100%;
            max-width: 100%;
            overflow: auto;
        }
        .resizable-h {
            resize: horizontal;
            max-width: 100%;
            overflow: auto;
        }
        .resizable-v {
            resize: vertical;
            max-height: 100%;
            overflow: auto;
        }

        .width_100{
            width: 100px;
        }
        .width_150{
            width: 150px;
        }
        .width_200{
            width: 200px;
        }
        .width_250{
            width: 250px;
        }
        .width_400{
            width: 400px;
        }
        .width_600{
            width: 600px;
        }

    `;
};
