import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import {BrowserRouter, Route, Routes  } from 'react-router-dom';



function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Home />} ></Route> 
            <Route path="/Room/New" element={<NewRoom/>}></Route>     
         </Routes>
      </BrowserRouter>
    
  );
}

export default App;

