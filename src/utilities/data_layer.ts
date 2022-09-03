import * as idb_keyvalue from './idb_keyvalue';

export default (root_path = '') => {
  const one_day = 24 * 60 * 60 * 1000;

  const get_rest = (path: string) => {
    return fetch(root_path + path, {
      method: 'get',
    })
      .then((response) => {
        debugger;
        let res;
        try {
          res = response.json();
        } catch (e) {
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

  const get_idb = (path: string) => {
    return idb_keyvalue.get(path).then((val: any) => {
      if (val) {
        val.data = val.data ? val.data : val;
        val.last_fetch = val.last_fetch ? val.last_fetch : Date.now();
      }
      return val; // && JSON.parse(val);
    });
  };

  const update_data = async (path: string) => {
    const new_data = await get_rest(path);
    if (new_data) {
      set_idb(path, new_data);
    }
  };

  const get = async (path: string, from_last_update = Date.now() - one_day, type = 'both') => {
    let data = await get_idb(path);
    if (!data && type !== 'idb') {
      data = await get_rest(path);
      set_idb(path, data);
    } else if (type === 'rest') {
      const new_data = await get_rest(path);
      data = new_data || data;
      set_idb(path, data);
    } else if (type !== 'idb') {
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
  };

  const set_idb = (path: string, data: any) => {
    return idb_keyvalue
      .set(path, data)
      .then(() => {
        console.log('Data saved!');
      })
      .catch(function (err) {
        console.log('Data not saved!', err, path);
      });
  };

  const post_rest = async (path: string, data: any) => {
    return await await fetch(root_path + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data,
    }).catch(function (err) {
      console.log('Data not posted!', err, path);
    });
  };
  const post = async (path: string, data: any) => {
    const post_data = { data: data, last_fetch: Date.now() };
    return await set_idb(path, post_data);
  };
  const put = async (path: string, data: any) => {
    const post_data = { data: data, last_fetch: Date.now() };
    return await set_idb(path, post_data);
  };
  const del = async (path: string, is_archived: boolean = false) => {
    if (is_archived) {
      const data = await get(path);
      data.is_archived = true;
      const post_data = { data: data, last_fetch: Date.now() };
      return await set_idb(path, post_data);
    } else {
      return await set_idb(path, null);
    }
  };

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
