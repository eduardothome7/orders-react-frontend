import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function RoomAgenda() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [dateEventTarget, setDateEventTarget] = useState(false)
  const [gridTarget, setGridTarget] = useState(false)
  const [eventTarget, setEventTarget] = useState(false)
  const [showEventModal, setShowEventModal] = useState(false)
  const [newEventModal, setNewEventModal] = useState(false)

  function openNewEventModal(day, grid) {
    setNewEventModal(true)
    setDateEventTarget(day)
    setGridTarget(grid)
  }

  const showEvent = (event) => {
    setShowEventModal(true)
    setEventTarget(event)
  }

  const closeModal = () => {
    setGridTarget(null)
    setDateEventTarget(null)
    setShowEventModal(false)
    setNewEventModal(false)
  }

  const cancelEvent = async () => {
    try {

      const response = await fetch(`http://localhost:8000/events/${eventTarget.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Erro ao deletar:', error);
        return;
      }

      fetch(`http://localhost:8000/rooms/${id}`)
        .then(res => res.json())
        .then(data => {
          setRoom(data)
      })    

      toast.success("Evento cancelado com sucesso!");

      closeModal()

    } catch (err) {
      alert(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())

    try {
      await fetch(`http://localhost:8000/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      fetch(`http://localhost:8000/rooms/${id}`)
        .then(res => res.json())
        .then(data => {
          setRoom(data)
        })    

      toast.success("Evento criado com sucesso!");

      closeModal()

    } catch (err) {
      alert(err)
    }
  }

  useEffect(() => {
    fetch(`http://localhost:8000/rooms/${id}`)
      .then(res => res.json())
      .then(data => {
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
                    <td className={day.event ? 'gridItem checked' : 'gridItem'} onClick={() => {
                      if (day.event) {
                        showEvent(day.event)
                      } else {
                        openNewEventModal(day, grid)
                      }
                    }}>
                      {day.event ? <small><strong>#{day.event.id}</strong></small> : <small>Livre</small>}
                    </td>
                  ))
                }
              </tr>
            ))
          }
        </tbody>
      </table>

      {newEventModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Novo Agendamento</h3>
            <p>{ dateEventTarget.date }</p>
            <p>{ gridTarget.start_at } até { gridTarget.end_at }</p>
            <form onSubmit={handleSubmit}>

              <input type="hidden" name="room_id" value={ id } />
              <input type="hidden" name="pos" value={ dateEventTarget.pos } />
              <input type="hidden" name="day" value={ dateEventTarget.dayYear } />
              <input type="hidden" name="year" value={ dateEventTarget.year } />

              <button className="transparent-button" onClick={closeModal}>Cancelar </button>
              <button type="submit">Salvar</button>
            </form>
          </div>
        </div>
      )}

      {showEventModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Agendamento #{eventTarget.id}</h3>
            <p></p>
            <button className="transparent-button" onClick={closeModal}>Fechar</button>
            <button className="danger" onClick={cancelEvent}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}