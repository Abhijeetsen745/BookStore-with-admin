import React, { useEffect, useState } from "react";
import axios from "axios";
import { GrLanguage } from "react-icons/gr";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";


function ViewBookDetails() {
  const { id } = useParams();
  const navigate = useNavigate()

  const [data, setData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id
  };
  const fetch = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/get-book-byid/${id}`,{},{headers}
      );
      // console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  const handleDelete = async () => {
    try {
      
      const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/deleteBook`,{headers})
      alert(res.data.message);
      navigate('/all-books')
      
    } catch (error) {
      console.log(error);
      
    }
     
  }
  
  const handleFavourite = async () => {
    const res = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/add-book-to-favourite`,{},{headers})
       alert(res.data.message);
       
  }

  const handleCart = async () => {
    const res = await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/add-to-cart`,{},{headers})
       alert(res.data.message);
       return;
  }
  return (
    <>
      {!data && (
        <div className="flex justify-center items-center h-screen bg-zinc-900">
          <Loader />
        </div>
      )}
      {data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 lg:flex lg:flex-row flex-col gap-8">
          <div className=" rounded p-4  lg:w-3/6 ">
            <div className="flex items-start lg:flex-row flex-col justify-around bg-zinc-800 p-12 rounded ">
              <img
                src={data.url}
                alt="/"
                className="h-[50vh] lg:h-[70vh] rounded lg:pr-2"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex md:flex-col lg:space-y-4 gap-6 pt-6">
                  <button className="bg-white text-3xl rounded p-2 text-red-500" onClick={handleFavourite}>
                    <FaHeart />
                  </button>
                  <button className="bg-blue-500 text-3xl rounded p-2 text-white" onClick={handleCart}>
                    <FaShoppingCart />
                  </button>
                </div>
              )}
               {isLoggedIn === true && role === "admin" && (
                <div className="flex md:flex-col lg:space-y-4 gap-6 pt-6">
                  <Link to={`/updateBook/${id}`} className="bg-white text-3xl rounded p-2 ">
                  <FaEdit />

                  </Link>
                  <button className="bg-white text-3xl rounded p-2 " onClick={handleDelete}>
                  <MdOutlineDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl font-semibold text-zinc-300">
              {data.title}
            </h1>
            <p className="mt-1 text-zinc-400">by {data.author}</p>
            <p className="mt-4 text-zinc-500 text-xl">by {data.desc}</p>
            <p className="mt-4 text-zinc-500 text-xl">by {data.desc}</p>
            <p className="mt-4 text-zinc-400 text-xl flex items-center justify-start">
              {" "}
              <GrLanguage className="me-3" />
              {data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price : ₹ {data.price}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewBookDetails;
