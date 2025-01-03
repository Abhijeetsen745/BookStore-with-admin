import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Profile/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";

function Profile() {
  // const isLoggedIn = useSelector()
  const [data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/getuser`, {
        headers,
      });
      setData(res.data);
    };
    fetch();
  }, []);
  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row  py-8 text-white gap-4">
      {!data && <div className="w-full h-[100%] flex items-center justify-center">
      <Loader /></div>}
      {data && (
        <>
          <div className="w-full md:w-1/6 h-auto">
            <Sidebar data={data}/>
            <MobileNav/>
          </div>
          <div className="w-full md:w-5/6 ">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
