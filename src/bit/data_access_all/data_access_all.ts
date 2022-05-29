import { TTW } from './../../types/types.d';
import * as idbKeyval from '../idb_keyvalue/idb_keyvalue';
import memoize from '../memoize/memoize';
import serialize from '../serialize/serialize';
import unique_by from '../unique_by/unique_by';
import emitter from '../nn_events/nn_events';
/*
NOTE: For queries, 1st we check idb, send back the idb value, 
if it is milli -1 we get new value, 
if it isn't we get the idb value and sent it back, then based on milli we either get or don't get a new value from the api
*/

const data_access_idb = memoize((url: string) => {
  console.log('start: ', Date.now());
  return new Promise(function (resolve, reject) {
    idbKeyval.get(url).then(function (val) {
      console.log('idb: ', Date.now());
      resolve(val);
    });
  });
});

const check_idb = (url: string, query: any, milli_to_refresh: number) => {
  return new Promise((resolve, reject) => {
    idbKeyval.get(url + (query ? JSON.stringify(query) : '')).then((val: any) => {
      console.log('idb: ', Date.now());
      if (val && milli_to_refresh !== -1) {
        // void((typeof val === 'string') && val['idb'] = true);
        typeof val !== 'string' ? (val['idb'] = true) : null;
        resolve(val);
      }
      milli_to_refresh = milli_to_refresh ? milli_to_refresh : 0;
      if (!val || !val.time_stamp || val.time_stamp + milli_to_refresh < Date.now()) {
        resolve();
      }
    });
  });
};

interface save_to_idb_data {
  data: any;
  time_stamp: number;
  idb_version: string;
}
interface save_to_idb_args {
  value: save_to_idb_data;
  url: string;
}
const save_to_idb = ({ url, value }: save_to_idb_args) => {
  return new Promise((resolve, reject) => {
    idbKeyval
      .set(url, value)
      .then(() => {
        resolve('Data saved');
        console.log('Data saved!');
      })
      .catch((err: any) => {
        resolve('Data not saved');
        console.log('Data not saved!', err, url);
      });
  });
};

interface data_access_ajax_args {
  url: string;
  ajax_verb: string;
  with_credentials: boolean;
  form_data: any;
  milli_to_refresh: number;
  save_results_to_idb?: boolean;
  ttw: TTW;
}
const data_access_ajax = ({
  url,
  ajax_verb,
  with_credentials,
  form_data,
  milli_to_refresh,
  ttw,
  save_results_to_idb = false,
}: data_access_ajax_args) => {
  return new Promise((resolve, reject) => {
    const make_call = () => {
      let xmlHttp = new XMLHttpRequest();
      with_credentials ? (xmlHttp.withCredentials = true) : null;
      xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
          if (xmlHttp.responseText) {
            console.log('ajax: ', Date.now());
            save_results_to_idb &&
              save_to_idb({
                url: url,
                value: {
                  data: xmlHttp.responseText,
                  time_stamp: Date.now(),
                  idb_version: ttw.idb_version,
                },
              });
            resolve({ message: 'success', data: xmlHttp.responseText });
          } else {
            reject("ajax didn't work");
          }
        }
      };
      xmlHttp.open(ajax_verb, url, true);
      if (form_data) {
        console.log('Request has form data');
        xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlHttp.send(serialize(form_data));
      } else {
        console.log('Request has no form data');
        xmlHttp.send(null);
      }
    };
    check_idb(url, '', milli_to_refresh).then((value: any) => {
      if (value) {
        if (save_results_to_idb && (!value.time_stamp || value.time_stamp + milli_to_refresh < Date.now())) {
          make_call();
        }
        resolve({ message: 'idb success', data: value.data });
      } else {
        make_call();
      }
    });
  });
};

interface data_access_graphQL_args {
  query: any;
  milli_to_refresh: number;
  save_results_to_idb?: boolean;
  ttw: TTW;
}
const data_access_graphQL = ({
  query,
  milli_to_refresh,
  ttw,
  save_results_to_idb = false,
}: data_access_graphQL_args) => {
  return new Promise((resolve, reject) => {
    const make_call = () => {
      fetch(ttw.graphql, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          query: query,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          console.log('data returned:', data);
          save_results_to_idb &&
            save_to_idb({
              url: query,
              value: {
                data: data,
                time_stamp: Date.now(),
                idb_version: ttw.idb_version,
              },
            });
          resolve({ message: 'queried', data: data });
        });
    };
    check_idb(query, '', milli_to_refresh).then((value: any) => {
      if (value) {
        if (save_results_to_idb && (!value.time_stamp || value.time_stamp + milli_to_refresh < Date.now())) {
          make_call();
        }
        resolve({ message: 'idb success', data: value.data });
      } else {
        make_call();
      }
    });
  });
};

