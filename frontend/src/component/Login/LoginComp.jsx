import { Button, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../Api/Api';

const LoginComp = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async (values) => {
    // try {
    //   const res = await fetch('/api/auth/login', {
    //     mode: 'cors',
    //     credentials: 'include',
    //     method: 'POST',
    //     headers: {
    //       'Content-type': 'application/json',
    //     },
    //     body: JSON.stringify(values),
    //   });

    //   const data = await res.json();
    //   localStorage.setItem('token', data.token);
    //   navigate('/');
    //   if (res.status === 200) {
    //     message.success(data.message);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      if (res.status === 201) {
        message.success(res.data.message);
      }
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      // message.error(error.response.data.message);
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
