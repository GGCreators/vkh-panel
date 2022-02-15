import React from 'react'

export const CallCard = ({ call }) => {
  return (
    <>
      <h2>Звонок</h2>
      <p>Номер телефона: {call.clientNumber}</p>
      <p>Имя: {call.clientName}</p>
    </>
  )
}
