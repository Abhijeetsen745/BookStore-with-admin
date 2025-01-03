import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";
import Loader from "../components/Loader/Loader";

function AllBooks() {
  const [data, setData] = useState();

  const fetch = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/getAllbook`);
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
    <div className="bg-zinc-900 h-auto px-12 py-8">
      <h4 className="text-3xl text-yellow-100">All Books</h4>
      {!data && (
        <div className="flex justify-center items-center h-screen bg-zinc-900">
          <Loader />
        </div>
      )}
      <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-12 ">
        {data &&
          data.map((item, i) => (
            <div
              key={i}
              className="hover:scale-105 transition-all duration-300"
            >
              <BookCard data={item} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default AllBooks;
