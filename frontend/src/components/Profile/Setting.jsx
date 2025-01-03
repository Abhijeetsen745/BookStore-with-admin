import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

function Setting() {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/getuser`, {
          headers,
        });
        console.log(res.data.data);
        setProfileData(res.data);
        setValue({ address: res.data.address });
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);
  const change = (e)=>{
    const {name,value} = e.target;
    setValue({...value,[name]:value})
  }
  const handleAddress = async (e) => {
    
    const res = await axios.put('${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/updateAddress',value,{headers})
    alert(res.data.message);
    
  }

  return (
    <>
      {!profileData && (
        <div className="flex justify-center items-center h-screen bg-zinc-900">
          <Loader />
        </div>
      )}
      {profileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div className="">
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.username}
              </p>
            </div>
            <div className="">
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
              name="address"
              value={value.address}
              rows={5}
              onChange={change}
              placeholder="Address"
              className="p-2 bg-zinc-800 rounded mt-2 font-semibold"
            ></textarea>
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={handleAddress} className="p-2 text-zinc-800 bg-yellow-500 rounded mt-2 font-semibold hover:cursor-pointer">Update</button>

          </div>
        </div>
      )}
    </>
  );
}

export default Setting;
