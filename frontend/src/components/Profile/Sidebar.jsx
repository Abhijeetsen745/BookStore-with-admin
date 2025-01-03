import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../store/auth";
import { logout,changeRole } from "../../store/auth";

function Sidebar({ data }) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(changeRole("user"));
    localStorage.clear("id");
    localStorage.clear("token");
    localStorage.clear("role");
    history("/");
  };

  return (
    <div className="bg-zinc-800 p-4 rounded flex items-center justify-between flex-col h-auto lg:h-[80vh]">
      <div className="flex items-center justify-center flex-col">
        <img src={data.avatar} alt="/" className="h-[12vh]" />
        <p className="mt-3 text-normal text-zinc-300 ">{data.username}</p>
        <p className="mt-1 text-xl text-zinc-300 font-semibold">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-400 hidden lg:block"></div>
      </div>

      {role === "user" && (
        <div className="w-full  lg:flex  lg:flex-col  items-center justify-center hidden ">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Settings
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className="w-full  lg:flex  lg:flex-col  items-center justify-center hidden ">
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            All Orders
          </Link>
          <Link
            to="/profile/addBook"
            className="text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300"
          >
            Add Book
          </Link>
        </div>
      )}
      <button
        className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300"
        onClick={handleLogout}
      >
        Log Out <FaArrowRightFromBracket className="ms-4" />
      </button>
    </div>
  );
}

export default Sidebar;
