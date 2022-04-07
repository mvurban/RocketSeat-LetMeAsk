
import { Unsubscribe } from "firebase/auth";
import { DataSnapshot, get, getDatabase, off, onValue, push, ref, remove } from "firebase/database";
import { Dispatch } from "react";
import { TLike } from "./Like";
import { questionName, roomName } from "./ObjectNames";
import { TUser } from "./User";

export type TQuestion = {
   id : string;
   content: string;
   author: TUser;
   isHightLighted : boolean;
   isAnswered:boolean;
   likes?:  TLike[]; 
   likeByCurrentUser:TLike | undefined;
}

//TODO Substituir os nomes dos objetos do firebase para nome de variávesis 

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

function onQuestionsOfRoom (snapshot:DataSnapshot, userId : string) : TQuestion[] {
   
   const questions = [] as TQuestion[]          
   
   const objRoom = snapshot.val() 
   const objQuestions = objRoom.Questions
   

   if(objQuestions){
      const arrayQuestios = Object.entries(objQuestions ?? {}) 

      arrayQuestios.map(([key, value])=>{       
               
         const objQuestion = value as TQuestion; 
         objQuestion.id = key;                  
                     
         const arrayLikes = Object.entries(objQuestion.likes ?? {}) 
         const likes = [] as TLike[] 
         arrayLikes.map(([key2, value2])=>{               
            const objLike = value2 as TLike ;
            objLike.id = key2;             
            likes.push(objLike);

            if(objLike.authorId == userId)
            {
               objQuestion.likeByCurrentUser = objLike
            }

         })
         objQuestion.likes = likes;            
         
         questions.push(objQuestion)
      })
   }      

   //console.log("listQuestionOfRoom",questions);
   
   return questions;
}

function onQuestionsOfRoomTeste (roomId:string, userId : string, setQuestions : Dispatch<TQuestion[]>) : Unsubscribe
 {
   
   const questions = [] as TQuestion[]        
   const roomRef = ref(db, `${roomName}/${roomId}` )

   const unsub = onValue(roomRef,(snapshot) => {
      
      const objRoom = snapshot.val() 
      const objQuestions = objRoom.Questions

      if(objQuestions){
         const arrayQuestios = Object.entries(objQuestions ?? {}) 

         arrayQuestios.map(([key, value])=>{       
                  
            const objQuestion = value as TQuestion; 
            objQuestion.id = key;                  
                        
            const arrayLikes = Object.entries(objQuestion.likes ?? {}) 
            const likes = [] as TLike[] 
            arrayLikes.map(([key2, value2])=>{               
               const objLike = value2 as TLike ;
               objLike.id = key2;             
               likes.push(objLike);

               if(objLike.authorId == userId)
               {
                  objQuestion.likeByCurrentUser = objLike
               }

            })
            objQuestion.likes = likes;            
            
            questions.push(objQuestion)
         })
      }    

      setQuestions(questions);
      
   })  

   return unsub;

   //console.log("listQuestionOfRoom",questions);
   
   //return questions;
}

async function getQuestionsOfRoom(idRoom:string) : Promise<TQuestion[]> {
   
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

   


   console.log(listQuestionOfRoom);
   
   return listQuestionOfRoom;
}


async function delQuestion(roomId:string, questionId : string){
   try {
      const questionRef = ref(db,`${roomName}/${roomId}/${questionName}/${questionId}`)
      await remove(questionRef)
   } 
   catch (error) {
      throw error;
   }
}

function setQuestion(){
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
export const useQuestion = {addQuestion, delQuestion, getQuestionsOfRoom, onQuestionsOfRoom} ;



