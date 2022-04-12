import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { roomName } from "../domain/ObjectNames";
import { TQuestion, useQuestion } from "../domain/Question";
import { TRoom, useRoom } from "../domain/Room";
import { useAuth } from "./useAuth";

const db = getDatabase();

export function useGetRoom(idRoom: string) {

   const [questions, setQuestions] = useState<TQuestion[]>([])
   const [room, setRoom] = useState<TRoom | null>()
   const [loaded, setLoaded] = useState(false);
   const [fineshed, setFineshed] = useState(false);
   const { user } = useAuth()


   useEffect(() => {

      async function getRoom(idRoom: string) {
         if (idRoom) {
            const room = await useRoom.getRoom(idRoom)
            setLoaded(true)
            setRoom(room)            
            setFineshed(room?.finishedAt ? true : false)
         }
      }

      getRoom(idRoom);

      if (idRoom && room && user) {

         if (!room.finishedAt) {

            const roomRef = ref(db, `${roomName}/${idRoom}`)

            const unsub = onValue(roomRef, (snapshot) => {
               const arrayQuestios = useQuestion.onQuestionsOfRoom(snapshot, user.id)
               setQuestions(arrayQuestios);

            })

            return () => {
               unsub();
            }
         }
      }
   }
      , [idRoom, room, user?.id]);

   return { title: (room ? room.title : undefined), questions, loaded, fineshed }

}