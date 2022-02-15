import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userName, setUserName] = useState(null)
  const [userExt, setUserExt] = useState(null)

  const login = useCallback((jwtToken, id, user, ext) => {
    setToken(jwtToken)
    setUserId(id)
    setUserName(user)
    setUserExt(ext)

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: id,
        token: jwtToken,
        userName: user,
        userExt: ext,
      })
    )
  }, [])
  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setUserName(null)
    setUserExt(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId, data.userName, data.userExt)
    }
    setReady(true)
  }, [login])

  return { login, logout, token, userId, ready, userName, userExt }
}
