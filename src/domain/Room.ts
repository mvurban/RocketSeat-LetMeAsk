
import { child, get, getDatabase, push, ref, set, update } from "firebase/database";
import { roomName } from "./ObjectNames";
import { TQuestion } from "./Question";

export type TRoom = {
   id : string
   title : string;
   authorId : string;   
   questions? : TQuestion[];
   finishedAt? : Date;
}

export type TRoomCode = {
   idRoom : string;
}

const db = getDatabase();
const roomsRef = ref(db, roomName)

function addRoom(title: string, authorId : string) : string | null {

   let idRoom = null;

   try{
      idRoom = push(roomsRef, {title, authorId} ).key
   }
   catch(e){
      throw e;
   }   

   return idRoom;

}


function delRoom(){

}

function setRoomToFinish(roomId : string){
   const roomRef = ref(db,`${roomName}/${roomId}`)
   try {
      update(roomRef, {
         finishedAt : new Date()
      })
   } catch (error) {
      throw error
   }
}

async function getRoom(roomId : string) : Promise<TRoom | null>{

   let room = null

   try{
      
      const snapshot = await get(child(roomsRef, `/${roomId}`))
      if(snapshot.exists())
      {
        room = snapshot.val() as TRoom
        //console.log(room.title);
        
      }
   }
   catch(e){
      throw e;
   }

   return room
}

function objRoom(title : string, authorId:string){

   return {title, authorId} as TRoom
}

export const useRoom = {addRoom, getRoom, setRoomToFinish, delRoom, objRoom} ;



