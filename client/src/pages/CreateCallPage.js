import React, { useState, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import socket from '../socket'
import moment from 'moment'

export const CreateCallPage = () => {
  const location = useLocation()
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [clientName, setClientName] = useState('')
  const [clientType, setClientType] = useState('')
  const [clientCondition, setClientCondition] = useState('')
  const [clientCity, setClientCity] = useState('')
  const [clientIssue, setClientIssue] = useState('')
  const [clientAppeal, setClientAppeal] = useState('')
  const [clientComment, setClientComment] = useState('')
  const [clientStatus, setClientStatus] = useState('')
  const { userExt } = useContext(AuthContext)
  const [clientEDate, setEDate] = useState('')
  const [save, setSave] = useState(true)

  socket.on('hangupCall', (data) => {
    if (userExt === data.calleridnum || userExt === data.connectedlinenum) {
      setEDate((clientEDate) => moment().format('DD/MM/YYYY HH:mm:ss'))
      setSave((save) => false)
    }
  })

  const pressHandler = async (event) => {
    try {
      await request(
        '/api/call/createcall',
        'POST',
        {
          clientNumber: location.state.clientNum,
          clientName: clientName,
          clientType: clientType,
          clientCondition: clientCondition,
          clientCity: clientCity,
          clientIssue: clientIssue,
          clientAppeal: clientAppeal,
          clientComment: clientComment,
          clientStatus: clientStatus,
          clientSDate: location.state.sdate,
          clientEDate: clientEDate,
          clientRecord: location.state.record,
        },
        { Authorization: `Bearer ${auth.token}` }
      )
      history.push('/calls')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input
            disabled
            id="clientNumber"
            type="text"
            value={location.state.clientNum}
          />
          <label
            htmlFor="clientNumber"
            className="active"
            style={{ color: 'black', fontWeight: 'bold' }}
          >
            Номер телефона клиента
          </label>
        </div>
        <div className="input-field">
          <input
            id="clientName"
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
          <label
            htmlFor="clientName"
            style={{ color: 'black', fontWeight: 'bold' }}
          >
            Имя клиента
          </label>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p>
            <span style={{ color: 'black', fontWeight: 'bold' }}>
              Тип клиента
            </span>
          </p>
          <label>
            <input
              name="type"
              id="clientType"
              type="radio"
              value="Физическое лицо"
              onChange={(e) => setClientType(e.target.value)}
            />
            <span style={{ color: 'black' }}>Физическое лицо</span>
          </label>
          <label>
            <input
              name="type"
              id="clientType"
              type="radio"
              value="Юридическое лицо"
              onChange={(e) => setClientType(e.target.value)}
            />
            <span style={{ color: 'black' }}>Юридическое лицо</span>
          </label>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p>
            <span style={{ color: 'black', fontWeight: 'bold' }}>
              Эмоциональное состояние
            </span>
          </p>
          <label>
            <input
              name="condition"
              id="clientCondition"
              type="radio"
              value="Хорошо настроен"
              onChange={(e) => setClientCondition(e.target.value)}
            />
            <span style={{ color: 'black' }}>Хорошо настроен</span>
          </label>
          <label>
            <input
              name="condition"
              id="clientCondition"
              type="radio"
              value="Нейтральный"
              onChange={(e) => setClientCondition(e.target.value)}
            />
            <span style={{ color: 'black' }}>Нейтральный</span>
          </label>
          <label>
            <input
              name="condition"
              id="clientCondition"
              type="radio"
              value="Агресивный"
              onChange={(e) => setClientCondition(e.target.value)}
            />
            <span style={{ color: 'black' }}>Агресивный</span>
          </label>
        </div>
        <div className="input-field">
          <select
            onChange={(e) => setClientCity(e.target.value)}
            id="clientCity"
            defaultValue={'DEFAULT'}
            style={{ display: 'block' }}
          >
            <option value="DEFAULT" disabled>
              Выберите город
            </option>
            <option value="Тирасполь">Тирасполь</option>
            <option value="Бендеры">Бендеры</option>
            <option value="Днестровск">Днестровск</option>
            <option value="Григориополь и Грирогиопольский р-н">
              Григориополь и Грирогиопольский р-н
            </option>
            <option value="Дубоссары и Дубоссарский р-н">
              Дубоссары и Дубоссарский р-н
            </option>
            <option value="Каменка и Каменский р-н">
              Каменка и Каменский р-н
            </option>
            <option value="Рыбница и Рыбницкий р-н">
              Рыбница и Рыбницкий р-н
            </option>
            <option value="Слободзея и Слободзейский р-н">
              Слободзея и Слободзейский р-н
            </option>
          </select>
        </div>
        <div className="input-field">
          <select
            onChange={(e) => setClientIssue(e.target.value)}
            id="clientIssue"
            defaultValue={'DEFAULT1'}
            style={{ display: 'block' }}
          >
            <option value="DEFAULT1" disabled>
              Возможные направления обращения
            </option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </div>
        <div className="input-field">
          <textarea
            id="clientAppeal"
            className="materialize-textarea"
            value={clientAppeal}
            onChange={(e) => setClientAppeal(e.target.value)}
          />
          <label
            htmlFor="clientAppeal"
            style={{ color: 'black', fontWeight: 'bold' }}
          >
            Суть обращения
          </label>
        </div>
        <div className="input-field">
          <textarea
            id="clientComment"
            className="materialize-textarea"
            value={clientComment}
            onChange={(e) => setClientComment(e.target.value)}
          />
          <label
            htmlFor="clientComment"
            style={{ color: 'black', fontWeight: 'bold' }}
          >
            Дополнительная информация
          </label>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p>
            <span style={{ color: 'black', fontWeight: 'bold' }}>
              Статус звонка
            </span>
          </p>
          <label>
            <input
              name="status"
              id="clientStatus"
              type="radio"
              value="Активен"
              onChange={(e) => setClientStatus(e.target.value)}
            />
            <span style={{ color: 'black' }}>Активен</span>
          </label>
          <label>
            <input
              name="status"
              id="clientStatus"
              type="radio"
              value="Завершен"
              onChange={(e) => setClientStatus(e.target.value)}
            />
            <span style={{ color: 'black' }}>Завершен</span>
          </label>
        </div>
        <div className="center-align">
          <button
            className="btn waves-effect waves-light"
            onClick={pressHandler}
            disabled={save}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}
