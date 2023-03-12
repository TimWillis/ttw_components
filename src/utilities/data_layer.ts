import * as idb_keyvalue from './idb_keyvalue';

export type get_type = 'idb' | 'post' | 'rest' | 'both';

export interface fb_i {
  firebase: any;
  url: string;
  fb_verb: string;
  fb_type?: string;
  limit?: number;
  keyword?: string;
  search_field?: string;
  post_data?: any;
}

export default (root_path = '', token?, re_auth?) => {
  const one_day = 24 * 60 * 60 * 1000;
  const headers = new Headers();
  const bearer = 'Bearer ' + token;
  headers.append('Authorization', bearer);
  // headers.append(
  //     "Cookie",
  //     "ARRAffinity=da08aa2179b99a162682da0c3bcfede9eb48fb04b551c343ca0b60a0a5f219b3; ARRAffinitySameSite=da08aa2179b99a162682da0c3bcfede9eb48fb04b551c343ca0b60a0a5f219b3"
  // );
  // headers.append(
  //     "Authorization",
  //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJhcGk6Ly8yODI3NGIzNy0zNmIwLTRmNzUtYWNhNS03NmI0MDZkMmQzNDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC82MzZlNTcxZS0zNDcxLTQ1ZGMtYjI3Yi1hZmY5ODMzNGIzMzcvIiwiaWF0IjoxNjYzMTczNjUzLCJuYmYiOjE2NjMxNzM2NTMsImV4cCI6MTY2MzE3NzYzNCwiYWNyIjoiMSIsImFpbyI6IkUyWmdZUGcyOStXYjE0RkJWWVpPR1N4eUJ4S25zVEtiK0o3YU9GSEF5K2xDejYwbHNVRUEiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMjgyNzRiMzctMzZiMC00Zjc1LWFjYTUtNzZiNDA2ZDJkMzQwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJXaWxsaXMiLCJnaXZlbl9uYW1lIjoiVGltb3RoeSIsImlwYWRkciI6IjEwNy4xNDUuMTIyLjY3IiwibmFtZSI6IlRpbW90aHkgXCJHYXRvclwiIFdpbGxpcyIsIm9pZCI6ImEwMjc5Mzk3LTEzODctNDIyNi04YjQzLWY1OGZmOWUyZDkzOCIsInJoIjoiMC5BUmNBSGxkdVkzRTAzRVd5ZTZfNWd6U3pOemRMSnlpd05uVlByS1YydEFiUzAwQVhBRDAuIiwic2NwIjoiYXBpLnNjb3BlIiwic3ViIjoiRkRCdzhPMTRfZWh1TWpFMXI5c0g0dkxuOTVyRHBOY3FUeHZJbU9ONkY4byIsInRpZCI6IjYzNmU1NzFlLTM0NzEtNDVkYy1iMjdiLWFmZjk4MzM0YjMzNyIsInVuaXF1ZV9uYW1lIjoidHdpbGxpc0BobGluYy5jb20iLCJ1cG4iOiJ0d2lsbGlzQGhsaW5jLmNvbSIsInV0aSI6InJyZG5Za240SGtldmxLYTB6Zk1lQUEiLCJ2ZXIiOiIxLjAifQ.mi93RxxrTOeBdczM28XcdyLto3z02-OR67t1lUm7CUxcrkAEaMYpCeJfZReNHsFU5I7a3rJ97fSlK61_OjZXKEN4AjVc4SB2KRiWzu9xg8TfbxgtIwFXgjxKzDtOvQa5FDbkrUKme_2gmAH_jj6KIepS8DftuQjGFBHOWfvyPWQlYI31N9whIammyQnUtqBF6bnE7MKUQpzH2iv74f7Gf_eNyYm0ohoQ9EPv_QTMxFXG0sFiwn7lgJiryOH_Ar4rivtoy981bStkeBnqtBavXSqjQdTAFBQpeNp2wUonTxEmwJw_qhKiwnoHm41N2i3HfWF9tXd1Cl0Zl9Z7kXAF9w"
  // );

  const requestOptions: any = {
    headers: headers,
    redirect: 'follow',
  };

  const get_rest = (path: string) => {
    return fetch(root_path + path, token ? Object.assign({}, requestOptions, { method: 'GET' }) : { method: 'GET' })
      .then((response) => {
        // debugger;
        let res;

        if (response.status == 200) {
          res = response.json();
        } else if (response.status === 401) {
          re_auth && re_auth();
          throw response;
        } else {
          throw response;
        }
        // try {
        //   res = response.json();
        // } catch (e) {
        //   res = response;
        // }
        return res;
      })
      .then((data) => {
        return { data: data, last_fetch: Date.now() };
      })
      .catch(function (err) {
        console.log('Data not fetched!', err, path);
        throw err;
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
    const new_data = await get_rest(path).catch((e) => {
      throw e;
    });
    if (new_data) {
      set_idb(path, new_data);
    }
  };

  const get = async (path: string, from_last_update = Date.now() - one_day, type: get_type = 'both', post_data?) => {
    let data = await get_idb(path).catch((e) => {
      console.error(e);
    });
    if (!data && type !== 'idb') {
      data =
        type === 'post'
          ? await post_rest(path, post_data).catch((e) => {
              throw e;
            })
          : await get_rest(path).catch((e) => {
              throw e;
            });
      set_idb(path, data);
    } else if (type === 'rest') {
      const new_data = await get_rest(path).catch((e) => {
        throw e;
      });
      data = new_data || data;
      set_idb(path, data);
    } else if (type === 'post') {
      const new_data = await post_rest(path, post_data).catch((e) => {
        throw e;
      });
      data = new_data || data;
      set_idb(path, data);
    } else if (type !== 'idb') {
      update_data(path).catch((e) => {
        console.error(e);
      });
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
        throw err;
      });
  };

  const post_rest = async (path: string, data: any) => {
    // const init_options = {
    //   method: 'POST',
    //   body: data,
    // };
    // const new_headers = new Headers();
    // init_options.headers = new_headers
    let options;
    if (token) {
      let new_request_options = Object.assign({}, requestOptions);
      new_request_options.method = 'POST';
      new_request_options.body = data;
      new_request_options.headers.append('Content-Type', 'application/json');
      options = Object.assign({}, new_request_options);
    } else {
      options = {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }
    // const options = token ? Object.assign({}, requestOptions, init_options) : init_options;

    // headers.append('Content-Type', 'application/json');
    //   options.headers.append('Content-Type', 'application/json');
    return await fetch(root_path + path, options)
      .then((response) => {
        // debugger;
        let res;

        if (response.status == 200) {
          res = response.text();
        } else if (response.status === 401) {
          re_auth && re_auth();
          throw response;
        } else {
          throw response;
        }
        // try {
        //   res = response.json();
        // } catch (e) {
        //   res = response;
        // }
        return res;
      })
      .then((data) => {
        return { data: data, last_fetch: Date.now() };
      })
      .catch(function (err) {
        console.log('Data not posted!', err, path);
        throw err;
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

  const fb = function ({ firebase, url, fb_verb, fb_type, limit, keyword, search_field, post_data }: fb_i) {
    return new Promise(function (resolve, reject) {
      //                ref_places = ttw.fb_ref(url);
      var ref = firebase.database().ref(url);
      if (!post_data) {
        if (keyword && search_field) {
          ref = ref
            .orderByChild(search_field)
            .startAt(keyword)
            .endAt(keyword + '\uf8ff');
        }
        ref = limit ? ref.limitToFirst(limit) : ref;
        ref[fb_verb](fb_type, function (snapshot) {
          var value = { data: snapshot.val(), time_stamp: Date.now() };
          resolve(value);
        });
      } else {
        ref[fb_verb](post_data).then(() => {
          console.log('success');
          // var value = { data: snapshot.val(), time_stamp: Date.now() };
          resolve(true);
        });
      }
    });
  };

  // const archive = async (path, is_archived) => {
  //     data.last_updated = Date.now();
  //     return await set_idb(path, null);
  // };

  return { get, post, put, del, post_rest, fb };
};

// let root_path = 'https://testautomationapidev.azurewebsites.net/api/';

/*
Model List
https://testautomationapitest.azurewebsites.net/api/TestGen/GetAutomationModelList



Definition fields for model
https://testautomationapitest.azurewebsites.net/api/TestGen/GetModelFieldsById?id={guid}
*/
