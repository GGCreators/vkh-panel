import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = (event) => {
    event.preventDefault()
    auth.logout()
    history.push('/')
    history.go()
  }
  return (
    <nav>
      <div className="nav-wrapper blue darken-1" style={{ padding: '0 2rem' }}>
        <span className="brand-logo">AsteriskClient 2.0</span>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li style={{ display: 'none' }}>
            <NavLink to="/createcall">Создать звонок</NavLink>{' '}
          </li>
          <li>
            <NavLink to="/calls">Все звонки</NavLink>{' '}
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
