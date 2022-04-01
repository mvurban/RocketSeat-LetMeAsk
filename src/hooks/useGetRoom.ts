import { useEffect, useState } from "react";
import { TQuestion, useQuestion } from "../domain/Question";
import { useRoom } from "../domain/Room";

export function useGetRoom(idRoom : string) {

   const[title, setTitle] = useState<string>('')
   const[questions, setQuestions] = useState<TQuestion[]>([])

   if(idRoom)
   {
      try {
         setNameToRoom(idRoom);
      } 
      catch (error) {
         alert(error) 
      }      
   }

   useEffect(() => {
      async function getQuestions() {         
         if(idRoom){
            const arrayQuestios = await useQuestion.onQuestionsOfRoom(idRoom)            
            setQuestions(arrayQuestios);         
         }            
      }      
      getQuestions();
   }    
   ,[idRoom]);


   async function setNameToRoom(idRoom : string)  {

      let room = null;

      try {
         room = await useRoom.getRoom(idRoom)   
         if (room){
            setTitle(room.title)      
         }
         else{
            throw new Error('Sala não encontrada')
         }
      } catch (error) {
         alert(error)
      }
   }

   return{title, questions, setQuestions}

}