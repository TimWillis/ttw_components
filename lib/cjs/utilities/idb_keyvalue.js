"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.keys = exports.clear = exports.del = exports.set = exports.get = exports.Store = void 0;
class Store {
    constructor(dbName = 'keyval-store', storeName = 'keyval') {
        this.storeName = storeName;
        this._dbp = new Promise((resolve, reject) => {
            const openreq = indexedDB.open(dbName, 1);
            openreq.onerror = () => reject(openreq.error);
            openreq.onsuccess = () => resolve(openreq.result);
            // First time setup: create an empty object store
            openreq.onupgradeneeded = () => {
                openreq.result.createObjectStore(storeName);
            };
        });
    }
    _withIDBStore(type, callback) {
        return this._dbp.then((db) => new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, type);
            transaction.oncomplete = () => resolve();
            transaction.onabort = transaction.onerror = () => reject(transaction.error);
            callback(transaction.objectStore(this.storeName));
        }));
    }
}
exports.Store = Store;
let store;
function getDefaultStore() {
    if (!store)
        store = new Store();
    return store;
}
function get(key, store = getDefaultStore()) {
    let req;
    return store
        ._withIDBStore('readonly', (store) => {
        req = store.get(key);
    })
        .then(() => req.result);
}
exports.get = get;
function set(key, value, store = getDefaultStore()) {
    return store._withIDBStore('readwrite', (store) => {
        store.put(value, key);
    });
}
exports.set = set;
function del(key, store = getDefaultStore()) {
    return store._withIDBStore('readwrite', (store) => {
        store.delete(key);
    });
}
exports.del = del;
function clear(store = getDefaultStore()) {
    return store._withIDBStore('readwrite', (store) => {
        store.clear();
    });
}
exports.clear = clear;
function keys(store = getDefaultStore()) {
    const keys = [];
    return store
        ._withIDBStore('readonly', (store) => {
        // This would be store.getAllKeys(), but it isn't supported by Edge or Safari.
        // And openKeyCursor isn't supported by Safari.
        (store.openKeyCursor || store.openCursor).call(store).onsuccess = function () {
            if (!this.result)
                return;
            keys.push(this.result.key);
            this.result.continue();
        };
    })
        .then(() => keys);
}
exports.keys = keys;
//# sourceMappingURL=idb_keyvalue.js.map