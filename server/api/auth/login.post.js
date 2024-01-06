import { getAuth } from "firebase-admin/auth";

export default defineEventHandler(async (event) => {

     const cookiesExpires = 60 * 60 * 24 * 1000 * 7; // 7days

    const { firebaseIdToken } = await readBody(event);
  
  
  try {
    const sessionCookie = await getAuth().createSessionCookie(firebaseIdToken, { expiresIn: cookiesExpires });
    
    setCookie(event, "__session", sessionCookie, {
        maxAge: cookiesExpires,
        sameSite: "strict",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
    });
    
    const token = await getAuth().verifySessionCookie(sessionCookie, true);

    const user = await getAuth().getUser(token.uid);
    return { user };

  } catch (error) {
    console.log(error);

    return createError({
      statusCode: 401,
      message: "Not authenticated",
    });
  }
});