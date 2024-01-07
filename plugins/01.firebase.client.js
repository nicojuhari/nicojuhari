import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


export default defineNuxtPlugin(async () => {
    let firebaseApp = null;
    const config = useRuntimeConfig();
    const firebaseConfig = config.public.firebase;
    console.log('fireabse')

    if (!firebaseApp) {
        firebaseApp = initializeApp(firebaseConfig);
    }

    const auth = getAuth(firebaseApp);

    console.log('plugin', auth)

    return {
        provide: {
            auth
        },
    };
});