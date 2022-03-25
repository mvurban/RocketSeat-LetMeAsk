
import { getDatabase, push, ref, set } from "firebase/database";

export type Room = {
   title : string;
   authorId : string;

}

const db = getDatabase();
const reference = ref(db, 'Rooms')

function addRoom(room : Room){

   push(reference, {room} )

   // set(reference, {
   //    title : room.title,
   //    authorId : room.authorId
   // })
}


function delRoom(){

}

function setRoom(){

}

function getRoom(){

}

function objRoom(title : string, authorId:string){

   return {title, authorId} as Room
}

export const useRoom = {addRoom, delRoom, objRoom} ;


// export function useRoom(testew : string){

//    const teste = {addRoom, delRoom}
//    return teste
// }


