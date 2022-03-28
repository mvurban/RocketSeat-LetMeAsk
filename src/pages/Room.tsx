import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { useRoom } from "../domain/Room";
import '../styles/room.scss';
import logo from './assets/images/logo.svg'

export function Room(){

   const {id : idRoom} = useParams()
   const[roomName, setRoomName] = useState<string>('')

   if(idRoom)
   {
      try {
         setNameToRoom(idRoom);
      } 
      catch (error) {
         alert(error)
      }      
   }
   
   async function setNameToRoom(idRoom : string)  {

      let room = null;

      try {
         room = await useRoom.getRoom(idRoom)   
         if (room){
            setRoomName(room?.title)      
         }
      } catch (error) {
         alert(error)
      }
   }

   function handleSendQuestion(event:FormEvent) {
      event.preventDefault();
   }

   return(

      <div className="page-container">
         <header>
            <img src={logo} alt="logo"></img>
            <span>Sala {idRoom}</span>
         </header>
         <main>
            <div className="room-title">
               <h1>{roomName}</h1>
               <span>4 perguntas</span>
            </div>
            <form onSubmit={handleSendQuestion}>
               <textarea
                  placeholder="O que você quer perguntar?"
               >
               </textarea>
               <div className="form-footer">
                  <span>Para enviar uma pergunta, <button type="submit">faça seu login.</button></span>
                  <Button type="submit">Enviar pergunta</Button>
               </div>
            </form>

            <section>
               <span>Lista de perguntas</span>
            </section>
            

         </main>

      </div>


   );
}