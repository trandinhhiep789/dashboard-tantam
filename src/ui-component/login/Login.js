import React, { memo } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { useNavigate } from "react-router-dom";
import './Login.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const index = memo(() => {
  let navigate = useNavigate();
  const onFinish = (values) => {
    if( values.username == "admin123" && values.password == "123"){
      localStorage.setItem('username', values.username);
      localStorage.setItem('password', values.password);
      Notify.success('Đăng nhập thành công');
      navigate('/');
    }
    else{
      Notify.failure("Sai tài khoản hoặc mật khẩu")
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="FormLogin">
      <div className="BgForm">
        <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
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
                message: 'Vui lòng nhập tài khoản',
              },
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
                message: 'Vui lòng nhập mật khẩu',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Duy trì đăng nhập</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
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