interface data_access_fb_args {
  url: string;
  fb_verb: string;
  fb_type: string;
  milli_to_refresh: number;
  ttw: TTW;
  save_results_to_idb?: boolean;
  firebase: any;
}
const data_access_fb = ({
  url,
  fb_verb,
  fb_type,
  milli_to_refresh,
  ttw,
  firebase,
  save_results_to_idb = false,
}: data_access_fb_args) => {
  //use strict;
  // console.log('start: ', Date.now());
  return new Promise((resolve, reject) => {
    const make_call = () => {
      firebase
        .database()
        .ref(url)
        [fb_verb](fb_type)
        .then((snapshot: { val: () => any }) => {
          console.log('fb: ', Date.now());
          save_results_to_idb &&
            save_to_idb({
              url: url,
              value: {
                data: snapshot.val(),
                time_stamp: Date.now(),
                idb_version: ttw.idb_version,
              },
            });
          resolve({ message: 'success', data: snapshot.val() });
        })
        .catch((err: any) => {
          reject(err);
        });
    };
    // check_idb(url, '', milli_to_refresh).then((value: any) => {
    //     if(value){
    //         resolve({message: "success_from_idb", data: value.data})
    //     }else if (ttw.fire_ref) {
    //         make_call();
    //     }else{
    //         emitter.on('firebase_loaded', (ttw: any) => {
    //             make_call();
    //         });
    //     }
    // })
    check_idb(url, '', milli_to_refresh).then((value: any) => {
      if (value) {
        if (save_results_to_idb && (!value.time_stamp || value.time_stamp + milli_to_refresh < Date.now())) {
          make_call();
        }
        resolve({ message: 'idb success', data: value.data });
      } else if (ttw.fire_ref) {
        make_call();
      } else {
        emitter.on('firebase_loaded', (ttw: any) => {
          make_call();
        });
      }
    });
  });
};

interface data_access_fb_stream_args {
  url: string;
  fb_verb: string;
  fb_type: string;
  callback: Function;
  ttw: TTW;
  save_results_to_idb?: boolean;
  firebase: any;
}
const data_access_fb_stream = ({
  url,
  fb_verb,
  fb_type,
  callback,
  ttw,
  firebase,
  save_results_to_idb = false,
}: data_access_fb_stream_args) => {
  //use strict;
  // console.log('start: ', Date.now());

  return new Promise((resolve, reject) => {
    const make_call = () => {
      resolve(firebase.database().ref(url)[fb_verb](fb_type, callback));
    };
    if (ttw.fire_ref) {
      make_call();
    } else {
      emitter.on('firebase_loaded', (ttw: any) => {
        make_call();
      });
    }
  });
};

