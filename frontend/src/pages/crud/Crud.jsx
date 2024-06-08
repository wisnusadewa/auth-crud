import React, { useEffect, useState } from 'react';
import CrudComp from '../../component/Crud/CrudComp';
import Add from '../../component/Crud/Add';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Crud = () => {
  const [isModal, setIsModal] = useState(false);

  const handleAdd = () => {
    setIsModal(true);
  };

  const handleClose = () => {
    setIsModal(false);
  };

  const [items, setItems] = useState();

  const getData = async () => {
    // try {
    //   const res = await fetch('https://auth-crud-weld.vercel.app/api/auth/products');
    //   const result = await res.json();
    //   setItems(result);
    //   console.log(result);
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      const res = await axios.get('/api/auth/products');
      setItems(res.data);
      console.log(items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full flex flex-col h-screen">
      <div className="my-5 flex justify-between mx-8">
        <div>
          {isModal ? (
            <Add handleClose={handleClose} />
          ) : (
            <button className="btn" onClick={handleAdd}>
              Add New Product
            </button>
          )}
        </div>
        <div>
          <button className="btn">
            <Link to={'/'}>Back</Link>
          </button>
        </div>
      </div>
      <div className="">
        {items?.map((product) => {
          return <CrudComp key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};

export default Crud;
