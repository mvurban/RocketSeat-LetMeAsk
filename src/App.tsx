import { Home } from "./pages/Home/";
import { NewRoom } from "./pages/NewRoom/";
import { Room } from "./pages/Room/";
import { Route, Routes  } from 'react-router-dom';
import {AuthContextProvider} from  "./contexts/AuthContext" 
import { AdminRoom } from "./pages/AdminRoom/";

function App() {

   return (

      <AuthContextProvider>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="Room/New" element={<NewRoom />} />
            <Route path="Room/:idRoom"  element={<Room />} />
            <Route path="Admin/Room/:idRoom" element={<AdminRoom />} />
         </Routes>
      </AuthContextProvider>
      
  );
}

export default App;

