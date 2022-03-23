import { auth, provider, signInWithPopup } from './firebase'
import { GoogleAuthProvider, UserCredential } from 'firebase/auth'


export async function  googleLoginWithPopUp(): Promise<UserCredential>{

   let credential = {} as UserCredential

   try{
      const result = await signInWithPopup(auth, provider)
      const credencial = GoogleAuthProvider.credentialFromResult(result);
      const token = credencial?.accessToken;
      credential = result;                   
   }
   catch(e){
      throw e
   }
   finally{
      return credential;
   }

   // signInWithPopup(auth, provider).then(result=>{
   //    const credencial = GoogleAuthProvider.credentialFromResult(result);
   //    const token = credencial?.accessToken;
   //    const user = result.user;                        
   //    return user;
   // }).catch(error => {
   //    throw error
   // })
}