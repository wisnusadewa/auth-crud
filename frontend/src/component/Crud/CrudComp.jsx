import axios from 'axios';
import { Link } from 'react-router-dom';
import api from '../../Api/Api';

const CrudComp = ({ product }) => {
  const { _id, name, price } = product;

  const API_URL = import.meta.env.VITE_API_URL;

  const handleDelete = async () => {
    // try {
    //   await fetch(`https://auth-crud-weld.vercel.app/api/auth/products/${_id}`, {
    //     method: 'DELETE',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });
    //   window.location.reload();
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      await axios.delete(`${API_URL}/api/products/${_id}`);
      window.confirm('apakah benar ingin dihapus ?');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="card w-96 bg-base-100 shadow-xl ">
        <div className="card-body ">
          <div className="border rounded-lg px-2 py-2">
            <h2 className="card-title">{name}</h2>
            <p>{price}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">
                <Link to={`/edit/${_id}`}>Edit</Link>
              </button>
              <button onClick={handleDelete} className="btn btn-primary">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrudComp;
