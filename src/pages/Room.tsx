import { useState } from "react";
import { useParams } from "react-router-dom";
import { Room, useRoom } from "../domain/Room";

export function Room(){

   const[roomName, setRoomName] = useState<string>('')
   const {id : idRoom} = useParams()


   if(idRoom)
   {
      try {
         getRoomName(idRoom);

      } 
      catch (e) {
         alert(e)
      }      
   }
   
   async function getRoomName(idRoom : string) : Promise<Room | null> {

      let room = null;

      try {
         room = useRoom.getRoom(idRoom)   
         //setRoomName(room)      
      } catch (e) {
         alert(e)
      }

      return room;

   }


   return(
      <h1>Nome da sala: {roomName}</h1>
   );
}