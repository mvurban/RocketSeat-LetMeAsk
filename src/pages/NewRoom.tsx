import ilustration from '../../src/pages/assets/images/ilustration.svg'
import logoImg from '../../src/pages/assets/images/logo.svg'
import { Button } from '../components/Button'
import { Link, useNavigate } from 'react-router-dom'
import { FormEvent, useState } from 'react'

import '../styles/auth.scss'
import { useAuth } from '../contexts/AuthContext'
import { useRoom} from '../domain/Room'



export function NewRoom() {

   const { user, signOutAll } = useAuth()
   const [roomName, setRoomName] = useState('')
   const Navigate = useNavigate();

   function handleCriateRoom(event: FormEvent) {

      //Previne o comportamento padrão do submit que carrega toda a página.
      event.preventDefault();

      try {

         if (roomName.trim() != '') {
            if (user) {
               const room = useRoom.objRoom(roomName, user?.id);
               const idRoom = useRoom.addRoom(room);

               Navigate("/Room/" + idRoom)
            }
            else
               throw 'Usuário não logado';
         }
         else {
            return;
         }
      }
      catch (e) {
         alert(e);
      }


         //const roomRef = database.ref('rooms');


      }


   function Logout() {
         signOutAll();
      }

      return (
         <div id='page-auth'>

            <aside>
               <img src={ilustration} alt="Ilustração da Home"></img>
               <strong>Toda pergunta tem uma resposta.</strong>
               <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>

            <main>
               <div className='main-content'>
                  <img src={logoImg} alt="logo"></img>
                  <h2>Crie uma nova sala</h2>
                  <form onSubmit={handleCriateRoom}>
                     <input
                        type='text'
                        placeholder='nome da sala'
                        onChange={(event) => setRoomName(event.target.value)}
                        value={roomName} >

                     </input>
                     <Button type='submit'>Criar sala</Button>
                  </form>
                  <p>
                     Quer entrar numa sala já existente? <Link to='/'>clique aqui</Link>
                  </p>
                  <p>
                     <Button onClick={Logout} type='submit'>Sair</Button>
                  </p>
               </div>
            </main>

         </div>
      );
   }