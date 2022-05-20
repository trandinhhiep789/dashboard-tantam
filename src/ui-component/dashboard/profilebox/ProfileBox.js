import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Dropdown, Menu } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOGOUT } from '~/app/registerClient/registerClientSlice'

// const menu = (
//   <Menu className="dropdown-custom">
//     <Menu.Item key="accountinfo">
//       <Link to="/accountinfo">
//         <UserOutlined />
//         {'  '}Thông tin cá nhân
//       </Link>
//     </Menu.Item>
//     <Menu.Item key="CacheManager">
//       <Link to="/CacheManager">
//         <LockOutlined />
//         {'  '}Quản lý cache
//       </Link>
//     </Menu.Item>
//     <Menu.Item key="changepassword">
//       <Link to="/changepassword">
//         <LockOutlined />
//         {'  '}Đổi mật khẩu
//       </Link>
//     </Menu.Item>
//     <Menu.Item key="Forms">
//       <Link to="/Forms">
//         <LockOutlined />
//         {'  '}Forms UI
//       </Link>
//     </Menu.Item>
//     <Menu.Item key="UseGuide">
//       <Link to="/UseGuide">
//         <LockOutlined />
//         {'  '}Hướng dẫn sử dụng
//       </Link>
//     </Menu.Item>
//     <Menu.Divider />
//     <Menu.Item key="PageUI">
//       <Link to="/PageUI">
//         <LockOutlined />
//         {'  '}Page UI
//       </Link>
//     </Menu.Item>
//     <Menu.Item key="PartnerUI">
//       <Link to="/PartnerUI">
//         <LockOutlined />
//         {'  '}PartnerUI
//       </Link>
//     </Menu.Item>
//     <Menu.Divider />
//     <Menu.Item key="logout">
//       <Link to="/logout">
//         <UserOutlined />
//         {'  '}Đăng xuất
//       </Link>
//     </Menu.Item>
//   </Menu>
// )

const Logout = () => {
  const dispatch = useDispatch()
  return (
    <div onClick={() => dispatch(LOGOUT())}>Đăng xuất</div>
  )
}

const menu = (
  <Menu
    items={[
      {
        label: <Logout />,
        key: 'Logout',
        icon: <LogoutOutlined />,
        disabled: false
      },
    ]}
  />
)

const ProfileBox = () => {
  const stateLoginInfo = useSelector(state => state.LoginInfo)
  const infoUser = () => {
    try {
      return `${stateLoginInfo.LoginUserInfo.UserName} - ${stateLoginInfo.LoginUserInfo.FullName}`
    } catch (error) {
      return ""
    }
  }
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link">
        <span>{infoUser()}</span>{' '}
        <Avatar
          style={{
            backgroundColor: '#87d068'
          }}
          icon={<UserOutlined />}
        />
      </a>
    </Dropdown>
  )
}

export default ProfileBox