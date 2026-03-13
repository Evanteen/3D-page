import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

/**
 * Ensure the user is signed in (anonymous if needed) and resolve once auth is ready.
 * @returns {Promise<{auth: import('firebase/auth').Auth, user: import('firebase/auth').User}>}
 */
export function authenticateUser() {
    const auth = getAuth();

    return new Promise((resolve, reject) => {
        // If already signed in, resolve immediately
        if (auth.currentUser) {
            return resolve({ auth, user: auth.currentUser });
        }

        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                if (user) {
                    unsubscribe();
                    resolve({ auth, user });
                }
            },
            (error) => {
                unsubscribe();
                reject(error);
            }
        );

        signInAnonymously(auth).catch((error) => {
            console.warn("Anonymous sign-in failed (may already be signed in):", error);
        });
    });
}
