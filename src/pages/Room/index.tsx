import { FormEvent, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode";
import { useAuth } from "../../contexts/AuthContext";
import { signInGoogleWithPopUp } from "../../database/firebase/signInGoogleWithPopUp";
import { TQuestion, useQuestion } from "../../domain/Question";
import { TRoomCode, useRoom } from "../../domain/Room";
import './styles.scss';
import logo from '../assets/images/logo.svg'
import noquestion from '../assets/images/noquestions.svg'

export function Room(){

   const {idRoom} = useParams<TRoomCode>();   
   const[roomName, setRoomName] = useState<string>('')
   const[newQuestion, setNewQuestion] = useState<string>('')
   const[Questions, setQuestions] = useState<TQuestion[]>([])
   const {user} = useAuth();
   
   if(idRoom)
   {
      try {
         setNameToRoom(idRoom);
      } 
      catch (error) {
         alert(error) 
      }      
   }

   async function getQuestions() {
      if(idRoom){
         const arrayQuestios = await useQuestion.getAllQuestions(idRoom)
         setQuestions(arrayQuestios);
         console.log(arrayQuestios);
      }            
   }


   useEffect(() => {

      async function callGetQuestions() {
         await getQuestions();
      } 
      callGetQuestions();
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
               getQuestions();   
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
               <span>{Questions.length} perguntas</span>
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

            <section className="question-section">
               {
                  Questions.length > 0 ?                      
                     Questions.map((obj, index)=>{
                        return <Question key={index} question={obj}></Question>
                        })
                     :
                     <div className="noquestions">
                        <img src={noquestion} alt="Sem perguntas"></img>
                        <h2>Nenhuma pergunta por aqui...</h2>
                        <span>Seja a primeira pessoa a fazer uma pergunta!!</span>
                     </div>
               }
            </section>

         </main>

      </div>


   );
}