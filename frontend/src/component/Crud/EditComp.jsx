import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../../Api/Api';

const EditComp = () => {
  let { id } = useParams();
  console.log(id);

  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  // const nameRef = useRef();
  // const priceRef = useRef();

  const [values, setValues] = useState({
    name: '',
    price: '',
  });

  const handleBack = () => {
    navigate('/crud');
  };

  const handleEdit = async () => {
    // const name = nameRef.current.value;
    // const price = priceRef.current.value;

    // console.log(name);
    // console.log(price);

    // try {
    //   await fetch(`https://auth-crud-weld.vercel.app/api/auth/products/${id}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       name: name,
    //       price: price,
    //     }),
    //   });

    //   navigate('/crud');
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      await axios.put(`/api/products/${id}`, values);
      window.confirm('apakah benar ingin diedit ?');
      navigate('/crud');
    } catch (error) {
      console.log(error);
    }
  };

  console.log(values);

  return (
    <div>
      {/* CARD COMPONENT */}
      <div className="card w-96 bg-base-100 shadow-xl ">
        <div className="card-body ">
          <div className="border rounded-lg px-2 py-2">
            <form method="dialog" onSubmit={handleEdit} className="text-white">
              <div className="flex flex-col gap-4 w-full mb-4">
                <input name="name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} type="text" placeholder="Name Product" className="input input-bordered w-full max-w-xs" />
                <input name="price" value={values.price} onChange={(e) => setValues({ ...values, price: e.target.value })} type="text" placeholder="Price" className="input input-bordered w-full max-w-xs" />
                <h1>{''}</h1>
              </div>
              <div className="flex justify-between">
                <button className="btn btn-primary">Save</button>
                <button onClick={handleBack} className="btn btn-primary">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditComp;
