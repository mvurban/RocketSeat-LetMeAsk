import { useContext } from "react";
import { authContext } from "../contexts/AuthContext";

export function useAuth(){

   const authContextAux = useContext(authContext);
   return authContextAux;

}