import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/rooms')
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setRooms(data.items || [])
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <div className="container">
      {
        rooms.map(room => (
          <div className="card">
            <h4>{ room.title }</h4>
            <p>{ room.price }</p>
            <Link to={`/rooms/${room.id}`}>Ver Agenda</Link>
          </div>
        ))
      }
    </div>
  );
}
