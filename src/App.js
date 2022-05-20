import React, { lazy, memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '~/ui-component/dashboard/Dashboard'
import Loadable from '~/ui-component/loadable-component/Loadable'
import PrivateRoute from './routes/PrivateRoute'
import Login from './ui-component/login/Login'
import NotFound from './ui-component/not-found/NotFound'

const TestToolkitSaga = Loadable(lazy(() => import('~/ui-component/dashboard/test-ruduxtoolkit-saga/TestToolkitSaga')))

const App = memo(() => {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route element={<Dashboard />}>
        <Route index path="/" element={<PrivateRoute><TestToolkitSaga /></PrivateRoute>} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
})

App.displayName = 'App'

export default App