interface data_access_fb_write_args {
  url: string;
  data: any;
  key: string;
  ttw: TTW;
  firebase: any;
}
const data_access_fb_write = ({ url, data, ttw, firebase, key = '' }: data_access_fb_write_args) => {
  //use strict;
  // console.log('start: ', Date.now());

  return new Promise((resolve, reject) => {
    const make_call = () => {
      if (!key) {
        key = firebase.database().ref(url).push().key;
      }
      firebase
        .database()
        .ref(url)
        .update(data)
        .then((snapshot: { val: () => any }) => {
          console.log('fb: ', Date.now());
          debugger;
          resolve({ id: key, message: 'Data has been set to firebase' });
        })
        .catch((err: any) => {
          reject(err);
        });
    };
    if (ttw.fire_ref) {
      make_call();
    } else {
      emitter.on('firebase_loaded', (ttw: any) => {
        make_call();
      });
    }
  });
};
// ttw.data_access_fastest = (url, fb_verb, fb_type, ajax_verb) => {
//     //call the 3 funcs above and see the fastest
// };
interface data_access_firestore_write_args {
  id?: string;
  url: string;
  data?: any;
  ttw: TTW;
  firebase: any;
  save_results_to_idb?: boolean;
  type: string;
}
const data_access_firestore_write = ({
  id,
  url,
  data,
  ttw,
  firebase,
  type,
  save_results_to_idb = false,
}: data_access_firestore_write_args) => {
  return new Promise((resolve, reject) => {
    const make_call = () => {
      if (type === 'add') {
        firebase
          .firestore()
          .collection(url)
          .add(data)
          .then((docRef: { id: any }) => {
            console.log('Data Added to Firestore');
            console.log(data);
            resolve({ id: docRef.id, message: 'Data has been set to Firestore' });
          })
          .catch((err: unknown) => {
            console.log(err);
            resolve(err);
          });
      } else if (type === 'update') {
        firebase
          .firestore()
          .collection(url)
          .doc(id)
          .update(data)
          .then(() => {
            console.log('Data has been set to Firestore');
            resolve({ message: 'Data has been set to Firestore' });
          })
          .catch((err: any) => {
            console.log(err);
          });
      } else if (type === 'edit') {
        firebase
          .firestore()
          .collection(url)
          .doc(id)
          .set(data, { merge: true })
          .then(() => {
            console.log('Data has been set to Firestore');
            resolve({ message: 'Data has been set to Firestore' });
          })
          .catch((err: any) => {
            console.log(err);
          });
      } else if (type === 'delete') {
        firebase
          .firestore()
          .collection(url)
          .doc(id)
          .delete()
          .then(() => {
            console.log('Data has been deleted from Firestore');
            resolve({ message: 'Data has been deleted from Firestore' });
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    };

    if (ttw.fire_ref) {
      /*Should check for firestore*/
      make_call();
    } else {
      emitter.on('firebase_loaded', (ttw: any) => {
        make_call();
      });
    }
  });
};
interface data_access_firestore_read_args {
  url: string;
  query?: Array<any>;
  milli_to_refresh: number;
  ttw: TTW;
  firebase: any;
  save_results_to_idb?: boolean;
}
const data_access_firestore_read = ({
  url,
  query,
  milli_to_refresh,
  ttw,
  firebase,
  save_results_to_idb = false,
}: data_access_firestore_read_args) => {
  // const idb_url = url + (query ? JSON.stringify(query) : "");
  return new Promise((resolve, reject) => {
    const make_call = () => {
      if (query) {
        if (query[0].type === 'where') {
          let fs = firebase.firestore().collection(url);
          query.forEach((q) => {
            if (q.type === 'where') {
              fs = fs.where(q.fieldName, q.type_func, q.fieldValue);
            }
          });
          fs.get()
            .then((querySnapshot: { empty: boolean; forEach: (arg0: (doc: any) => void) => void }) => {
              let data: any[] = [];
              if (querySnapshot.empty == false) {
                querySnapshot.forEach((doc: { data: () => any; id: any }) => {
                  // console.log(doc.id);
                  let tmp_data = doc.data();
                  tmp_data.id = doc.id;
                  if (tmp_data.user_ref) delete tmp_data.user_ref;
                  data.push(tmp_data);
                });
                // let value = {
                //     data: data,
                //     time_stamp: Date.now(),
                //     idb_version: ttw.idb_version
                // };

                save_results_to_idb &&
                  save_to_idb({
                    url: url,
                    value: {
                      data: data,
                      time_stamp: Date.now(),
                      idb_version: ttw.idb_version,
                    },
                  });
                resolve({ message: 'success', data: data });
                // resolve(value);
              } else {
                save_results_to_idb &&
                  save_to_idb({
                    url: url,
                    value: {
                      data: null,
                      time_stamp: Date.now(),
                      idb_version: ttw.idb_version,
                    },
                  });
                resolve({ message: 'no data', data: null });
              }
            })
            .catch((err: any) => {
              console.log(err);
              // resolve({message: "err", err: err});
              reject(err);
            });
        }
      } else if (url.includes('/')) {
        const url_parts = url.split('/');
        let toggle_collection_document = true;
        let firestore = firebase.firestore();
        url_parts.forEach((url_part) => {
          firestore = toggle_collection_document ? firestore.collection(url_part) : firestore.doc(url_part);
          toggle_collection_document = !toggle_collection_document;
        });

        firestore
          .get()
          .then(
            (docs: { empty: boolean; forEach: (arg0: (doc: any) => void) => void; exists: any; data: () => any }) => {
              if (url_parts.length % 2) {
                let data: any[] = [];
                if (docs.empty == false) {
                  docs.forEach((doc: { id: any; data: () => any }) => {
                    console.log(doc.id);
                    let tmp_data = doc.data();
                    tmp_data.id = doc.id;
                    if (tmp_data.user_ref) delete tmp_data.user_ref;
                    data.push(tmp_data);
                  });
                  // let value = {
                  //     data: data,
                  //     time_stamp: Date.now(),
                  //     idb_version: ttw.idb_version
                  // };
                  // resolve(value);
                  save_results_to_idb &&
                    save_to_idb({
                      url: url,
                      value: {
                        data: data,
                        time_stamp: Date.now(),
                        idb_version: ttw.idb_version,
                      },
                    });
                  resolve({ message: 'success', data: data });
                } else {
                  save_results_to_idb &&
                    save_to_idb({
                      url: url,
                      value: {
                        data: null,
                        time_stamp: Date.now(),
                        idb_version: ttw.idb_version,
                      },
                    });
                  resolve({ message: 'no data', data: null });
                }
              } else {
                // let data;
                // if (docs.exists) {
                //     data = docs.data();
                // } else {
                //     console.error('No such document!');
                // }
                // let value = {
                //     data: data,
                //     time_stamp: Date.now(),
                //     idb_version: ttw.idb_version
                // };
                // resolve(value);
                resolve({ message: 'no data', data: null });
              }
            },
          )
          .catch((err: any) => {
            console.log(err);
            // resolve({message: "err", err: err});
            reject(err);
          });
      } else {
        firebase
          .firestore()
          .collection(url)
          .get()
          .then((docs: any[]) => {
            let data: any[] = [];
            docs.forEach(function (doc: { data: () => any; id: any }) {
              let new_data = doc.data();
              new_data._id = doc.id;
              if (new_data.user_ref) delete new_data.user_ref;
              data.push(new_data);
            });
            // let value = {
            //     data: data,
            //     time_stamp: Date.now(),
            //     idb_version: ttw.idb_version
            // };
            // resolve(value);
            save_results_to_idb &&
              save_to_idb({
                url: url,
                value: {
                  data: data,
                  time_stamp: Date.now(),
                  idb_version: ttw.idb_version,
                },
              });
            resolve({ message: 'success', data: data });
          })
          .catch((err: any) => {
            console.log(err);
            // resolve({message: "err", err: err});
            reject(err);
          });
      }
    };
    check_idb(url, query, milli_to_refresh).then((value: any) => {
      if (value) {
        if (save_results_to_idb && (!value.time_stamp || value.time_stamp + milli_to_refresh < Date.now())) {
          make_call();
        }
        resolve({ message: 'idb success', data: value.data });
      } else if (ttw.fire_ref) {
        make_call();
      } else {
        emitter.on('firebase_loaded', (ttw: any) => {
          make_call();
        });
      }
    });
  });
};

const data_sync = (url: string, access_type: string, milli_to_refresh: number, ttw: any, firebase: any) => {
  return new Promise(function (resolve, reject) {
    data_access_idb(url)
      .then((results: { time_stamp: number; data: any[] }) => {
        let time_stamp = 0,
          data: string | any[] = [];
        if (results && results.time_stamp) {
          time_stamp = results.time_stamp;
          data = results.data ? results.data : [];
        }
        if (access_type === 'firestore') {
          data_access_firestore_read({
            url: url,
            query: [
              {
                type: 'where',
                fieldName: 'last_updated',
                type_func: '>=',
                fieldValue: new Date(time_stamp),
              },
            ],
            milli_to_refresh: milli_to_refresh,
            ttw: ttw,
            firebase: firebase,
            save_results_to_idb: false,
          })
            .then((value: any) => {
              const synced_values = unique_by((value.data ? value.data : []).concat(data), 'id');
              if (value.data) {
                save_to_idb({
                  url: url,
                  value: { data: synced_values, time_stamp: Date.now(), idb_version: ttw.idb_version },
                });

                resolve({ new_data: value.data, old_data: data, synced_data: synced_values });
              } else {
                resolve(
                  data.length > 0
                    ? { new_data: [], old_data: data, synced_data: synced_values }
                    : { new_data: [], old_data: [], synced_data: synced_values },
                );
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err: any) => {
        console.error(err);
      });
  });
};

const get_firebase_list = (url: string, milli: number, ttw: any, firebase: any) => {
  return new Promise((resolve) => {
    data_access_fb({
      url: url,
      fb_verb: 'once',
      fb_type: 'value',
      milli_to_refresh: milli,
      ttw: ttw,
      firebase: firebase,
    }).then((results: any) => {
      resolve(
        Object.keys(results.data).map((key) => {
          let obj = results.data[key];
          obj.id = parseInt(key);
          if (isNaN(obj.id)) {
            obj.id = key;
          }
          return obj;
        }),
      );
    });
  });
};

const create_list_from_db = (list: any[], name: string | number) => {
  return list
    .map(function (value: { [x: string]: any; id: any; _id: any }, index: any) {
      return { _id: value.id ? value.id : value._id, title: value[name] };
    })
    .sort((a: { title: number }, b: { title: number }) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
};

export {
  create_list_from_db,
  get_firebase_list,
  data_sync,
  data_access_fb,
  data_access_fb_stream,
  data_access_fb_write,
  data_access_ajax,
  data_access_firestore_read,
  data_access_firestore_write,
  data_access_graphQL,
};
