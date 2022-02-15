import { createContext } from 'react'

function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  userName: null,
  userExt: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
})
