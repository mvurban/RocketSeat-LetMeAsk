
import { child, get, getDatabase, push, ref, set } from "firebase/database";

export type Room = {
   title : string;
   authorId : string;

}

const db = getDatabase();
const reference = ref(db, 'Rooms')

function addRoom(room : Room) : string | null {

   let idRoom = null;

   try{
      idRoom = push(reference, {room} ).key
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

async function getRoom(idRoom : string) : Promise<Room | null>{

   let room = null

   try{
      const snapshot = await get(child(reference,`Rooms/${idRoom}`))
      //room = snapshot.val()
      room = {title : 'teste',authorId: 'teste'} as Room
   }
   catch(e){

   }

   return room
}

function objRoom(title : string, authorId:string){

   return {title, authorId} as Room
}

export const useRoom = {addRoom, getRoom, setRoom, delRoom, objRoom} ;


// export function useRoom(testew : string){

//    const teste = {addRoom, delRoom}
//    return teste
// }


