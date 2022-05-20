import { MenuOutlined } from '@ant-design/icons';
// other library
import { Divider } from 'antd';
import React, { memo, useState } from 'react';
import MainRoutes from '~/routes/MainRoutes';
// css
import '../../css/animation.css';
import AppPath from './app-path/AppPath';
import './Dashboard.css';
// layout
import HeaderMainMenuLeft from './header/HeaderMainMenuLeft';
import MainMenuLeftNhatCuong from './main-menu/MainMenuLeftNhatCuong';

const Dashboard = memo((props) => {
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
            <MainRoutes />
          </div>
        </div>
      </div>
    </div>
  )
})

Dashboard.displayName = "Dashboard"

export default Dashboard
