import React, { memo, useState } from 'react'
import HeaderMainMenuLeft from './header/HeaderMainMenuLeft'
import { MenuOutlined } from '@ant-design/icons'
import '../../css/animation.css'
import './Dashboard.css'
import { Spin, Divider } from 'antd'
import { Routes, Route, Link } from 'react-router-dom'
import AppPath from './app-path/AppPath'
import NotFound from '../../ui-component/not-found/NotFound'
import PrivateRoute from '../../routes/PrivateRoute'

import MainMenuLeftNhatCuong from './main-menu/MainMenuLeftNhatCuong'
import TestToolkitSaga from './test-ruduxtoolkit-saga/TestToolkitSaga'

const Dashboard = memo(() => {
  const [isExpandWidthMenuLeft, setIsExpandWidthMenuLeft] = useState(false)

  return (
    <div className="dashboard">
      <div className="dashboard__header animated fadeInDown">
        <HeaderMainMenuLeft />
      </div>
      <div className="dashboard--dflex">
        {/* main menu left */}
        <div className="dashboard__mainMenuLeft__div">
          <div
            className={
              isExpandWidthMenuLeft
                ? 'dashboard__mainMenuLeft animated fadeInLeftBig'
                : 'dashboard__mainMenuLeft--hover animated fadeInLeftBig'
            }
          >
            {/* icon menu */}
            <div className="dashboard__mainMenuLeft--iconMenu">
              <div>
                <MenuOutlined />
              </div>
            </div>
            <div className="mainMenuLeft">
              <MainMenuLeftNhatCuong setIsExpandWidthMenuLeft={setIsExpandWidthMenuLeft} />
            </div>
          </div>
        </div>

        <div className="dashboard__mainMenuLeft__div__overlay"></div>
        {/* child component will appear here */}

        <div className="dashboard__contentRight">
          <AppPath />
          <Divider />
          <div>
            <Routes>
              {/* PrivateRoute */}
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
          </div>
        </div>
      </div>
    </div>
  )
})

export default Dashboard
