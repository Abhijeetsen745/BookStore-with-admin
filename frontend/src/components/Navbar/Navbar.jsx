import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

function Navbar() {
  const [mobileNav, setMobileNav] = useState("hidden");
  const [navOpen, setNavOpen] = useState(false);

  const navBarhandle = () => {
    setMobileNav(mobileNav === "hidden" ? "block" : "hidden");
    setNavOpen(!navOpen);
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  return (
    <>
      <nav className=" main relative z-50 bg-zinc-800 text-white flex items-center justify-between px-8 py-4">
        <Link to="/" className="left flex items-center h-10 me-4">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="booklogo"
          />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </Link>
        <div className="right block md:flex items-center gap-4">
          <div className="hidden md:flex space-x-4 list-none">
            <Link to="/">
              {" "}
              <li className="hover:text-blue-500 transition-all duration-300 cursor-pointer">
                Home
              </li>
            </Link>

            <Link to="/all-books">
              {" "}
              <li className="hover:text-blue-500 transition-all duration-300 cursor-pointer">
                All Books
              </li>
            </Link>

            {isLoggedIn && (
              <div className="flex space-x-4">
                <Link to="cart">
                  {" "}
                  <li className="hover:text-blue-500 transition-all duration-300 cursor-pointer">
                    Cart
                  </li>
                </Link>
                {isLoggedIn === true && role === "admin" ? (
                  <Link to="/profile">
                    {" "}
                    <li className="hover:text-blue-500 transition-all duration-300 cursor-pointer bg-blue-300 border border-blue-200 rounded px-2 py-1 text-black font-semibold">
                      Admin Profile
                    </li>
                  </Link>
                ) : (
                  <Link to="/profile">
                    {" "}
                    <li className="hover:text-blue-500 transition-all duration-300 cursor-pointer bg-blue-300 border border-blue-200 rounded px-2 py-1 text-black font-semibold">
                      Profile
                    </li>
                  </Link>
                )}
              </div>
            )}
          </div>
          <div className="hidden md:flex space-x-4 ">
            {isLoggedIn === false && (
              <>
                {" "}
                <Link
                  to="/login"
                  className="px-4 py-1 border border-blue-500 rounded hover:bg-white
          hover:text-black transition-all duration-300"
                >
                  {" "}
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1 bg-blue-500 rounded hover:bg-white
          hover:text-black transition-all duration-300"
                >
                  {" "}
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <button
            className=" block md:hidden text-white text-3xl font-bold"
            onClick={navBarhandle}
          >
            {mobileNav === "hidden" ? <FiMenu /> : <IoClose />}
          </button>
        </div>
      </nav>
      <div
        className={`${mobileNav} h-screen bg-zinc-800 absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center list-none text-white font-semibold text-4xl`}
      >
        <Link to="/">
          {" "}
          <li
            className={`${mobileNav} hover:text-blue-500 transition-all duration-300 cursor-pointer mb-4`}
            onClick={navBarhandle}
          >
            Home
          </li>
        </Link>

        <Link to="/all-books">
          {" "}
          <li
            className={`${mobileNav} hover:text-blue-500 transition-all duration-300 cursor-pointer mb-4`}
            onClick={navBarhandle}
          >
            All Books
          </li>
        </Link>
        {isLoggedIn && (
          <div>
            <Link to="cart">
              {" "}
              <li
                className={`${mobileNav} hover:text-blue-500 transition-all duration-300 cursor-pointer text-center mb-4`}
                onClick={navBarhandle}
              >
                Cart
              </li>
            </Link>
            {isLoggedIn && role === "admin" ? (
              <Link to="/profile">
                {" "}
                <li
                  className={`${mobileNav} hover:text-blue-500 transition-all duration-300 cursor-pointer mb-4 bg-blue-300 border border-blue-200 rounded px-2 py-1 text-black text-3xl`}
                  onClick={navBarhandle}
                >
                  Admin Profile
                </li>
              </Link>
            ) : (
              <Link to="/profile">
                {" "}
                <li
                  className={`${mobileNav} hover:text-blue-500 text-3xl transition-all duration-300 cursor-pointer mb-4 bg-blue-300 border border-blue-200 rounded px-2 py-1 text-black`}
                  onClick={navBarhandle}
                >
                  Profile
                </li>
              </Link>
            )}
          </div>
        )}
        {!isLoggedIn && (
          <>
            <Link
              to="/login"
              className={`${mobileNav} px-8 mb-4 text-3xl py-2 border border-blue-500 rounded hover:bg-white
            hover:text-black transition-all duration-300`}
              onClick={navBarhandle}
            >
              {" "}
              Log In
            </Link>
            <Link
              to="/signup"
              className={`${mobileNav} px-8 mb-4 text-3xl py-2 bg-blue-500 rounded hover:bg-white
            hover:text-black transition-all duration-300`}
              onClick={navBarhandle}
            >
              {" "}
              Sign Up
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default Navbar;
