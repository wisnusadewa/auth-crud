import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../Api/Api';

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchUser = async () => {
    //   try {
    //     const res = await fetch('https://auth-crud-weld.vercel.app/api/auth/users', {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     });
    //     const result = await res.json();
    //     setUsers(result);
    //   } catch (error) {
    //     console.log(error);
    //   }

    try {
      const res = await axios.get(`/api/auth/users`);
      setUsers(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  return (
    <div>
      <h1 className="mb-4">Dashboard</h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.jenisKelamin}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
