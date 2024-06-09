import axios from 'axios';
import { useRef, useState } from 'react';
import api from '../../Api/Api';

const Add = ({ handleClose }) => {
  // const nameRef = useRef(null);
  // const priceRef = useRef(null);

  const [values, setValues] = useState({
    name: '',
    price: '',
  });
  // const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    // const name = nameRef.current.value;
    // const price = priceRef.current.value;

    // try {
    //   await fetch('https://auth-crud-weld.vercel.app/api/auth/products', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       name: name,
    //       price: price,
    //     }),
    //   });
    //   window.location.reload();
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      await api.post(`/products`, values);
      alert('produk berhasil dibuat');
      window.location.reload();
    } catch (error) {
      alert('produk gagal dibuat');
      console.log(error);
    }

    console.log(values);
  };

  return (
    <div>
      {/* MODAL COMPONENT */}

      <div className="modal-box">
        <div className="modal-action flex flex-col w-full ">
          <form method="dialog" onSubmit={handleSubmit} className="text-white">
            <div className="flex flex-col gap-4 w-full mb-4">
              <input name="name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} type="text" placeholder="Name Product" className="input input-bordered w-full max-w-xs" />
              <input name="price" value={values.price} onChange={(e) => setValues({ ...values, price: e.target.value })} type="text" placeholder="Price" className="input input-bordered w-full max-w-xs" />
              <h1>{''}</h1>
            </div>
            <div className="flex gap-2">
              <button className="btn">Save</button>
              <button onClick={handleClose} type="" className="btn">
                cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add;
