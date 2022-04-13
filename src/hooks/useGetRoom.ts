import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { roomName } from "../domain/ObjectNames";
import { TQuestion, useQuestion } from "../domain/Question";
import { useRoom } from "../domain/Room";
import { useAuth } from "./useAuth";

const db = getDatabase();

export function useGetRoom(idRoom: string) {

   const [questions, setQuestions] = useState<TQuestion[]>([])
   const [title, setTitle] = useState<string | undefined>();
   const [loaded, setLoaded] = useState(false);
   const [fineshed, setFineshed] = useState(false);
   const { user } = useAuth()


   useEffect(() => {

      async function getRoom(idRoom: string) {
         if (idRoom) {
            const room = await useRoom.getRoom(idRoom)
            setLoaded(true)
            setTitle(room?.title)            
            setFineshed(room?.finishedAt ? true : false)
         }
      }

      getRoom(idRoom);

      if (idRoom && user) {

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
   , [idRoom, user]);

   return { title, questions, loaded, fineshed }

}