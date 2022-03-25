import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRoom } from "../domain/Room";

export function Room(){

   const {id : idRoom} = useParams()
   const[roomName, setRoomName] = useState<string>('')

   if(idRoom)
   {
      try {
         setNameToRoom(idRoom);
      } 
      catch (e) {
         alert(e)
      }      
   }
   
   async function setNameToRoom(idRoom : string)  {

      let room = null;

      try {
         room = await useRoom.getRoom(idRoom)   
         if (room){
            setRoomName(room?.title)      
         }
      } catch (e) {
         alert(e)
      }
   }


   return(
      <h1>Nome da sala: {roomName}</h1>
   );
}