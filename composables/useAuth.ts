import {
  GoogleAuthProvider,
  getIdToken,
  inMemoryPersistence,
  setPersistence,
  signInWithPopup,
  getAuth
} from "firebase/auth";

export const useAuth = () => {
  const { $auth } = useNuxtApp();

  const authUser: any = useUser();

  const setUser = (user: any) => {
    authUser.value = user;
  };

  const setCookie = (cookie: any) => {
    cookie.value = cookie;
  };

  const getUserToken = async () => {
    return await $auth.currentUser?.getIdToken(true);
  }

  const me = async () => {
    if (!authUser.value) {
      try {
        
        const data:any = await $fetch("/api/auth/me", {
          headers: useRequestHeaders(["cookie"]) as HeadersInit,
        });

        setUser(data.user);
      } catch (error) {
        setCookie(null);
      }
    }

    return authUser;
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      // await setPersistence($auth, inMemoryPersistence);
      const result = await signInWithPopup($auth, provider);
      const firebaseIdToken = await getIdToken(result.user);

      // send firebaseIdToken to server
      // const data: any = await $fetch("/api/auth/login", {
      //   method: "POST",
      //   body: JSON.stringify({ firebaseIdToken }),
      // });

      setUser(result.user);

      //redirect
      const router = useRouter();
      const route = useRoute();
      const redirect: any = route.query?.redirect || '/'
      router.push(redirect);

    } catch (error) {
      console.log(error);
      setCookie(null);
      setUser(null);
    }

    return authUser;
  };

  const logout = async () => {
    const data: any = await $fetch("/api/auth/logout", {
      method: "POST",
    });

    setUser(data?.user);
  };

  return {
    logout,
    loginWithGoogle,
    getUserToken,
    me,
  };
};