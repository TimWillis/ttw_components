/*https://codepen.io/WebDEasy/pen/YoVmBx*/

import dom_diffing from '../utilities/dom_diffing';
import svg from './svg';

interface feature {
  name: string;
  action: (e: any) => void;
}

export interface this_interface {
  callback?: (e: any, value: string) => void;
  id?: string;
  html: string;
  is_disabled?: boolean;
  hidden_features?: string[];
  custom_features?: feature[];
  style?: any;
  base_url?: string;
  name_space?: string;
}

export default ({
  callback,
  id = 'wysiwyg' + Date.now(),
  html,
  is_disabled = false,
  hidden_features = [],
  custom_features = [],
  style,
  base_url = '/resources',
  name_space = '_ttw',
}: this_interface) => {
  // const new_id = "select" + Date.now()
  // id = id ? id : new_id;

  let editor, toolbar, buttons, contentArea, visuellView, htmlView, modal;
  const init = () => {
    // define vars
    editor = document.querySelector(`#${id}_editor`);
    if (editor) {
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
          let value = this.dataset.value;
          if (!is_disabled) {
            switch (action) {
              case 'code':
                execCodeAction(this, editor);
                break;
              case 'createLink':
                execLinkAction();
                break;
              default:
                execDefaultAction(action, value);
            }
          }
        });
      }
      callback && start_observer();
    } else if (document.querySelector('div')) {
      setTimeout(init, 50);
    }
  };

  typeof window !== 'undefined' && setTimeout(init, 100);

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
  //*https://stackoverflow.com/questions/60581285/execcommand-is-now-obsolete-whats-the-alternative
  function execDefaultAction(action, value = null) {
    document.execCommand(action, false, value);
  }

  // const execDefaultAction2 = (action) => {
  //     const selection = window.getSelection();
  //     if (!selection.rangeCount) return;

  //     const range = selection.getRangeAt(0);
  //     const selectedText = range.cloneContents();

  //     const boldElement = document.createElement('b');
  //     boldElement.appendChild(selectedText);

  //     range.deleteContents();
  //     range.insertNode(boldElement);
  // };

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
      if (button.dataset.action !== 'code' && button.dataset.action !== 'createLink') {
        button.classList.remove('active');
      }
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
    ) {
      return false;
    }
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

    return (elem && parentTagActive(elem?.parentNode)) || false;
  }

  const start_observer = () => {
    const content = document.getElementById(id);
    const blur_call = () => {
      callback(content, content.innerHTML);
    };

    // create a new instance of `MutationObserver` named `observer`,
    // passing it a callback function

    let debouncer = setTimeout(() => {}, 0);
    const observer = new MutationObserver((e) => {
      if (!content.contains(document.activeElement)) {
        clearTimeout(debouncer);
        debouncer = setTimeout(() => {
          callback(content, content.innerHTML);
        }, 500);
      } else {
        content.removeEventListener('blur', blur_call);
        content.addEventListener('blur', blur_call);
      }
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
            min-height: ${style?.height ? style.height : '200px'};
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
          .editor .toolbar .line .box .submenu .btn.icon img {
            width: 15px;
            padding: 4px;
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
            background-image: url(/resources/wysiwyg/center.png);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
            right: 4px;
          }
          .editor .toolbar .line .box .btn.has-submenu .submenu {
            display: none;
            position: absolute;
            top: 34px;
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
            max-height: 200px;
            height: 100%;
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
          .editor button{
            padding: 5px 4px;
            margin: 2px 4px;
          }
    </style>`;

  const create_custom_features = (custom_features) => {
    let html = '';
    typeof window[name_space] === 'undefined' && (window[name_space] = {});
    custom_features.forEach((feature) => {
      const name = feature.name.replaceAll(' ', '_');
      window[name_space][name + '_button'] = feature.action;
      html += /*html*/ `
        <div class="box">
          <button class="btn" onclick="${name_space}.${name + '_button'}(event)" data-action="${feature.name}" >
            ${feature.name}
          </button>
        </div>`;
    });

    return html;
  };

  return /*html*/ `
    ${css}
    <div class="layout vertical editor ${is_disabled ? 'disabled' : ''}" id="${id}_editor" >
      <div class="toolbar">
        <div class="line layout horizontal wrap">
        <div class="box">
            <span ${
              hidden_features.includes('bold') ? 'hidden' : ''
            } class="btn icon smaller" data-action="bold" data-tag-name="b" title="Bold">
            <img src="/resources/wysiwyg/bold.png" title="Bold">
            </span>
            <span ${
              hidden_features.includes('italic') ? 'hidden' : ''
            } class="btn icon smaller" data-action="italic" data-tag-name="i" title="Italic">
            <img src="/resources/wysiwyg/italic.png" title="Italic">
            </span>
            <span ${
              hidden_features.includes('underline') ? 'hidden' : ''
            } class="btn icon smaller" data-action="underline" data-tag-name="u" title="Underline">
            <img src="/resources/wysiwyg/underline.png" title="Underline">
            </span>
            <span ${
              hidden_features.includes('strikeThrough') ? 'hidden' : ''
            } class="btn icon smaller" data-action="strikeThrough" data-tag-name="strike" title="Strike through">
            <img src="/resources/wysiwyg/strike.png" title="Strike through">
            </span>
        </div>
        <div class="box">
            <span ${hidden_features.includes('color') ? 'hidden' : ''} class="btn icon has-submenu">
              ${svg().html('M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z', 'red')}
              <div class="submenu">
                <span style=' ' class="btn icon" data-action="foreColor" data-value="red" data-style="textAlign:left" title="Justify left">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='20'%3E%3Crect width='30' height='20' fill='red'/%3E%3C/svg%3E">
                </span>
                <span style=' ' class="btn icon" data-action="foreColor" data-value="blue" data-style="textAlign:left" title="Justify left">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='20'%3E%3Crect width='30' height='20' fill='blue'/%3E%3C/svg%3E">
                </span>
                <span style=' ' class="btn icon" data-action="foreColor" data-value="yellow" data-style="textAlign:left" title="Justify left">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='20'%3E%3Crect width='30' height='20' fill='yellow'/%3E%3C/svg%3E">
                </span>
                <span style=' ' class="btn icon" data-action="foreColor" data-value="green" data-style="textAlign:left" title="Justify left">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='20'%3E%3Crect width='30' height='20' fill='green'/%3E%3C/svg%3E">
                </span>
                <span style=' ' class="btn icon" data-action="foreColor" data-value="purple" data-style="textAlign:left" title="Justify left">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='20'%3E%3Crect width='30' height='20' fill='purple'/%3E%3C/svg%3E">
                </span>
                <span style=' ' class="btn icon" data-action="foreColor" data-value="orange" data-style="textAlign:left" title="Justify left">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='20'%3E%3Crect width='30' height='20' fill='orange'/%3E%3C/svg%3E">
                </span>
                <span style=' ' class="btn icon" data-action="foreColor" data-value="black" data-style="textAlign:left" title="Justify left">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='20'%3E%3Crect width='30' height='20' fill='black'/%3E%3C/svg%3E">
                </span>
                <span style=' ' class="btn icon" data-action="foreColor" data-value="white" data-style="textAlign:left" title="Justify left">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='20'%3E%3Crect width='30' height='20' fill='white'/%3E%3C/svg%3E">
                </span>
              </div>
            </span>
          </div>
        
        <div class="box">
            <span ${hidden_features.includes('justify') ? 'hidden' : ''} class="btn icon has-submenu">
            <img src="/resources/wysiwyg/left.png" title="Justify">
            <div class="submenu">
                <span class="btn icon" data-action="justifyLeft" data-style="textAlign:left" title="Justify left">
                <img src="/resources/wysiwyg/left.png" title="Justify left">  
                </span>
                <span class="btn icon" data-action="justifyCenter" data-style="textAlign:center" title="Justify center">
                <img src="/resources/wysiwyg/center.png" title="Justify center">  
                </span>
                <span class="btn icon" data-action="justifyRight" data-style="textAlign:right" title="Justify right">
                <img src="/resources/wysiwyg/right.png" title="Justify right">  
                </span>
                <span class="btn icon" data-action="formatBlock" data-style="textAlign:justify" title="Justify block">
                <img src="/resources/wysiwyg/justify.png" title="Justify block">  
                </span>
            </div>
            </span>
            <span ${
              hidden_features.includes('ordered list') ? 'hidden' : ''
            } class="btn icon" data-action="insertOrderedList" data-tag-name="ol" title="Insert ordered list">
            <img src="/resources/wysiwyg/ordered_list.png" title="Insert ordered list">  
            </span>
            <span ${
              hidden_features.includes('unordered list') ? 'hidden' : ''
            } class="btn icon" data-action="insertUnorderedList" data-tag-name="ul" title="Insert unordered list">
            <img src="/resources/wysiwyg/unordered_list.png" title="Insert unordered list">  
            </span>
            <span ${
              hidden_features.includes('outdent') ? 'hidden' : ''
            } class="btn icon" data-action="outdent" title="Outdent">
            <img src="/resources/wysiwyg/outdent.png" title="Outdent">
            </span>
            <span ${
              hidden_features.includes('indent') ? 'hidden' : ''
            } class="btn icon" data-action="indent" title="Indent">
            <img src="/resources/wysiwyg/indent.png" title="Indent">
            </span>
            </div>
            <div class="box">
                <span ${
                  hidden_features.includes('horizontal rule') ? 'hidden' : ''
                } class="btn icon" data-action="insertHorizontalRule" title="Insert horizontal rule">
                <img src="/resources/wysiwyg/rule.png" title="Insert horizontal rule">  
                </span>
            </div>
            
            
            <div class="box">
                <span ${
                  hidden_features.includes('undo') ? 'hidden' : ''
                } class="btn icon smaller" data-action="undo" title="Undo">
                <img src="/resources/wysiwyg/undo.png" title="Undo">
                </span>
                <span ${
                  hidden_features.includes('remove format') ? 'hidden' : ''
                } class="btn icon" data-action="removeFormat" title="Remove format">
                <img src="/resources/wysiwyg/remove.png" title="Remove format">  
                </span>
            </div>
            <div class="box">
                  <span ${
                    hidden_features.includes('link') ? 'hidden' : ''
                  } class="btn icon smaller" data-action="createLink" title="Insert Link">
                  <img src="/resources/wysiwyg/link.png">
                  </span>
                  <span ${
                    hidden_features.includes('unlink') ? 'hidden' : ''
                  } class="btn icon smaller" data-action="unlink" data-tag-name="a" title="Unlink">
                  <img src="/resources/wysiwyg/unlink.png">
                  </span>
            </div>
              
            <div class="box">
                <span ${
                  hidden_features.includes('code') ? 'hidden' : ''
                } class="btn icon" data-action="code" title="Show HTML-Code">
                <img src="/resources/wysiwyg/html.png">
                </span>
            </div>
                ${create_custom_features(custom_features)}

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
