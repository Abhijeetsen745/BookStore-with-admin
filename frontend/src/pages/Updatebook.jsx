import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Updatebook() {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });
  const { id } = useParams();
  const navigate = useNavigate()
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid:id
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const submit = async () => {
    try {
      if (
        data.url === "" ||
        data.title === "" ||
        data.author === "" ||
        data.price === "" ||
        data.desc === "" ||
        data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const res = await axios.put(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/updateBook`,
          data,
          { headers }
        );
       
        alert(res.data.message);
        navigate(`/view-book-details/${id}`)
      }
    } catch (error) {
      alert(error.res.data.message);
    }
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

  return (
    <div className="bg-zinc-900 h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Update Book
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label htmlFor="" className="text-zinc-400">
            Image
          </label>
          <input
            type="text"
            placeholder="url of image"
            required
            value={data.url}
            name="url"
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-300 p-2 outline-none"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Title of book
          </label>
          <input
            type="text"
            placeholder="title of book"
            required
            value={data.title}
            name="title"
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-300 p-2 outline-none"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Author of book
          </label>
          <input
            type="text"
            placeholder="title of book"
            required
            value={data.author}
            name="author"
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-300 p-2 outline-none"
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className=" w-3/6 ">
            <label htmlFor="" className="text-zinc-400">
              Language
            </label>
            <input
              type="text"
              placeholder="language of book"
              required
              value={data.language}
              name="language"
              onChange={change}
              className="w-full mt-2 bg-zinc-900 text-zinc-300 p-2 outline-none"
            />
          </div>
          <div className="w-3/6 gap-4">
            <label htmlFor="" className="text-zinc-400">
              Price
            </label>
            <input
              type="text"
              placeholder="price of book"
              required
              value={data.price}
              name="price"
              onChange={change}
              className="w-full mt-2 bg-zinc-900 text-zinc-300 p-2 outline-none"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Desciption
          </label>
          <textarea
            type="text"
            placeholder="desciption of book"
            required
            value={data.desc}
            name="desc"
            onChange={change}
            className="w-full mt-2 bg-zinc-900 text-zinc-300 p-2 outline-none"
          />
        </div>
        <button
          className="mt-4 px-4 py-2 rounded bg-yellow-300 text-zinc-800 hover:bg-blue-500 hover:text-white"
          onClick={submit}
        >
          Update Book
        </button>
      </div>
    </div>
  );
}

export default Updatebook;
