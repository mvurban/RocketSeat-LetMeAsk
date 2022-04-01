import { signOut } from '../database/firebase/signOut';
import {createContext, ReactNode, useEffect, useState} from 'react';
import { auth } from '../database/firebase/firebase';
import {signInGoogleWithPopUp} from '../database/firebase/signInGoogleWithPopUp';
import {objUser, TUser} from '../domain/User'

type AuthContextType = {
   user : TUser | undefined;
   signInGoogleWithPopUp : () =>  Promise<TUser | undefined>;  
   signOutAll : () => void;
}

type AuthContextProviderProps = {
   children : ReactNode
}

export const authContext = createContext({} as AuthContextType)   

export function AuthContextProvider(props : AuthContextProviderProps){ 

   const[user, setUser] = useState<TUser>();

   //Mantém a informação na tela
   useEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged(user =>  {
         if(user){
            setUser(objUser(user.uid, user.displayName, user.photoURL));
         }
      })   
      return () => {
         unsubscribe();
      }   
   },[])


   function signOutAll(){      
      setUser(undefined);
      signOut();
   }

   return(

      <authContext.Provider value={{user, signInGoogleWithPopUp, signOutAll}}>
         {props.children    }
      </authContext.Provider>


   );
}

