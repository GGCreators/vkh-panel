import React, { useState, useContext, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { CallsList } from '../components/CallsList'
import socket from '../socket'
import moment from 'moment'

export const CallsPage = () => {
  const [calls, setCalls] = useState([])
  const { loading, request } = useHttp()
  const { token, userExt } = useContext(AuthContext)
  const history = useHistory()
  socket.on('newCall', (data) => {
    if (userExt === data.calleridnum) {
      history.push({
        pathname: '/createcall',
        state: {
          clientNum: data.connectedlinenum,
          sdate: moment().format('DD/MM/YYYY HH:mm:ss'),
          record: data.record,
        },
      })
    }
  })
  const fetchCalls = useCallback(async () => {
    try {
      const fetched = await request('/api/call', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setCalls(fetched)
    } catch (e) {}
  }, [token, request])
  useEffect(() => {
    fetchCalls()
  }, [fetchCalls])
  if (loading) {
    return <Loader />
  }

  return <>{!loading && <CallsList calls={calls} />}</>
}
