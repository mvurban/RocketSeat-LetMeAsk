import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import {BrowserRouter, Route, Routes  } from 'react-router-dom';
import {AuthContextProvider} from  "./contexts/AuthContext" 

function App() {

   return (
      
      <BrowserRouter>
         <AuthContextProvider>
            <Routes>
               <Route path="/"  element={<Home />} ></Route> 
               <Route path="/Room/New" element={<NewRoom/>}></Route>     
            </Routes>
         </AuthContextProvider>
      </BrowserRouter>
    
  );
}

export default App;

