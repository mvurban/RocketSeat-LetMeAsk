import ilustration from '../assets/images/ilustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google_icon.svg'
import { Button } from '../../components/Button'
import {useNavigate} from 'react-router-dom'

import './styles.scss'
import { useAuth } from '../../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { useRoom } from '../../domain/Room'


export function Home(){

   const navigate = useNavigate();
   const {user, signInGoogleWithPopUp} = useAuth() 
   const [idRoom, setIdRoom] = useState('')

   async function handleCreateRoom(){

      try{
         if(user)
         {
            navigate("/Room/New")
            //console.log(user);         
         }
         else{
            const user = await signInGoogleWithPopUp();
            if(user)
               navigate("/Room/New")
            //else
               //throw Error("Não há usuario logado");
         }   
      }
      catch(error){
         alert(error);
      }
      
   }
   
   async function handleJoinRoom(event:FormEvent) {
      event.preventDefault();
      if(idRoom.trim() !== ""){
         //Verifico se existe a sala, 
         const room = await useRoom.getRoom(idRoom.trim());
         if(room){
            if(!room.finishedAt)
               navigate(`/Room/${idRoom}`)
            else
               alert('Esta sala já foi encerrada!!')            
         }
         else{
            alert('Sala não existe')            
         }
         //Se existir redireciono pra sala.
      }
      else{
         return;
      }
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
                    <button onClick={handleCreateRoom} className='create_room'>
                        <img src={googleIconImg} alt="Icone do Google"></img>
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                           type='text' 
                           placeholder='Digite o texto da sala'
                           onChange={(event)=>{setIdRoom(event.target.value)}}
                           value={idRoom}
                           ></input>
                        <Button  type='submit'>Entrar na sala</Button>
                    </form>
                </div>
            </main> 
        </div>
    );
}