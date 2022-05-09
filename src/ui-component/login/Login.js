import React, { memo, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, Checkbox } from 'antd'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { Report } from 'notiflix/build/notiflix-report-aio'

import { AUTHEN_HOSTNAME, COOKIELOGIN, SESSION_EXPIRE_MINUTE } from '~/app/constants/systemVars'
import { callRegisterClient } from '~/app/toolkit/registerClientSlide'
import { callLogin, loginSuccess } from '~/app/toolkit/loginClientSlide'
import { setCookie, getCookie } from '~/library/CommonLib'

import MD5Digest from '~/library/cryptography/MD5Digest'

const index = memo(({ props }) => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const [isClickLoginButton, setIsClickLoginButton] = useState(false)
  const [isLoginSuccess, setIsLoginSuccess] = useState(false)
  const [isRemember, setIsRemember] = useState(false)
  const [txtUserName, setTxtUserName] = useState('')
  const [txtPassword, setTxtPassword] = useState('')
  const [loginMessage, setLoginMessage] = useState('')

  const onFinish = values => {
    // if (values.username == 'admin123' && values.password == '123') {
    //   localStorage.setItem('username', values.username)
    //   localStorage.setItem('password', values.password)
    //   Notify.success('Đăng nhập thành công')
    //   navigate('/')
    // } else {
    //   Notify.failure('Sai tài khoản hoặc mật khẩu')
    // }

    setIsClickLoginButton(true)
    const userName = values.username
    const passWord = MD5Digest(values.password)
    registerClient(userName, passWord)
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    let sessionlogin = getCookie(COOKIELOGIN)
    if (sessionlogin) {
      let LoginInfo = JSON.parse(sessionlogin)
      loginSuccess(LoginInfo.LoginUserInfo, LoginInfo.TokenString, LoginInfo.Password)
      setIsLoginSuccess(true)
    }
  }, [])

  const registerClient = async (username, password) => {
    const reslut = await dispatch(callRegisterClient(AUTHEN_HOSTNAME, username, password))
    // reslut.then(registerResult => {
    //   if (!registerResult.IsError) {
    //     this.callLogin(username, password)
    //   } else {
    //     this.setState({ LoginMessage: registerResult.Message })
    //   }
    // })
    console.log('reslutreslutreslutreslutreslutreslut', reslut)
  }
  const callLoginApi = async (username, password) => {
    await callLogin(username, password).then(loginResult => {
      if (!loginResult.IsError) {
        setIsLoginSuccess(true)
        let LoginInfo = JSON.stringify(this.props.AuthenticationInfo.LoginInfo)
        localStorage.setItem('LoginInfo', LoginInfo)
        if (isRemember) {
          setCookie(COOKIELOGIN, LoginInfo, SESSION_EXPIRE_MINUTE)
        }
        const { from } = props.location.state || { from: { pathname: '/' } }
        props.navigation.navigate(from)
        setIsClickLoginButton(true)
      } else {
        setIsClickLoginButton(false)
        Report.failure('Thông báo', loginResult.Message, 'Okay')
      }
    })
  }

  return (
    <div className="FormLogin">
      <div className="BgForm">
        <Form
          name="basic"
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tài khoản'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu'
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Checkbox>Duy trì đăng nhập</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* circle MWG */}
      <div className="circleMWG phoneNumber">
        <div className="circleMWG__content">
          <b className="circleMWG__content--color">MWG</b>
        </div>
      </div>
      {/* circle TẬN TÂM */}
      <div className="circleTanTam phoneNumber">
        <div className="circleTanTam__content">
          <b className="circleTanTam__content--color">TẬN TÂM</b>
        </div>
      </div>
    </div>
  )
})

export default index
