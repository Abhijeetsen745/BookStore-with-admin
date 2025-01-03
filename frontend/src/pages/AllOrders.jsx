import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaUserLarge } from "react-icons/fa6";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import SeeUserdata from "./SeeUserdata";

function AllOrders() {
  const [AllOrders, setAllOrders] = useState();
  const [options, setOptions] = useState(-1);
  const [value, setValue] = useState({ status: "" });
  const [userDiv,setuserDiv] = useState('hidden')
  const [userDivData,setuserDivdata] = useState({username:'',email:'',address:''})

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const fetch = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/get-all-orders`, {
        headers,
      });

      setAllOrders(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, [AllOrders]);
  const change = (e) => {
    setValue({ status: e.target.value });
  };
  const submitChanges = async (i) => {
    try {
      console.log(AllOrders);
      const id = AllOrders[i]._id;
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/update-status/${id}`,
        value,
        { headers }
      );
      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!AllOrders && (
        <div className="flex justify-center items-center h-screen bg-zinc-900">
          <Loader />
        </div>
      )}
      {AllOrders && AllOrders.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[5%] md:w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1 className="">Books</h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[30%] md:w-[14%] lg:pl-6">
              <h1 className="">Status</h1>
            </div>
            <div className="w-[10%] md:w-[3%] lg:pl-2 ">
              <h1 className="">
                <FaUserLarge />
              </h1>
            </div>
          </div>
          {AllOrders &&
            AllOrders.map((items, i) => (
              <div
                className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer"
                key={i}
              >
                <div className="w-[3%]">
                  <h1 className="text-center">{i + 1}.</h1>
                </div>
                <div className="w-[40%] md:w-[22%]">
                  <Link
                    to={`view-book-details/${items.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {items.book.title}
                  </Link>
                </div>
                <div className="w-0 md:w-[45%] hidden md:block">
                  <h1 className="">{items.book.desc.slice(0, 50)}...</h1>
                </div>
                <div className="w-[17%] md:w-[9%]">
                  <h1 className="">₹{items.book.price}</h1>
                </div>
                <div className="w-[30%] md:w-[16%] flex justify-around">
                  <div>
                    <h1 className="font-semibold">
                      <button
                        className="hover:scale-105 transition-all duration-300"
                        onClick={() => setOptions(i)}
                      >
                        {items.status === "Order placed" ? (
                          <div className="text-green-500">{items.status}</div>
                        ) : items.status === "Cancelled" ? (
                          <div className="text-red-500">{items.status}</div>
                        ) : (
                          <div className="text-yellow-500">{items.status}</div>
                        )}
                      </button>
                      {options === i && (
                        <div className={`${options === i ? "flex" : "hidden"}`}>
                          <select
                            name="status"
                            id=""
                            className="bg-gray-800"
                            value={value.status}
                            onChange={change}
                          >
                            {[
                              "Order placed",
                              "Out for delievery",
                              "Delievered",
                              "Cancelled",
                            ].map((item, i) => (
                              <option value={item} key={i}>
                                {item}
                              </option>
                            ))}
                          </select>
                          <button
                            className="bg-green-500 hover:bg-pink-500 mx-2"
                            onClick={() => {
                              setOptions(-1);
                              submitChanges(i);
                            }}
                          >
                            <FaCheck />
                          </button>
                        </div>
                      )}
                    </h1>
                  </div>
                  <div className="w-[10%] md:w-[5%]">
                    <button className="text-5xl hover:text-orange-500" onClick={()=>{
                      setuserDiv('fixed')
                      setuserDivdata({username:'xyz',email:'xyz@me.com',address:'xyz'})                                            
                    }}>
                      {" "}
                      <BsBoxArrowUpRight className="h-[18px] rounded font-semibold" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      { 
      
        userDivData && (
          <SeeUserdata
           userDiv = {userDiv}
           userDivData = {userDivData}
           setuserDiv = {setuserDiv}
          />
        )
      }
    </>
  );
}

export default AllOrders;
