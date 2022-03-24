import ilustration from '../../src/pages/assets/images/ilustration.svg'
import logoImg from '../../src/pages/assets/images/logo.svg'
import googleIconImg from '../../src/pages/assets/images/google_icon.svg'
import { Button } from '../components/Button'
import {useNavigate} from 'react-router-dom'

import '../styles/auth.scss'
import { useContext } from 'react'
import { authContext } from '../contexts/AuthContext'


export function Home(){

   const navigate = useNavigate();
   const {user, loginGoogleWithPopUp} = useContext(authContext)

   async function handlerCreateRoom(){

      if(user)
      {
         //navigate("/Room/New")
         console.log(user);
         
      }
      else{
         await loginGoogleWithPopUp();
      }   

      try{

         const credential = await loginGoogleWithPopUp();
         
         console.log(credential.name);
      }
      catch(error){
         alert(error);
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
                    <button onClick={handlerCreateRoom} className='create_room'>
                        <img src={googleIconImg} alt="Icone do Google"></img>
                        Crie sua sala com o Google
                    </button>
                    <div className='separator'>ou entre em uma sala</div>
                    <form>
                        <input type='text' placeholder='Digite o texto da sala'></input>
                        <Button  type='submit'>Entrar na sala</Button>
                    </form>
                </div>
            </main> 
        </div>
    );
}