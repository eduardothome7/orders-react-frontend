import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Rooms from './components/Rooms'
import RoomAgenda from './components/RoomAgenda'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="dark" // ou 'dark'
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Rooms />} />
          <Route path="/rooms/:id" element={<RoomAgenda />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
