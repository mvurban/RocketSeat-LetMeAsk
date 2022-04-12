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
import { useGetRoom } from '../../hooks/useGetRoom'
import { TLike, useLike } from "../../domain/Like";

export function Room() {

   const { idRoom } = useParams<TRoomCode>();
   const [newQuestion, setNewQuestion] = useState<string>('')
   const { user, signInGoogleWithPopUp } = useAuth();
   const { title, questions, loaded, fineshed } = useGetRoom(idRoom || "");

   function handleSendQuestion(event: FormEvent) {

      event.preventDefault();

      if (newQuestion.trim() !== '') {
         if (user) {
            if (idRoom) {
               const objQuestion = {
                  content: newQuestion,
                  author: user,
                  isAnswered: false,
                  isHightLighted: false
               } as TQuestion

               useQuestion.addQuestion(idRoom, objQuestion)
               setNewQuestion('');
            }
            else {
               throw new Error('Sala não encontrada')
            }
         }
         else {
            throw new Error('Usuário não logado!!')
         }
      }
      else {
         throw new Error('A pergunta não pode ser vazia!!')
      }
   }

   async function handleLikeQuestion(idQuestion: string, likeByCurrentUser: TLike | undefined) {

      if (idRoom && user) {
         //const objLike = await useLike.getLikeOfQuestionAndUser(idRoom, idQuestion, user.id);

         if (!likeByCurrentUser)
            useLike.addLike(idRoom, idQuestion, user.id)
         else
            useLike.delLike(idRoom, idQuestion, likeByCurrentUser.id)
      }
   }

   async function handleLogin() {
      await signInGoogleWithPopUp();
   }

   return (
      <>
         {loaded ? 

            <div className="room-page-container">
               <header>
                  <Link to="/"><img src={logo} alt="logo"></img></Link>
                  <RoomCode idRoom={(idRoom && title && !fineshed) ? idRoom : (fineshed ? "Encerrada" : "Inexistente")}></RoomCode>
               </header>
               <main>
                  <div className="room-title">
                     <h1>{title}</h1>
                     <span>{questions.length} perguntas</span>
                  </div>

                  {!fineshed && title ? 
                     <>
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
                              )}
                              <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                           </div>
                        </form>

                        <section className="question-section">
                           {
                              questions.length > 0 ?
                                 questions.map((obj, index) => {
                                    return (
                                       <Question key={obj.id} question={obj}>
                                          <button onClick={() => handleLikeQuestion(obj.id, obj.likeByCurrentUser)} className="like-button">
                                             <span>{obj.likes?.length}</span>
                                             <svg className={obj.likeByCurrentUser ? "liked" : ""} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                             </svg>
                                          </button>
                                       </Question>
                                    )
                                 })
                                 :
                                 <div className="noquestions">
                                    <img src={noquestion} alt="Sem perguntas"></img>
                                    <h2>Nenhuma pergunta por aqui...</h2>
                                    <span>Seja a primeira pessoa a fazer uma pergunta!!</span>
                                 </div>
                           }
                        </section>
                     </>
                  : 
                     ""
                  }

               </main>
            </div>
         :
            <div>Carregando...</div>
         }
      </>

   );
}