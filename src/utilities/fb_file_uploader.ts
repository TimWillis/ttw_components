export default async (fire_ref, elem, db_file_path: string, file_path: string, firebase2, firebase_config) => {
  firebase2.initializeApp(firebase_config, 'secondApp');
  const storage = firebase2.app('secondApp').storage();
  // const storage = fire_ref.app().storage();

  // Create a reference to the storage location where you want to store the files
  const storageRef = storage.ref();

  // Get a reference to the HTML file input element
  const fileInput = document.getElementById(elem) as HTMLInputElement;

  const uploadFile = async (file) => {
    var file_name_arr = file.name.split('.');
    var type = file_name_arr[file_name_arr.length - 1];
    var name = file_name_arr.slice(0, file_name_arr.length - 1).join('');
    var name_time = new Date().getTime() + Math.floor(Math.random() * Math.random() * Math.random() * 4000);
    const full_file_path = `${file_path}/${name_time}.${type}`;
    const fileRef = storageRef.child(full_file_path);
    const snapshot = await fileRef.put(file);
    return { url: await snapshot.ref.getDownloadURL(), name: name };
  };
  // Listen for changes to the file input element
  fileInput.addEventListener('change', async (event) => {
    const files = fileInput.files;
    if (files && files.length > 0) {
      var file_s = Array.from(files);
      Promise.all(
        file_s.map((item) => {
          return uploadFile(item);
        }),
      ).then((values) => {
        values.forEach((value) => {
          fire_ref.child('files').child(db_file_path).push({
            name: value.name,
            url: value.url,
          });
        });
      });
    }
  });
};

/* //* example usage
 console.log("save_object", save_object);
            const data_layer = await dl();
            await data_layer
                .fb({
                    firebase: ttw.firebase,
                    url: "partnerships/" + save_object.id,
                    fb_verb: "set",
                    fb_type: "value",
                    post_data: save_object,
                })
                .then((response) => {
                    console.log("response", response);
                    toast("Partnership saved", 4000);
                    const files_container = document.getElementById("files_container");
                    files_container && (files_container.innerHTML = file_section());
                    setTimeout(() => {
                        fb_file_uploader(
                            state.temp_data.storage,
                            ttw.fire_ref,
                            "file_picker",
                            "partnerships",
                            "partnerships",
                            file_callback
                        );
                    }, 100);
                });



                
    const file_callback = async (response) => {
        console.log("file_call_back", response);
        if (response.url) {
            state.file_attachments.push(response);
            const data_layer = await dl();
            await data_layer
                .fb({
                    firebase: ttw.firebase,
                    url: "partnerships/" + state.id + "/file_attachments/" + unique_id(6),
                    fb_verb: "set",
                    fb_type: "value",
                    post_data: response,
                })
                .then((response) => {
                    console.log("response", response);
                    toast("File uploaded", 4000);
                    const files_container = document.getElementById("files_container");
                    files_container && (files_container.innerHTML = file_section());
                    setTimeout(() => {
                        fb_file_uploader(
                            state.temp_data.storage,
                            ttw.fire_ref,
                            "file_picker",
                            "partnerships",
                            "partnerships",
                            file_callback
                        );
                    }, 100);
                });
        }
    };



     const init = async () => {
        console.log("partnerships create_edit.init()");
        if (ttw.firebase_auth_loaded) {
            check_firebase_user().then(async () => {
                const firebase2 = await import("firebase/app");
                await import("firebase/storage");
                firebase2.initializeApp(ttw.firebase_config, "secondApp");
                state.temp_data.storage = firebase2.app("secondApp").storage();
                fb_file_uploader(state.temp_data.storage, ttw.fire_ref, "file_picker", "partnerships", "partnerships", file_callback);
            });
            // fb_file_uploader(ttw.firebase, "file_picker");
        } else {
            ttw.emitter.on("firebase_auth_loaded", () => {
                check_firebase_user().then(async () => {
                    const firebase2 = await import("firebase/app");
                    await import("firebase/storage");
                    firebase2.initializeApp(ttw.firebase_config, "secondApp");
                    state.temp_data.storage = firebase2.app("secondApp").storage();
                    fb_file_uploader(state.temp_data.storage, ttw.fire_ref, "file_picker", "partnerships", "partnerships", file_callback);
                });
            });
        }

        

                */
