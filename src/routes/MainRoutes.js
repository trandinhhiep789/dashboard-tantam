import React, { memo, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import Dashboard from '~/ui-component/dashboard/Dashboard'
import NotFound from '~/ui-component/not-found/NotFound'

// routing
import PrivateRoute from './PrivateRoute'
import Loadable from '~/ui-component/loadable-component/Loadable'

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
