import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Login from './pages/Login';
import CollabrativeBoard from './pages/CollabrativeBoard';
import SimpleBoard from './pages/SimpleBoard';
import CollabrativeRoom from './pages/CollabrativeRoom';
import Chat from './components/Chat';

const App = () => {
  return (
    
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />}/>
        
        <Route path='/login' element={<Login/>}/>

         <Route path='/Simpleboard' element={<SimpleBoard/>}/>
        <Route path='/Collabrativeboard' element={<CollabrativeRoom/>}/>

        <Route
          path="/board/:roomId"
          element={<CollabrativeBoard/>}
        />
        <Route path="/chat/:roomId" element={<Chat />} />
        

      </Routes>
      
    </BrowserRouter>
  )
}

export default App