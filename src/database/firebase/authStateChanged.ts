import { Unsubscribe } from "firebase/auth";
import { TUser, objUser } from "../../domain/User";
import { auth } from "./firebase";

type stateChangedType = {
   user : TUser |undefined;
   unsubscribe : Unsubscribe;
}


//Não está sendo usado por enquanto.
export async function stateChanged() : Promise<stateChangedType>
{
   let userInit = undefined;

   const unsubscribe = auth.onAuthStateChanged(user =>  {
      if(user){
         userInit = objUser(user.uid, user.displayName, user.photoURL);         
      }
   })   

   return {user:userInit, unsubscribe};

}
