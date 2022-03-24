import {createContext, ReactNode, useEffect, useState} from 'react';
import { auth } from '../database/firebase/firebase';
import {loginGoogleWithPopUp} from '../database/firebase/loginGoogleWithPopUp';
import {CreateUser, User} from '../domain/User'

type AuthContextType = {
   user : User | undefined;
   loginGoogleWithPopUp : () =>  Promise<User>;  
}

type AuthContextProviderProps = {
   children : ReactNode
}

export const authContext = createContext({} as AuthContextType)   

export function AuthContextProvider(props : AuthContextProviderProps){ 

   const[user, setUser] = useState<User>();


   useEffect(()=>{
      const unsubscribe = auth.onAuthStateChanged(user =>  {
         if(user){
            setUser(CreateUser(user.uid, user.displayName, user.photoURL));
         }
      })
   
      return () => {
         unsubscribe();
      }
   
   },[])

   return(

      <authContext.Provider value={{user, loginGoogleWithPopUp}}>
         {props.children    }
      </authContext.Provider>


   );
}