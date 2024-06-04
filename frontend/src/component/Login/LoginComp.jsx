import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginComp = () => {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      const res = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/');
      if (res.status === 200) {
        message.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col w-1/2 gap-2">
        <h1>Login Form</h1>

        <Form onFinish={handleLogin} autoComplete="off">
          {/* EMAIL */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* PASSWORD */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* BUTTON */}
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
            <Button type="primary" htmlType="submit" className="ml-2">
              <Link to={'/register'}>Register</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginComp;
