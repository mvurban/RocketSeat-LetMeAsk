
import '../styles/roomCodeComponent.scss';
import iconSala from '../pages/assets/images/iconSala.svg'


export function RoomCode(props :any){


   function handleCopyRoomCodeToClipboard() {
      navigator.clipboard.writeText(props.children)
   }


   return(
      <button onClick={handleCopyRoomCodeToClipboard}>
         <img src={iconSala} alt="Icone da sala"></img>
         <span>Sala: {props.children}</span>
      </button>
   );
}