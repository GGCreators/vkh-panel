import React, { useContext, useCallback, useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { CSVLink, CSVDownload } from 'react-csv'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [calls, setCalls] = useState([])

  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    history.push('/')
    history.go()
  }
  const fetchCalls = useCallback(async () => {
    try {
      const fetched = await request('/api/call', 'GET', null, {
        Authorization: `Bearer ${auth.token}`,
      })
      setCalls(fetched)
    } catch (e) {}
  }, [auth.token, request])
  useEffect(() => {
    fetchCalls()
  }, [fetchCalls])

  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">AsteriskClient 2.0</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li style={{ display: 'none' }}>
            <NavLink to="/createcall">Создать звонок</NavLink>
          </li>
          <li>
            <CSVLink data={calls}>Export to CSV</CSVLink>
          </li>
          <li>
            <NavLink to="/calls">Все звонки</NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
              Выйти
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
