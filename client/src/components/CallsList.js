import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export const CallsList = ({ calls }) => {
  const [num, setNum] = useState(15)
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const handleScroll = () => {
    if (
      document.body.scrollHeight - document.documentElement.scrollTop ===
      document.documentElement.clientHeight
    ) {
      setNum((num) => num + 15)
    }
  }

  if (!calls.length) {
    return <p className="center">Звонков нет</p>
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Номер телефона</th>
            <th>Имя</th>
            <th>Тип</th>
            <th>Эмоциональное состояние</th>
            <th>Город</th>
            <th>Вопрос</th>
            <th>Описание вопроса</th>
            <th>Комментарий</th>
            <th>Статус вопроса</th>
            <th>Дата поступления звонка</th>
            <th>Дата окончания звонка</th>
            <th>Запись звонка</th>
          </tr>
        </thead>

        <tbody>
          {calls.slice(0, num).map((call, index) => {
            return (
              <tr key={call._id}>
                <td>{index + 1}</td>
                <td>{call.call_phone}</td>
                <td>{call.call_FIO}</td>
                <td>{call.call_type}</td>
                <td>{call.call_emoji}</td>
                <td>{call.call_city}</td>
                <td>{call.call_answer}</td>
                <td>{call.call_info}</td>
                <td>{call.call_comment}</td>
                <td>{call.call_status}</td>
                <td>{call.call_startdate}</td>
                <td>{call.call_enddate}</td>
                <td>{call.cdrid}</td>
                <td>
                  <Link to={`/detailcall/${call._id}`}>Открыть</Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
