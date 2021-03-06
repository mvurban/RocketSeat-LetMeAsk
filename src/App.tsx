import { Home } from "./pages/Home/";
import { NewRoom } from "./pages/NewRoom/";
import { Room } from "./pages/Room/";
import { AdminRoom } from "./pages/AdminRoom/";
import { Route, Routes  } from 'react-router-dom';
import {AuthContextProvider} from  "./contexts/AuthContext" 

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

