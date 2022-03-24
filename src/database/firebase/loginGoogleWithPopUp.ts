import { auth, provider, signInWithPopup } from './firebase'
import { GoogleAuthProvider } from 'firebase/auth'
import { CreateUser, User } from '../../domain/User';

export async function  loginGoogleWithPopUp(): Promise<User>{
   
   let user = {} as User;

   try{
      const result = await signInWithPopup(auth, provider)
      const credencial = GoogleAuthProvider.credentialFromResult(result);
      const token = credencial?.accessToken;
   
      user = CreateUser(result.user.uid, result.user.displayName, result.user.photoURL)
   }
   catch(e){
      throw e
   }
   finally{
      return user;
   }
}