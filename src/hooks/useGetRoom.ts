import { getDatabase, onValue, ref } from "firebase/database";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { roomName } from "../domain/ObjectNames";
import { TQuestion, useQuestion } from "../domain/Question";
import { TRoom, useRoom } from "../domain/Room";
import { useAuth } from "./useAuth";

const db = getDatabase();

export function useGetRoom(idRoom : string) {

   const[title, setTitle] = useState<string>('')
   const[questions, setQuestions] = useState<TQuestion[]>([])
   const[room, setRoom] = useState<TRoom>()
   const {user} = useAuth()
   const navigator = useNavigate()

   
   //useMemo(()=>getRoom(idRoom),[idRoom]);
   
//TODO entender como validar qnd não existe uma sala.

   useMemo(()=>getRoom(idRoom),[idRoom,questions]);   
   
   
   //useMemo(()=>getRoom(idRoom),[idRoom,questions]);

   if(idRoom)
   {
      try {
   //      setNameToRoom(idRoom);  
      } 
      catch (error) {   
         //alert(error) 
      }      
   }

   useEffect(() => {
      if(room && user){

         if(!room.finishedAt){

            const roomRef = ref(db, `${roomName}/${idRoom}` )
      
            const unsub = onValue(roomRef,(snapshot) => {
               const arrayQuestios = useQuestion.onQuestionsOfRoom(snapshot, user.id)
               setQuestions(arrayQuestios);         
            })

            return ()=>{
               unsub();
            }   
         }
         else{
            alert('Sala encerrada')
            navigator('/')
         }
      }
      else{
         // alert('Sala nnão existe')
         // navigator('/')
      }
   }

   ,[idRoom, room, user]);


   async function getRoom(idRoom:string) {
      const room = await useRoom.getRoom(idRoom)
      if(room)
         setRoom(room)
      else
         throw new Error('Sala não existe')
   }

   // async function setNameToRoom(idRoom : string)  {

   //    let room = null;

   //    try {
   //       room = await useRoom.getRoom(idRoom)   
   //       if (room){
   //          if(!room.finishedAt)
   //             setTitle(room.title)      
   //          else{               
   //             throw new Error('Esta sala encontra-se encerrada!!')   
   //          }
   //       }
   //       else{
   //          throw new Error('Sala não encontrada')
   //       }
   //    } catch (error) {         
   //       alert(error)         
   //       navigator('/')
   //       return
   //    }
      
   // }

   return{title : (room ? room.title : ""), questions}

}