import ilustration from '../../src/pages/assets/images/ilustration.svg'
import logoImg from '../../src/pages/assets/images/logo.svg'
import googleIconImg from '../../src/pages/assets/images/google_icon.svg'
import { Button } from '../components/Button'
import {Link} from 'react-router-dom'

import '../styles/auth.scss'


export function NewRoom(){


   

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
                    <form>
                        <input type='text' placeholder='nome da sala'></input>
                        <Button  type='submit'>Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar numa sala já existente? <Link to='/'>clique aqui</Link>
                     </p>
                </div>
            </main> 

        </div>
    );
}