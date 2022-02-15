import React, { useCallback, useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../components/Loader'
import { CallCard } from '../components/CallCard'

export const DetailCallPage = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [call, setCall] = useState(null)
  const callId = useParams().id

  const getCall = useCallback(async () => {
    try {
      const fetched = await request(`/api/call/${callId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setCall(fetched)
    } catch (e) {}
  }, [token, callId, request])
  useEffect(() => {
    getCall()
  }, [getCall])
  if (loading) {
    return <Loader />
  }
  return <>{!loading && call && <CallCard call={call} />}</>
}
