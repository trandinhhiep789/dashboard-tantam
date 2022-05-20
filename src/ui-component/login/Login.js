import { Button, Checkbox, Form, Input } from 'antd'
import React, { memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { AUTHEN_HOSTNAME, COOKIELOGIN } from '~/app/constants/systemVars'
import { LOGIN_SUCCESS, REGISTER_CLIENT_LOADING } from '~/app/registerClient/registerClientSlice'
import { getCookie } from '~/library/CommonLib'
import MD5Digest from '~/library/cryptography/MD5Digest'
import './Login.css'

const Login = memo(() => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    let sessionLogin = getCookie(COOKIELOGIN)
    if (sessionLogin) {
      sessionLogin = JSON.parse(sessionLogin)
      dispatch(LOGIN_SUCCESS(sessionLogin))
      let from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }, [])

  const onFinish = values => {
    const userName = values.username
    const passWord = MD5Digest(values.password)
    dispatch(REGISTER_CLIENT_LOADING({ AUTHEN_HOSTNAME, userName, passWord }))
    let from = location.state?.from?.pathname || '/'
    navigate(from, { replace: true })
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

Login.displayName = "Login"

export default Login
