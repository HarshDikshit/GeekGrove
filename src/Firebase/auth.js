import {createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup} from "firebase/auth";

import {auth} from "../../firebase"

export class AuthService {
   


    // signup starts here
    async createAccount( {email, password} ) {
        try {
     const userAccount =  await  createUserWithEmailAndPassword(auth, email, password)

console.log(userAccount);
        if (userAccount) {
            return this.login({ email, password });
        } else {
            return userAccount;
        }
        } catch (error) {
        throw error;
        }
    }

    // login starts here
    async login({ email, password }) {
        try {
        return await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        } catch (error) {
        throw error;
        }
    }

    // logout starts here
    async logOut() {
        try {
        return await signOut(auth);
        } catch (error) {
        throw error;
        }
    }

    // current user
    // async getCurrentUser(){
    //     try {
    //         return await getCurrentUser()
    //     } catch (error) {
    //         throw error;
    //     }
// }

    // google signup

    async googleSignUp(){
        try {
            const googleAuthProvider = new GoogleAuthProvider();
          const user =  await signInWithPopup(auth, googleAuthProvider);
            console.log(user);
          } catch (error) {
           throw error 
          }
    }
}

const authService = new AuthService();

export default authService;
