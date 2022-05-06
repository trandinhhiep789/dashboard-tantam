import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Avatar } from 'antd'
import { UserOutlined, LockOutlined, LogoutOutlined } from '@ant-design/icons'

class ProfileBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fullName: ''
    }
  }

  componentDidMount() {
    // comment làm ui tý fix sau!
    // const LoginInfo = localStorage.getItem('LoginInfo')
    // if (LoginInfo) {
    //   const LoginInfo1 = JSON.parse(LoginInfo)
    //   this.setState({ fullName: LoginInfo1.LoginUserInfo.FullName })
    // }
  }

  menu() {
    return (
      <Menu className="dropdown-custom">
        <Menu.Item key="accountinfo">
          <Link to="/accountinfo">
            <UserOutlined />
            {'  '}Thông tin cá nhân
          </Link>
        </Menu.Item>
        <Menu.Item key="CacheManager">
          <Link to="/CacheManager">
            <LockOutlined />
            {'  '}Quản lý cache
          </Link>
        </Menu.Item>
        <Menu.Item key="changepassword">
          <Link to="/changepassword">
            <LockOutlined />
            {'  '}Đổi mật khẩu
          </Link>
        </Menu.Item>
        <Menu.Item key="Forms">
          <Link to="/Forms">
            <LockOutlined />
            {'  '}Forms UI
          </Link>
        </Menu.Item>
        <Menu.Item key="UseGuide">
          <Link to="/UseGuide">
            <LockOutlined />
            {'  '}Hướng dẫn sử dụng
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="PageUI">
          <Link to="/PageUI">
            <LockOutlined />
            {'  '}Page UI
          </Link>
        </Menu.Item>
        <Menu.Item key="PartnerUI">
          <Link to="/PartnerUI">
            <LockOutlined />
            {'  '}PartnerUI
          </Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <div
            onClick={() => {
              localStorage.removeItem('username')
              localStorage.removeItem('password')
              window.location.reload()
            }}
          >
            <LogoutOutlined />
            {'  '}Đăng xuất
          </div>
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    const { fullName } = this.state
    return (
      <Dropdown overlay={this.menu} trigger={['click']}>
        <a className="ant-dropdown-link">
          <span>{fullName}</span>{' '}
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
}

// const mapStateToProps = state => {
//   return {
//     AuthenticationInfo: state
//   }
// }

// const ProfileBox = connect(mapStateToProps, null)(ProfileBoxCom)
export default ProfileBox
