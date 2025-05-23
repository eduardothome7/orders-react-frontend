import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RoomAgenda() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/rooms/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setRoom(data)
      });
  }, [id]);

  if (!room) return <p>Carregando...</p>;

  return (
    <div>
      <div class="myCalendar">
        <div className="row bg-white">
        {/* {
          room.calendar.map(day => (
            <div className='col nowrap'>
              <h5>{ day.title }</h5>
              {
                day.grids.map(grid => (
                  <div className='gridItem'></div>
                ))
              }
            </div>
          ))
        } */}
        </div>
      </div>
    </div>
  );
}