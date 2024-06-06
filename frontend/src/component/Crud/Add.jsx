import { useRef } from 'react';

const Add = ({ handleClose }) => {
  const nameRef = useRef(null);
  const priceRef = useRef(null);

  const handleSubmit = async () => {
    const name = nameRef.current.value;
    const price = priceRef.current.value;

    try {
      await fetch('https://auth-crud-weld.vercel.app/api/auth/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          price: price,
        }),
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {/* MODAL COMPONENT */}

      <div className="modal-box">
        <div className="modal-action flex flex-col w-full ">
          <form method="dialog" onSubmit={handleSubmit} className="text-white">
            <div className="flex flex-col gap-4 w-full mb-4">
              <input name="name" ref={nameRef} type="text" placeholder="Name Product" className="input input-bordered w-full max-w-xs" />
              <input name="price" ref={priceRef} type="text" placeholder="Price" className="input input-bordered w-full max-w-xs" />
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
