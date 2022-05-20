import React, { lazy, memo } from 'react'
import { Route, Routes } from 'react-router-dom'
import Loadable from '~/ui-component/loadable-component/Loadable'
import NotFound from '~/ui-component/not-found/NotFound'
// routing
import PrivateRoute from './PrivateRoute'

// TestToolkitSaga routing
const TestToolkitSaga = Loadable(lazy(() => import('~/ui-component/dashboard/test-ruduxtoolkit-saga/TestToolkitSaga')))

const MainRoutes = memo(() => {
  return (
    <Routes>
      <Route
        path=""
        element={
          <PrivateRoute>
            <TestToolkitSaga />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={
          <PrivateRoute>
            <NotFound />
          </PrivateRoute>
        }
      />
    </Routes>
  )
})

export default MainRoutes
