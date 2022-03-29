import { FormEvent, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from "../contexts/AuthContext";
import { signInGoogleWithPopUp } from "../database/firebase/signInGoogleWithPopUp";
import { TQuestion, useQuestion } from "../domain/Question";
import { TRoomCode, useRoom } from "../domain/Room";
import '../styles/room.scss';
import logo from './assets/images/logo.svg'

export function Room(){

   const {idRoom} = useParams<TRoomCode>();   
   const[roomName, setRoomName] = useState<string>('')
   const[newQuestion, setNewQuestion] = useState<string>('')
   const[Questions, setQuestions] = useState<TQuestion[]>([])
   const {user} = useAuth();
   
   console.log(idRoom);
   

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
            const qq = await useQuestion.getAllQuestions(idRoom)

            //TODO
            //Tipo do retorno das questões está vindo como objeto e não como array


            console.log(typeof(qq));               
            //qq.map((value, index, ar)=>{console.log("qq", value.content)})
            //console.log("qq",qq.map((obj, index)=>{obj.content}));
            
            setQuestions(qq)
         }            
      }
      getQuestions();
      console.log("Questions " , Questions);
 
   }   
   ,[idRoom]);
   
   async function setNameToRoom(idRoom : string)  {

      let room = null;

      try {
         room = await useRoom.getRoom(idRoom)   
         if (room){
            setRoomName(room?.title)      
         }
         else{
            throw new Error('Sala não encontrada')
            //setRoomName('Qualquer coisa')      
            //alert('Sala não encontrada. Vou colocar um nome qq pra vc visualizar ok.')
            //return false; 
         }
      } catch (error) {
         alert(error)
      }
   }

   function handleSendQuestion(event:FormEvent) {

      event.preventDefault();
      
      if(newQuestion.trim() !== ''){
         if(user){
            if(idRoom){
               const objQuestion = {
                  content : newQuestion,
                  author : user,
                  isAnswered : false,
                  isHightLighted : false
               } as TQuestion

               useQuestion.addQuestion(idRoom, objQuestion)
               setNewQuestion('');
            }
            else{
               throw new Error('Sala não encontrada')               
            }
         }
         else{
            throw new Error('Usuário não logado!!')            
         }
      }
      else{
         throw new Error('A pergunta não pode ser vazia!!')            
      }
   }

   async function handleLogin() {      
      const user = await signInGoogleWithPopUp();      
   }

   return(

      <div className="page-container">
         <header>
            <Link to="/"><img src={logo} alt="logo"></img></Link>
            <RoomCode idRoom={idRoom?idRoom:""}></RoomCode>
         </header>
         <main>
            <div className="room-title">
               <h1>{roomName}</h1> 
               <span>4 perguntas</span>
            </div>
            <form onSubmit={handleSendQuestion}>
               <textarea
                  placeholder="O que você quer perguntar?"
                  onChange={event => setNewQuestion(event.target.value)}
                  value={newQuestion}
               >
               </textarea>
               <div className="form-footer">
                  {user ? (
                     <div className="user-info">
                        <img src={user.avatar} alt={user.name}></img>
                        <span>{user.name}</span>
                     </div>
                  ) : (
                     <span>Para enviar uma pergunta, <button onClick={handleLogin} >faça seu login.</button></span>      
                  ) }                  
                  <Button type="submit" disabled={!user}>Enviar pergunta</Button>
               </div>
            </form>

            <section>
               {
                  // Questions ? 
                  // (
                  //       Questions.map(function(obj, index){
                  //          <Question question={obj}  ></Question>
                  //       })
                  // ) : (
                  //    <div></div>
                  // )
               }
               
            </section>
            

         </main>

      </div>


   );
}