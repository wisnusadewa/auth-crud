import { Button, Form, Input, message, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const RegisterComp = () => {
  const { Option } = Select;
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    // try {
    //   const res = await fetch('/api/auth/signup', {
    //     mode: 'cors',
    //     credentials: 'include',
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(values),
    //   });

    //   const data = await res.json();
    //   navigate('/login');
    //   if (res.status === 201) {
    //     message.success(data.message);
    //   } else if (res.status === 500) {
    //     message.error(data.message);
    //   } else {
    //     message.error('registrasi gagal');
    //   }
    // } catch (error) {
    //   message.error(data.message);
    // }

    try {
      const res = await axios('https://auth-crud-weld.vercel.app/api/auth/signup', values);

      console.log(res);
      if (res.status === 201) {
        message.success(res.data.message);
      }
      navigate('/login');
    } catch (error) {
      message.error(error.response.data.message);
      console.log(error.response.data);
    }

    console.log('values : ', values);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="flex flex-col w-1/2 gap-2">
        <h1>Register Form</h1>

        <Form onFinish={handleRegister} autoComplete="off">
          {/* NAME */}
          <Form.Item
            label="name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

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

          {/* JENIS KELAMIN */}
          <Form.Item
            name="jenisKelamin"
            label="Gender"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Jenis Kelamin" allowClear>
              <Option value="male">Pria</Option>
              <Option value="female">Wanita</Option>
            </Select>
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
              Submit
            </Button>
            <Button type="primary" htmlType="submit" className="ml-2">
              <Link to={'/login'}>To Login</Link>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterComp;
