import { auth, provider } from './firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { CreateUser, TUser } from '../../domain/User';

export async function  signInGoogleWithPopUp(): Promise<TUser | undefined>{
   
   let user = undefined;

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

