
import '../styles/roomCodeComponent.scss';
import iconSala from '../pages/assets/images/iconSala.svg'
import { TRoomCode } from '../domain/Room';

export function RoomCode(props :TRoomCode ){

   function handleCopyRoomCodeToClipboard() {
      navigator.clipboard.writeText(props.idRoom)
   }


   return(
      <button onClick={handleCopyRoomCodeToClipboard}>
         <img src={iconSala} alt="Icone da sala"></img>
         <span>Sala: {props.idRoom}</span>
      </button>
   );
}