import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";

export const useAuth = () => {
  const { $auth } = useNuxtApp();

  const authUser: any = useUser();

  const setUser = (user: any) => {
    authUser.value = user;
  };

  const redirectTo = (url: string = '') => {
    //redirect
      const router = useRouter();
      const route = useRoute();
      const redirect: any = url || route.query?.redirect || '/'
      return router.push(redirect);
  }

  const getUserToken = async () => {
    return await $auth.currentUser?.getIdToken(true);
  }

  const loginUser = async (provider: string = 'email', email: string = '', password: string = '') => {
  
    try {
        let result = null;
        email = email.toString().trim()
        password = password.toString().trim()

        if(provider === 'create-with-email') {
          result = await createUserWithEmailAndPassword($auth, email, password)
        }
  
        if(provider === 'email') {
          result = await signInWithEmailAndPassword($auth, email, password)
        }

        if(provider === 'google') {
          let gProvider = new GoogleAuthProvider();
            gProvider.addScope('profile');
            gProvider.addScope('email');
          result = await signInWithPopup($auth, gProvider);
        }
      
        if(!result?.user || result === null ) redirectTo('/login')
        else setUser(result.user);
        
        return {
          success: true,
          message: 'You successfully logged in!'
        }

    } catch (error) {
      console.log(error);
      setUser(null);
      
      return {
        success: false,
        message: 'Something wrong happend. Check and try again later!'
      }

    }
  }

  const resetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail($auth, email);
            return {
                success: true,
                message: "If your email exist in our database, soon you should receive an email",
            };
        } catch (err) {
            console.log(err);
            return {
                success: false,
                message: "Unforunately, an error occured",
            };;
        }
    };

  const logout = () => {
    signOut($auth)
    // setUser(null);
    redirectTo('/login')
  };

  return {
    logout,
    getUserToken,
    loginUser,
    redirectTo
  };
};