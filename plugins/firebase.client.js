import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


export default defineNuxtPlugin(async () => {
    let firebaseApp = null;
    const config = useRuntimeConfig();
    const firebaseConfig = config.public.firebase;

    if (!firebaseApp) {
        firebaseApp = initializeApp(firebaseConfig);
    }

    const auth = getAuth(firebaseApp);

    return {
        provide: {
            auth
        },
    };
});