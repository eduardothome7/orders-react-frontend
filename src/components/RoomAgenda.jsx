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
      <table className="myCalendar">
        <thead>
          <tr>
            <td></td>
            {
              room.grids[0].days.map(dayName => (
                <td>
                  {dayName.checked ? <strong>{dayName.date}</strong> : dayName.date}
                </td>
              ))
            }
          </tr>
          <tr>
            <td></td>
            {
              room.grids[0].days.map(dayName => (
                <td>
                  {dayName.checked ? <strong>{dayName.title}</strong> : dayName.title}
                </td>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            room.grids.map(grid => (
              <tr>
                <td>{grid.start_at}</td>
                {
                  grid.days.map(day => (                    
                    <td className={day.event ? 'gridItem checked' : 'gridItem'}>  
                      {day.event ? <strong>Cliente 001</strong> : <small>Livre</small>}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}