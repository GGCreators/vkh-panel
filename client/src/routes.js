import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CallsPage } from './pages/CallsPage'
import { CreateCallPage } from './pages/CreateCallPage'
import { DetailCallPage } from './pages/DetailCallPage'
import { AuthPage } from './pages/AuthPage'

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/calls" exact>
          <CallsPage />
        </Route>
        <Route path="/createcall" exact>
          <CreateCallPage />
        </Route>
        <Route path="/detailcall/:id">
          <DetailCallPage />
        </Route>
        <Redirect to="/calls" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}
