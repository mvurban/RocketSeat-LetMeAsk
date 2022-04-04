import { FormEvent, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "../../components/Button";
import { Question } from "../../components/Question";
import { RoomCode } from "../../components/RoomCode";
import { useAuth } from "../../hooks/useAuth";
import { TRoomCode } from "../../domain/Room";
import './styles.scss';
import logo from '../assets/images/logo.svg'
import noquestion from '../assets/images/noquestions.svg'
import {useGetRoom} from '../../hooks/useGetRoom'

export function AdminRoom(){

   const {idRoom} = useParams<TRoomCode>();      
   const{ title,  questions, setQuestions } = useGetRoom(idRoom || "") ;


   return(

      <div className="page-container">
         <header>
            <Link to="/"><img src={logo} alt="logo"></img></Link>
            <div>
               <RoomCode idRoom={idRoom?idRoom:""}></RoomCode>
               <Button isOutlined>Encerrar Sala</Button>
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