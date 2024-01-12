// import { serverSupabaseUser } from '#supabase/server';
import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert, getApp } from "firebase-admin/app";

/**
 * Make sure that we initialize the firebase app only once
 */



export default defineEventHandler(async (event) => {
    const { path, headers } = event

    if(path.includes('/api/')) {
        try {
        // console.time('timeA')
        createFirebaseApp()

        const token: string = headers.get('authorization') || ''

        if(!token) {
            throw 'Please sign in'
        }

        await getAuth().verifyIdToken(token)

        // console.timeEnd('timeA')
        
        } catch (err: any) {
            throw createError({
                statusCode: 401,
                message: 'Unauthorized',
            }); 
        }
    }        
});

const createFirebaseApp = () => {
    const config: any = useRuntimeConfig();
    
    try {
        return getApp();
    } catch {
        const firebaseConfig = {
            credential: cert({ ...config.firebaseAdmin }),
        };
        console.log('start firebase app')
        return initializeApp(firebaseConfig);
    }
};