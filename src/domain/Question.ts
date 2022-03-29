
import { child, get, getDatabase, push, ref, set } from "firebase/database";
import { TUser } from "./User";

export type TQuestion = {
   content: string;
   author: TUser;
   isHightLighted : boolean;
   isAnswered:boolean;
}

const db = getDatabase();
const roomsRef = ref(db, 'Rooms')
const questionsRefName = 'Questions'

function addQuestion(idroom : string, newQuestion : TQuestion) : string | null {

   let idQuestion = null;

   try{
      const questionRef = ref(db,roomsRef.key + "/" + idroom + "/" + questionsRefName)
      idQuestion = push(questionRef, newQuestion ).key
   }
   catch(e){
      throw e;
   }   

   return idQuestion;

}


function delRoom(){

}

function setRoom(){
   // set(reference, {
   //    title : room.title,
   //    authorId : room.authorId
   // })
}

/*
async function getRoom(idQuestion : string) : Promise<TQuestion | null>{

   let room = null

   try{

      const snapshot = await get(child(roomsRef,`/${idQuestion}`))
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
*/
export const useQuestion = {addQuestion} ;



