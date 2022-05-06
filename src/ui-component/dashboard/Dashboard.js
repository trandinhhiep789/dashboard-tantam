import React, { memo, useState } from 'react'

// other library
import { Spin, Divider } from 'antd'
import { MenuOutlined } from '@ant-design/icons'

// css
import '../../css/animation.css'
import './Dashboard.css'

// layout
import HeaderMainMenuLeft from './header/HeaderMainMenuLeft'
import AppPath from './app-path/AppPath'
import MainMenuLeftNhatCuong from './main-menu/MainMenuLeftNhatCuong'

// main routing
import MainRoutes from '~/routes/MainRoutes'

//-----------------------|| MAIN LAYOUT ||-----------------------//

const Dashboard = memo(({ children }) => {
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

export default Dashboard
