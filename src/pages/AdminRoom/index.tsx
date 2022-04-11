import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode";
import { TRoomCode, useRoom } from "../../domain/Room";
import './styles.scss';
import logo from '../assets/images/logo.svg'
import noquestion from '../assets/images/noquestions.svg'
import {useGetRoom} from '../../hooks/useGetRoom'
import { useQuestion } from "../../domain/Question";
import { useEffect } from "react";


export function AdminRoom(){

   const {idRoom} = useParams<TRoomCode>();         

   //TODO UseGetRoom pode vir com a sala vazia, entender como validar no AdminRoom.

   const{ title,  questions, loaded } =  useGetRoom(idRoom || "") ;
   const Navigator = useNavigate();


   // useEffect(()=>{
   //    if(title === ""){
   //       //alert('Sala não existe');
   //       //Navigator('/')
   //    }
   // },[title])

   function handleFinisheRoom(){
      if(window.confirm('Deseja realmente fechar esta sala?')){
         try {
            if(idRoom){
               useRoom.setRoomToFinish(idRoom)               
               Navigator('/')               
            }
            else{
               alert('Sala não encontrada')            
            }            
            
         } catch (error) {
            alert(`Ocorreram problemas no fechamento da sala:${error}`)      
         }
      }      
   }

   function handleDeleteQuestion(QuestionId : string){
      
      if(window.confirm('Deseja realmente remover esta questão?')){
         try {
            if(idRoom){
               useQuestion.delQuestion(idRoom, QuestionId)
            }
            else{
               alert('Sala não encontrada')            
            }            
            
         } catch (error) {
            alert(`Ocorreram problemas na remoção da questão:${error}`)      
         }
      }      
   }  

   return(
      <>
      {loaded ? 
         title ? 
            (
            <div className="adminroom-container">
               <header>
                  <Link to="/"><img src={logo} alt="logo"></img></Link>
                  <div>
                     <RoomCode idRoom={idRoom?idRoom:""}></RoomCode>
                     <Button isOutlined onClick={()=>handleFinisheRoom()}>Encerrar Sala</Button>
                  </div>
               </header>
               <main>
                  <div className="room-title">
                     <h1>{title}</h1> 
                     <span>{questions.length} perguntas</span>
                  </div>
                  
                  <section className="question-section">
                     {
                     questions.length > 0 ?                      
                        questions.map((obj, index)=>{
                           return (
                           <Question key={obj.id} question={obj}>
                              <button className="deleteQuestion" onClick={()=>handleDeleteQuestion(obj.id)}>
                                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 6H5H21" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                 </svg>
                              </button>
                           </Question>
                        )})
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
            ) :  (
            <div>Sem sala</div>
           ) 
      :(
         <div>Carregando...</div>
      )}
      </>
   );
}