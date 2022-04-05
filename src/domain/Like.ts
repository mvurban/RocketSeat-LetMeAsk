
import { child, get, getDatabase, push, ref, set } from "firebase/database";

import { stringify } from "querystring";
import { TQuestion } from "./Question";

export type TLike = {
   id : string;
   authorId : string;
}

const db = getDatabase();
const roomsRef = ref(db, 'Rooms')


function addLike(roomId:string, questionId: string, authorId : string) : string | null {

   let idLike = null;

   try{      
      const likesRef = ref(db, `${roomsRef.key}/${roomId}/Questions/${questionId}/Likes`)
      idLike = push(likesRef, {authorId } ).key
   }
   catch(e){
      throw e;
   }   

   return idLike;
}


function delLike(){

}

async function getLikeOfQuestionAndUser(roomId:string, questionId : string, authorId : string ) : Promise<TLike | undefined> {

   let objLike = {} as TLike | undefined;
   const likesRef = ref(db, `Rooms/${roomId}/Questions/${questionId}/Likes` )
   
   const snapshot = await get(likesRef)
   if(snapshot.exists())
   {
      const objLikes = snapshot.val() as TLike[] | undefined;
      const arrayLikes = Object.entries(objLikes ? objLikes : [])
      
      const arrayLikeFound = arrayLikes.find(([key, value]) => value.authorId === authorId)
      if(arrayLikeFound)
      {
         objLike = {id : arrayLikeFound[0], authorId : arrayLikeFound[1].authorId}
      }      

       //console.log(objLike);
       
   }

   return objLike;
}

function setLike(){
   // set(reference, {
   //    title : Like.title,
   //    authorId : Like.authorId
   // })
}

// async function getLike(idLike : string) : Promise<TLike | null>{

//    let Like = null

//    try{

//       const snapshot = await get(child(RoomsRef,`/${idLike}`))
//       if(snapshot.exists())
//       {
//         Like = snapshot.val() as TLike
//         //console.log(Like.title);
        
//       }
//    }
//    catch(e){
//       throw e;
//    }

//    return Like
// }

// function objLike(title : string, authorId:string){

//    return {title, authorId} as TLike
// }

export const useLike = {addLike, getLikeOfQuestionAndUser} ;



