// import firebase2 from "firebase/app";
// import "firebase/storage";
export default async (firebase2, fire_ref, elem, db_file_path: string, file_path: string, firebase_config) => {
  /** NOTE: add this back in
   * await import("firebase/storage");
   * */
  // await new Promise<void>(function (resolve) {
  //     var script = document.createElement("script");
  //     script.src = "/bower_components/firebase/firebase-storage.js";
  //     script.async = true;
  //     script.onload = function () {
  //         return resolve();
  //     };
  //     script.onerror = function () {
  //         throw new Error();
  //     };
  //     document.head.appendChild(script);
  // });
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
    // firebase
    //     .storage()
    //     .ref()
    //     .child(full_file_path)
    //     .put(file)
    //     .then(function (snapshot) {
    //         resolve({ name: name, type: type, url: snapshot.downloadURL, storage_ref: full_file_path });
    //     })
    //     .catch(function (error) {
    //         resolve(["One failed:", error.message]);
    //     });
    // });
  };
  // Listen for changes to the file input element
  fileInput.addEventListener('change', async (event) => {
    const files = fileInput.files;
    if (files && files.length > 0) {
      // Create a reference to the location in storage where the file will be stored
      // const fileRef = storageRef.child(file.name);

      // // Upload the file to Firebase Storage
      // const snapshot = await fileRef.put(file);

      // // Get the URL of the file in Firebase Storage
      // const url = await snapshot.ref.getDownloadURL();

      // Save a reference to the file in the real-time database

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
