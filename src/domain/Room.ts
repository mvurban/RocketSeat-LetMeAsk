
import { child, get, getDatabase, push, ref, set } from "firebase/database";
import { TQuestion } from "./Question";

export type TRoom = {
   id : string
   title : string;
   authorId : string;   
   questions? : TQuestion[];
}

export type TRoomCode = {
   idRoom : string;
}

//TODO Substituir os nomes dos objetos do firebase para nome de variávesis 

const db = getDatabase();
const roomsRef = ref(db, 'Rooms')



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

function setRoom(){
   // set(reference, {
   //    title : room.title,
   //    authorId : room.authorId
   // })
}

async function getRoom(idRoom : string) : Promise<TRoom | null>{

   let room = null

   try{

      const snapshot = await get(child(roomsRef,`/${idRoom}`))
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

export const useRoom = {addRoom, getRoom, setRoom, delRoom, objRoom} ;



