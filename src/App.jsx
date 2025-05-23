import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Rooms from './components/Rooms'
import RoomAgenda from './components/RoomAgenda'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomAgenda />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
