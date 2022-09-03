"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toJson(node) {
    const propFix = { for: 'htmlFor', class: 'className' };
    const specialGetters = {
        style: (node) => node.style.cssText,
    };
    const attrDefaultValues = { style: '' };
    const obj = {
        nodeType: node.nodeType,
    };
    if (node.tagName) {
        obj.tagName = node.tagName['toLowerCase']();
    }
    else if (node.nodeName) {
        obj.nodeName = node.nodeName;
    }
    if (node.nodeValue) {
        obj.nodeValue = node.nodeValue;
    }
    const attrs = node.attributes;
    if (attrs) {
        const defaultValues = new Map();
        for (let i = 0; i < attrs['length']; i++) {
            const name = attrs[i].nodeName;
            defaultValues.set(name, attrDefaultValues[name]);
        }
        // Add some special cases that might not be included by enumerating
        // attributes above. Note: this list is probably not exhaustive.
        switch (obj.tagName) {
            case 'input': {
                if (node.type === 'checkbox' || node.type === 'radio') {
                    defaultValues.set('checked', false);
                }
                else if (node.type !== 'file') {
                    // Don't store the value for a file input.
                    defaultValues.set('value', '');
                }
                break;
            }
            case 'option': {
                defaultValues.set('selected', false);
                break;
            }
            case 'textarea': {
                defaultValues.set('value', '');
                break;
            }
        }
        const arr = [];
        for (const [name, defaultValue] of defaultValues) {
            const propName = propFix[name] || name;
            const specialGetter = specialGetters[propName];
            const value = specialGetter ? specialGetter(node) : node[propName];
            if (value !== defaultValue) {
                arr.push([name, value]);
            }
        }
        if (arr.length) {
            obj.attributes = arr;
        }
    }
    const childNodes = node.childNodes;
    // Don't process children for a textarea since we used `value` above.
    if (obj.tagName !== 'textarea' && childNodes && childNodes.length) {
        const arr = (obj.childNodes = []);
        for (let i = 0; i < childNodes.length; i++) {
            arr[i] = toJson(childNodes[i]);
        }
    }
    return obj;
}
function toDom(input) {
    const obj = typeof input === 'string' ? JSON.parse(input) : input;
    const propFix = { for: 'htmlFor', class: 'className' };
    let node;
    const nodeType = obj.nodeType;
    switch (nodeType) {
        // ELEMENT_NODE
        case 1: {
            node = document.createElement(obj.tagName);
            if (obj.attributes) {
                for (const [attrName, value] of obj.attributes) {
                    const propName = propFix[attrName] || attrName;
                    // Note: this will throw if setting the value of an input[type=file]
                    node[propName] = value;
                }
            }
            break;
        }
        // TEXT_NODE
        case 3: {
            return document.createTextNode(obj.nodeValue);
        }
        // COMMENT_NODE
        case 8: {
            return document.createComment(obj.nodeValue);
        }
        // DOCUMENT_FRAGMENT_NODE
        case 11: {
            node = document.createDocumentFragment();
            break;
        }
        default: {
            // Default to an empty fragment node.
            return document.createDocumentFragment();
        }
    }
    if (obj.childNodes && obj.childNodes.length) {
        for (const childNode of obj.childNodes) {
            node.appendChild(toDom(childNode));
        }
    }
    return node;
}
exports.default = { toDom, toJson };
//# sourceMappingURL=dom_to_json.js.map