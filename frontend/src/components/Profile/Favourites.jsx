import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

function Favourites() {
  const [favourites, setFavourites] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/get-favourites-book`,
        { headers }
      );
      setFavourites(res.data.data);
      
    };
    fetch();
  }, [favourites]);
  return (
    <>
      {favourites.length=== 0 && <div className="text-5xl text-zinc-500 font-semibold flex items-center justify-center h-[100%]">No Favourite Books.</div>}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {favourites &&
        favourites.map((item, i) => (
          <div key={i} className="hover:scale-105 transition-all duration-300">
            <BookCard data={item} favourite={true} />
          </div>
        ))}
    </div>
        </>
  );
}

export default Favourites;
