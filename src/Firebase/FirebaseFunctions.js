
import { getDatabase } from "firebase/database";
import app from "./FirebaseConfig";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"

const auth = getAuth();  

export const signUpUser = (obj) => {
    return createUserWithEmailAndPassword(auth, obj.email, obj.password)
}  

export default app;