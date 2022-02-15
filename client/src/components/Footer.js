import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

export const Footer = () => {
  const { userName, userExt } = useContext(AuthContext)

  return (
    <footer
      className="page-footer blue darken-1"
      style={{ padding: '0', height: '50px' }}
    >
      <div className="footer-copyright">
        <div className="container">
          <div className="row">
            <div className="col s6">
              <h6>
                {userName} / {userExt}
              </h6>
            </div>
            <div className="col s6">
              <h6>© 2021 Copyright by GG Creators</h6>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
