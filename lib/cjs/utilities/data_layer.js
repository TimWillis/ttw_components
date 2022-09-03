"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const idb_keyvalue = __importStar(require("./idb_keyvalue"));
exports.default = (root_path = '') => {
    const one_day = 24 * 60 * 60 * 1000;
    const get_rest = (path) => {
        return fetch(root_path + path, {
            method: 'get',
        })
            .then((response) => {
            debugger;
            let res;
            try {
                res = response.json();
            }
            catch (e) {
                res = response;
            }
            return res;
        })
            .then((data) => {
            return { data: data, last_fetch: Date.now() };
        })
            .catch(function (err) {
            console.log('Data not fetched!', err, path);
        });
    };
    const get_idb = (path) => {
        return idb_keyvalue.get(path).then((val) => {
            if (val) {
                val.data = val.data ? val.data : val;
                val.last_fetch = val.last_fetch ? val.last_fetch : Date.now();
            }
            return val; // && JSON.parse(val);
        });
    };
    const update_data = (path) => __awaiter(void 0, void 0, void 0, function* () {
        const new_data = yield get_rest(path);
        set_idb(path, new_data);
    });
    const get = (path, from_last_update = Date.now() - one_day, type = 'both') => __awaiter(void 0, void 0, void 0, function* () {
        let data = yield get_idb(path);
        if (!data && type !== 'idb') {
            data = yield get_rest(path);
            set_idb(path, data);
        }
        else if (type === 'rest') {
            const new_data = yield get_rest(path);
            data = new_data || data;
            set_idb(path, data);
        }
        else if (type !== 'idb') {
            update_data(path);
        }
        // if ((!data || data.last_fetch < from_last_update) && !idb_only) {
        //   const new_data = await get_rest(path);
        //   data = new_data || data;
        //   set_idb(path, data);
        // } else if (!idb_only) {
        //   get_rest(path).then((new_data) => {
        //     set_idb(path, new_data);
        //   });
        // }
        return (data && data.data) || data;
    });
    const set_idb = (path, data) => {
        return idb_keyvalue
            .set(path, data)
            .then(() => {
            console.log('Data saved!');
        })
            .catch(function (err) {
            console.log('Data not saved!', err, path);
        });
    };
    const post_rest = (path, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield yield fetch(root_path + path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        }).catch(function (err) {
            console.log('Data not posted!', err, path);
        });
    });
    const post = (path, data) => __awaiter(void 0, void 0, void 0, function* () {
        const post_data = { data: data, last_fetch: Date.now() };
        return yield set_idb(path, post_data);
    });
    const put = (path, data) => __awaiter(void 0, void 0, void 0, function* () {
        const post_data = { data: data, last_fetch: Date.now() };
        return yield set_idb(path, post_data);
    });
    const del = (path, is_archived = false) => __awaiter(void 0, void 0, void 0, function* () {
        if (is_archived) {
            const data = yield get(path);
            data.is_archived = true;
            const post_data = { data: data, last_fetch: Date.now() };
            return yield set_idb(path, post_data);
        }
        else {
            return yield set_idb(path, null);
        }
    });
    // const archive = async (path, is_archived) => {
    //     data.last_updated = Date.now();
    //     return await set_idb(path, null);
    // };
    return { get, post, put, del, post_rest };
};
// let root_path = 'https://testautomationapidev.azurewebsites.net/api/';
/*
Model List
https://testautomationapitest.azurewebsites.net/api/TestGen/GetAutomationModelList



Definition fields for model
https://testautomationapitest.azurewebsites.net/api/TestGen/GetModelFieldsById?id={guid}
*/
//# sourceMappingURL=data_layer.js.map