/*when ready to start - go ahead and uncomment the code below*/

// import { initializeApp } from "firebase/app";
// import {
//     getAuth,
//     signInWithEmailAndPassword,
//     onAuthStateChanged,
//     signInWithPopup,
//     GoogleAuthProvider,
// } from "firebase/auth";

const sign_in = (token, user, url) => {
  debugger;
  const data_to_post = new URLSearchParams();
  const data = { token: token, user: user, url: location.hostname };
  Object.keys(data).forEach((key) => {
    data_to_post.append(key, data[key]);
  });
  fetch(url, {
    method: 'post',
    body: data_to_post,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.Message === 'success') {
      } else {
      }
    })
    .catch((err) => {});
};
const sign_in_email = (url) => {
  const email = (document.getElementById('email') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;
  // const auth = getAuth();
  // signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //         debugger;
  //         // Signed in
  //         const user = userCredential.user;
  //         const credential =
  //             GoogleAuthProvider.credentialFromResult(userCredential);
  //         const token = credential.accessToken;
  //         sign_in(token, user, url);
  //         // ...
  //     })
  //     .catch((error) => {
  //         debugger;
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //     });
};
const sign_in_google = (url) => {
  // const provider = new GoogleAuthProvider();
  // const auth = getAuth();
  // signInWithPopup(auth, provider)
  //     .then((result) => {
  //         debugger;
  //         // This gives you a Google Access Token. You can use it to access the Google API.
  //         const credential = GoogleAuthProvider.credentialFromResult(result);
  //         // const token = credential.accessToken;
  //         // The signed-in user info.
  //         const user = result.user;
  //         const token = credential.idToken; //.getAuthResponse().id_token
  //         sign_in(token, user, url);
  //         // ...
  //     })
  //     .catch((error) => {
  //         debugger;
  //         // Handle Errors here.
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         // The email of the user's account used.
  //         const email = error.customData.email;
  //         // The AuthCredential type that was used.
  //         const credential = GoogleAuthProvider.credentialFromError(error);
  //         // ...
  //     });
};
// const create_user = (email, password) => {
//     const auth = getAuth();
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in
//             const user = userCredential.user;
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//         });
// };

const init_fb = (config, url) => {
  // const app = initializeApp(config);
  // const auth = getAuth();
  // onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //         // User is signed in, see docs for a list of available properties
  //         // https://firebase.google.com/docs/reference/js/firebase.User
  //         const uid = user.uid;
  //         debugger;
  //         // ...
  //     } else {
  //         // User is signed out
  //         // ...
  //     }
  // });
  // init(url);
};

const init = (url) => {
  const login_form = document.getElementById('login_form');
  if (login_form) {
    const sign_in_google_el = document.getElementById('sign_in_google');
    sign_in_google_el.addEventListener('click', sign_in_google.bind(null, 'url'));
    login_form.addEventListener('submit', sign_in_email.bind(null, 'url'));
  } else {
    setTimeout(init, 50);
  }
};

export default (fb_config, url) => {
  setTimeout(() => {
    init_fb(fb_config, url);
  }, 50);
  const css = /*css*/ `<style></style>`;
  // return {
  //     html: /*html*/ `
  //         ${css}
  //             <div id="login_container" class="layout vertical center-center">
  //                 <input type='button' value='Sign In With Google' id='sign_in_google' />
  //                 <form id="login_form" style="max-height: 100%; max-width: 450px;">
  //                     <div class="width_150">
  //                         ${input_with_label({
  //                             html: `<input   type="text"  placeholder="Username" id="gr_username"/>`,
  //                             for_id: "gr_username",
  //                             name: "Username",
  //                         })}
  //                     </div>
  //                     <div class="width_150">
  //                         ${input_with_label({
  //                             html: `<input   type="password"  placeholder="Password" id="gr_password"/>`,
  //                             for_id: "gr_password",
  //                             name: "Password",
  //                         })}
  //                     </div>
  //                     <input type='submit' id='login' value='Sign In'/>
  //                 </form>
  //             </div>
  //     `,
  // };
};
