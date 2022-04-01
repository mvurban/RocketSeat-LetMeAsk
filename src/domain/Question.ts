
import { child, get, getDatabase, orderByChild, push, query, ref, set } from "firebase/database";
import { TUser } from "./User";

export type TQuestion = {
   id : string;
   content: string;
   author: TUser;
   isHightLighted : boolean;
   isAnswered:boolean;
}

const db = getDatabase();
const roomsRef = ref(db, 'Rooms')
const questionsRefName = 'Questions'

function addQuestion(idRoom : string, newQuestion : TQuestion) : string | null {

   let idQuestion = null;

   try{
      const questionRef = ref(db,roomsRef.key + "/" + idRoom + "/" + questionsRefName)
      idQuestion = push(questionRef, newQuestion ).key
   }
   catch(e){
      throw e;
   }   

   return idQuestion;

}

async function getAllQuestions(idRoom:string) : Promise<TQuestion[]> {
   
   let listQuestionOfRoom = [] as TQuestion[] 
   const questionRef = ref(db, roomsRef.key + "/" + idRoom + "/" + questionsRefName)

   const snapshot = await get(questionRef)
   if(snapshot.exists())
   {

      var objListQuestionOfRoom = snapshot.val() 

      //Transformo o objeto do retornodo da busca no firebase em um array.
      //O retorno vem assim -> objListQuestionOfRoom = {-MzKwgOJ_iCl0pOEJJnE: {…}, -MzL-DFb0am6jjVznc8s: {…}}
      const arrayQuestios = Object.entries(objListQuestionOfRoom ?? {}) 

      arrayQuestios.map(([key, value])=>{
         listQuestionOfRoom.push(value as TQuestion)                  
      })
      
      return listQuestionOfRoom;
      
   }

   


   //console.log(listQuestionOfRoom);
   
   return listQuestionOfRoom;
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
/*
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
export const useQuestion = {addQuestion, getAllQuestions} ;



