import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BookCard({ data, favourite }) {
  // console.log(data);
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:data._id
  };
  const handleRemovebook = async () => {
    const res = await axios.put(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/remove-book-from-favourite`,{},
      { headers }
    );  
    alert(res.data.message);
  }

  return (
    <>
    <div className="bg-zinc-800 rounded p-4 flex flex-col ">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="">
          <div className="bg-zinc-900 rounded flex items-center justify-center ">
            <img src={data.url} alt="/" className="h-[40vh] w-full" />
          </div>
          <h2 className="mt-4 text-xl text-white  font-semibold">{data.title}</h2>
          <p className="mt-2 text-zinc-400 font-semibold">{data.author}</p>
          <p className="mt-2 text-xl text-zinc-200 font-semibold">
          ₹ {data.price}
          </p>
          </div>
      </Link>
         {favourite &&  <button className="bg-yellow-100  px-4 py-2 rounded border border-yellow-500 text-black font-semibold mt-4" onClick={handleRemovebook}>
            Remove from favourite
          </button>}
        </div>
    </>
  );
}

export default BookCard;
