declare var ttw: any;

const get_session_user = () => {
    function get_cookie(name) {
        const match = document.cookie.match(new RegExp(name + "=([^;]+)"));
        if (match) return match[1];
    }
    const cookie = get_cookie("__session");
    const cookie_decoded = cookie ? decodeURIComponent(cookie) : null;
    try {
        return cookie_decoded ? JSON.parse(cookie_decoded) : {};
    } catch (e) {}
};
export default () => {
    return new Promise((resolve, reject) => {
        ttw.firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                resolve(user);
            } else {
                // User is NOT signed in.
                if (!ttw.user) {
                    ttw.user = get_session_user();
                }
                ttw.firebase
                    .auth()
                    .signInWithCustomToken(ttw.user.token)
                    .then((auth) => {
                        if (!auth) {
                            resolve("not_authorized");
                            location.href = ttw.root_url_1 + "/sign-out/"; /* may take this out */
                        } else {
                            console.log("authorized");
                        }
                    })
                    .catch(function (error) {
                        resolve("not_authorized - error");
                        location.href = ttw.root_url_1 + "/sign-out/"; /* may take this out */
                        console.log(JSON.stringify(error, null, 2));
                    });
            }
        });
    });
};
