import { FormEvent, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode";
import { useAuth } from "../../hooks/useAuth";
import { TQuestion, useQuestion } from "../../domain/Question";
import { TRoomCode } from "../../domain/Room";
import './styles.scss';
import logo from '../assets/images/logo.svg'
import noquestion from '../assets/images/noquestions.svg'
import {useGetRoom} from '../../hooks/useGetRoom'

export function Room(){

   const {idRoom} = useParams<TRoomCode>();      
   const[newQuestion, setNewQuestion] = useState<string>('')
   const {user, signInGoogleWithPopUp} = useAuth();
   const{ title,  questions, setQuestions } = useGetRoom(idRoom || "") ;

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
               //const newArrayQuestions = [...questions, objQuestion]
               //setQuestions(newArrayQuestions)               
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
      await signInGoogleWithPopUp();      
   }

   return(

      <div className="page-container">
         <header>
            <Link to="/"><img src={logo} alt="logo"></img></Link>
            <RoomCode idRoom={idRoom?idRoom:""}></RoomCode>
         </header>
         <main>
            <div className="room-title">
               <h1>{title}</h1> 
               <span>{questions.length} perguntas</span>
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
                        <img src={user.avatar} referrerPolicy="no-referrer" alt={user.name}></img>
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
               questions.length > 0 ?                      
                  questions.map((obj, index)=>{
                     return <Question key={obj.id} question={obj}></Question>
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