import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { roomName } from "../domain/ObjectNames";
import { TQuestion, useQuestion } from "../domain/Question";
import { useRoom } from "../domain/Room";
import { useAuth } from "./useAuth";

const db = getDatabase();

export function useGetRoom(idRoom : string) {

   const[title, setTitle] = useState<string>('')
   const[questions, setQuestions] = useState<TQuestion[]>([])
   const {user} = useAuth()


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
      if(idRoom && user){

         const roomRef = ref(db, `${roomName}/${idRoom}` )
   
         const unsub = onValue(roomRef,(snapshot) => {
            const arrayQuestios = useQuestion.onQuestionsOfRoom(snapshot, user.id)
            setQuestions(arrayQuestios);         
         })

         return ()=>{
            unsub();
         }   
      }}

      
   ,[idRoom, user]);


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