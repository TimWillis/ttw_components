/*https://codepen.io/WebDEasy/pen/YoVmBx*/

import  dom_diffing  from '../utilities/dom_diffing';

export interface this_interface {
  callback?: (e: any, value: string) => void;
  id?: string;
  html: string;
  style?: string;
  is_disabled?: boolean;
}

export default ({ callback, id = 'wysiwyg' + Date.now(), is_disabled = false, html, style }: this_interface) => {
  // const new_id = "select" + Date.now()
  // id = id ? id : new_id;

  let editor, toolbar, buttons, contentArea, visuellView, htmlView, modal;
  setTimeout(() => {
    // define vars
    editor = document.querySelector(`#${id}_editor`);
    toolbar = editor.getElementsByClassName('toolbar')[0];
    buttons = toolbar.querySelectorAll('.btn:not(.has-submenu)');
    contentArea = editor.getElementsByClassName('content-area')[0];
    visuellView = contentArea.getElementsByClassName('visuell-view')[0];
    htmlView = contentArea.getElementsByClassName('html-view')[0];
    modal = document.getElementsByClassName('modal')[0];

    // add active tag event
    document.addEventListener('selectionchange', selectionChange);

    // add toolbar button actions
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];

      button.addEventListener('click', function (e) {
        let action = this.dataset.action;
        if (!is_disabled) {
          switch (action) {
            case 'code':
              execCodeAction(this, editor);
              break;
            case 'createLink':
              execLinkAction();
              break;
            default:
              execDefaultAction(action);
          }
        }
      });
    }
    callback && start_observer();
  }, 100);

  // this function toggles between visual and html view
  function execCodeAction(button, editor) {
    if (button.classList.contains('active')) {
      // show visuell view
      dom_diffing('', htmlView['value'], 'div', visuellView);
      // visuellView.innerHTML = htmlView["value"];
      htmlView['style'].display = 'none';
      visuellView['style'].display = 'block';

      button.classList.remove('active');
    } else {
      // show html view
      htmlView['innerText'] = visuellView.innerHTML;
      visuellView['style'].display = 'none';
      htmlView['style'].display = 'block';

      button.classList.add('active');
    }
  }

  // add link action
  function execLinkAction() {
    modal['style'].display = 'block';
    let selection = saveSelection();

    let submit = modal.querySelectorAll('button.done')[0];
    let close = modal.querySelectorAll('.close')[0];

    // done button active => add link
    submit.addEventListener('click', function () {
      let newTabCheckbox = modal.querySelectorAll('#new-tab')[0];
      let linkInput = modal.querySelectorAll('#linkValue')[0];
      let linkValue = linkInput['value'];
      let newTab = newTabCheckbox['checked'];

      restoreSelection(selection);

      if (window.getSelection().toString()) {
        let a = document.createElement('a');
        a.href = linkValue;
        if (newTab) a.target = '_blank';
        window.getSelection().getRangeAt(0).surroundContents(a);
      }

      modal['style'].display = 'none';
      linkInput['value'] = '';
      const callee = (e) => {
        arguments.callee(e);
      };

      // deregister modal events
      submit.removeEventListener('click', callee);
      close.removeEventListener('click', callee);
    });

    // close modal on X click
    close.addEventListener('click', function () {
      let linkInput = modal.querySelectorAll('#linkValue')[0];

      modal['style'].display = 'none';
      linkInput['value'] = '';
      const callee = (e) => {
        arguments.callee(e);
      };
      // deregister modal events
      submit.removeEventListener('click', callee);
      close.removeEventListener('click', callee);
    });
  }

  // executes normal actions
  function execDefaultAction(action) {
    document.execCommand(action, false);
  }

  // saves the current selection
  function saveSelection() {
    if (window.getSelection) {
      var sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        let ranges = [];
        for (var i = 0, len = sel.rangeCount; i < len; ++i) {
          ranges.push(sel.getRangeAt(i));
        }
        return ranges;
      }
    } else if (document['selection'] && document['selection'].createRange) {
      return document['selection'].createRange();
    }
    return null;
  }

  // loads a saved selection
  function restoreSelection(savedSel) {
    if (savedSel) {
      if (window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
        for (var i = 0, len = savedSel.length; i < len; ++i) {
          sel.addRange(savedSel[i]);
        }
      } else if (document['selection'] && savedSel.select) {
        savedSel.select();
      }
    }
  }

  // sets the current format buttons active/inactive
  function selectionChange() {
    for (let i = 0; i < buttons.length; i++) {
      let button = buttons[i];
      button.classList.remove('active');
    }

    parentTagActive(window.getSelection().anchorNode?.parentNode);
  }

  function parentTagActive(elem) {
    // if (elem.classList.contains('visuell-view')) return false;
    if (
      !(
        (elem && elem?.closest && elem?.closest('.editor')) == false ||
        !elem?.tagName ||
        elem?.classList?.contains('visuell-view')
      )
    )
      return false;

    let toolbarButton;

    // active by tag names
    let tagName = elem?.tagName?.toLowerCase();
    toolbarButton = document.querySelectorAll(`.toolbar .btn[data-tag-name="${tagName}"]`)[0];
    if (toolbarButton) {
      toolbarButton.classList.add('active');
    }

    // active by text-align
    let textAlign = elem && elem['style']?.textAlign;
    toolbarButton = document.querySelectorAll(`.toolbar .btn[data-style="textAlign:${textAlign}"]`)[0];
    if (toolbarButton) {
      toolbarButton.classList.add('active');
    }

    return parentTagActive(elem?.parentNode);
  }

  const start_observer = () => {
    const content = document.getElementById(id);

    // create a new instance of `MutationObserver` named `observer`,
    // passing it a callback function

    let debouncer = setTimeout(() => {}, 0);
    const observer = new MutationObserver((e) => {
      clearTimeout(debouncer);
      debouncer = setTimeout(() => {
        callback(content, content.innerHTML);
      }, 500);
    });

    // call `observe()` on that MutationObserver instance,
    // passing it the element to observe, and the options object
    observer.observe(content, {
      subtree: true,
      childList: true,
      characterData: true,
    });
  };

  const css = /*css*/ `<style>
        #${id}{
            
        }
        .editor {
            min-height: 200px;
            background-color: white;
          }
          .editor .toolbar {
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          }
          .editor .toolbar .line {
            display: flex;
            border-bottom: 1px solid #e2e2e2;
          }
          .editor .toolbar .line:last-child {
            border-bottom: none;
          }
          .editor .toolbar .line .box {
            display: flex;
            border-left: 1px solid #e2e2e2;
          }
          .editor .toolbar .line .box .btn {
            display: block;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            transition: 0.2s ease all;
          }
          .editor .toolbar .line .box .btn:hover, .editor .toolbar .line .box .btn.active {
            background-color: #e1e1e1;
            cursor: pointer;
          }
          .editor .toolbar .line .box .btn.icon img {
            width: 15px;
            padding: 10px;
          }
          .editor .toolbar .line .box .btn.icon.smaller img {
            width: 12px;
          }
          .editor .toolbar .line .box .btn.has-submenu {
            width: 20px;
            padding: 0 10px;
          }
          .editor .toolbar .line .box .btn.has-submenu::after {
            content: "";
            width: 6px;
            height: 6px;
            position: absolute;
            background-image: url(https://image.flaticon.com/icons/svg/25/25243.svg);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            right: 4px;
          }
          .editor .toolbar .line .box .btn.has-submenu .submenu {
            display: none;
            position: absolute;
            top: 36px;
            left: -1px;
            z-index: 10;
            background-color: #FFF;
            border: 1px solid #b5b5b5;
            border-top: none;
          }
          .editor .toolbar .line .box .btn.has-submenu .submenu .btn {
            width: 39px;
          }
          .editor .toolbar .line .box .btn.has-submenu .submenu:hover {
            display: block;
          }
          .editor .toolbar .line .box .btn.has-submenu:hover .submenu {
            display: block;
          }
          .editor .content-area {
            padding: 5px 2px;
            line-height: 1.5;
          }
          .editor .content-area .visuell-view {
            outline: none;
            word-break: break-word;
          }
          .editor .content-area .visuell-view p {
            margin: 12px 0;
          }
          .editor .content-area .html-view {
            outline: none;
            display: none;
            width: 100%;
            height: 200px;
            border: none;
            resize: none;
          }
          
          /* Modal */
          .modal {
            z-index: 40;
            display: none;
          }
          .modal .modal-wrapper {
            background-color: #FFF;
            padding: 1rem;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20rem;
            min-height: 10rem;
            z-index: 41;
          }
          .modal .modal-wrapper .close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            cursor: pointer;
          }
          .modal .modal-wrapper .modal-content {
            flex-direction: column;
          }
          .modal .modal-wrapper .modal-content h3 {
            margin-top: 0;
          }
          .modal .modal-wrapper .modal-content input {
            margin: 1rem 0;
            padding: 0.5rem;
          }
          .modal .modal-wrapper .modal-content input[type=text] {
            width: calc(100% - 1rem);
          }
          .modal .modal-wrapper .modal-content .row label {
            margin-left: 0.5rem;
          }
          .modal .modal-wrapper .modal-content button {
            background-color: #D2434F;
            border: 0;
            color: #FFF;
            padding: 0.5rem 1.2rem;
            cursor: pointer;
          }
          .modal .modal-bg {
            position: fixed;
            background-color: rgba(0, 0, 0, 0.3);
            width: 100vw;
            height: 100vh;
            top: 0;
            left: 0;
          }

          .disabled{
            background-color: var(--base_1); 
            cursor: 
          }
          .disabled .editor .toolbar .line .box .btn:hover, .editor .toolbar .line .box .btn {
            cursor: default !important;
          }
    </style>`;
  return /*html*/ `
    ${css}
        <div class="layout vertical editor ${is_disabled ? 'disabled' : ''}" id="${id}_editor" >
          <div class="toolbar">
              <div class="line">
              
              <div class="box">
                  <span class="btn icon smaller" data-action="bold" data-tag-name="b" title="Bold">
                  <img src="/resources/wysiwyg/bold.png">
                  </span>
                  <span class="btn icon smaller" data-action="italic" data-tag-name="i" title="Italic">
                  <img src="/resources/wysiwyg/italic.png">
                  </span>
                  <span class="btn icon smaller" data-action="underline" data-tag-name="u" title="Underline">
                  <img src="/resources/wysiwyg/underline.png">
                  </span>
                  <span class="btn icon smaller" data-action="strikeThrough" data-tag-name="strike" title="Strike through">
                  <img src="/resources/wysiwyg/strike.png">
                  </span>
              </div>
              
              <div class="box">
                  <span class="btn icon has-submenu">
                  <img src="/resources/wysiwyg/left.png">
                  <div class="submenu">
                      <span class="btn icon" data-action="justifyLeft" data-style="textAlign:left" title="Justify left">
                      <img src="/resources/wysiwyg/left.png">  
                      </span>
                      <span class="btn icon" data-action="justifyCenter" data-style="textAlign:center" title="Justify center">
                      <img src="/resources/wysiwyg/center.png">  
                      </span>
                      <span class="btn icon" data-action="justifyRight" data-style="textAlign:right" title="Justify right">
                      <img src="/resources/wysiwyg/right.png">  
                      </span>
                      <span class="btn icon" data-action="formatBlock" data-style="textAlign:justify" title="Justify block">
                      <img src="/resources/wysiwyg/justify.png">  
                      </span>
                  </div>
                  </span>
                  <span class="btn icon" data-action="insertOrderedList" data-tag-name="ol" title="Insert ordered list">
                  <img src="/resources/wysiwyg/ordered_list.png">  
                  </span>
                  <span class="btn icon" data-action="insertUnorderedList" data-tag-name="ul" title="Insert unordered list">
                  <img src="/resources/wysiwyg/unordered_list.png">  
                  </span>
                  <span class="btn icon" data-action="outdent" title="Outdent">
                  <img src="/resources/wysiwyg/outdent.png">  
                  </span>
                  <span class="btn icon" data-action="indent" title="Indent">
                  <img src="/resources/wysiwyg/indent.png">  
                  </span>
                  
              </div>
              <div class="box">
                  <span class="btn icon" data-action="insertHorizontalRule" title="Insert horizontal rule">
                  <img src="/resources/wysiwyg/rule.png">  
                  </span>
              </div>
              
              </div>
              <div class="line">
              
              <div class="box">
                  <span class="btn icon smaller" data-action="undo" title="Undo">
                  <img src="/resources/wysiwyg/undo.png">
                  </span>
                  <span class="btn icon" data-action="removeFormat" title="Remove format">
                  <img src="/resources/wysiwyg/remove.png">  
                  </span>
              </div>
              
              <div class="box">
                  <span class="btn icon smaller" data-action="createLink" title="Insert Link">
                  <img src="/resources/wysiwyg/link.png">
                  </span>
                  <span class="btn icon smaller" data-action="unlink" data-tag-name="a" title="Unlink">
                  <img src="/resources/wysiwyg/unlink.png">
                  </span>
              </div>
              
              <div class="box">
                  <span class="btn icon" data-action="code" title="Show HTML-Code">
                  <img src="/resources/wysiwyg/html.png">
                  </span>
              </div>
              
              </div>
          </div>
          <div class="layout vertical content-area flex">
              <div id="${id}" class="flex visuell-view " ${is_disabled ? '' : 'contenteditable'} >
                ${html}
              </div>
              <textarea class="html-view"></textarea>
          </div>
          </div>

          <div class="modal">
          <div class="modal-bg"></div>
          <div class="modal-wrapper">
              <div class="close">✖</div>
              <div class="modal-content" id="modalCreateLink">
              <h3>Insert Link</h3>
              <input type="text" id="linkValue" placeholder="Link (example: https://webdeasy.de/)">
              <div class="row">
                  <input type="checkbox" id="new-tab">
                  <label for="new-tab">Open in new Tab?</label>
              </div>
              <button class="done">Done</button>
              </div>
          </div>
    </div>
    
    `;
};
