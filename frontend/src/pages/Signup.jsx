import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
const [username,setUsername] = useState('')
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [address,setAddress] = useState('')

  const navigate = useNavigate();
 
  const submit = async (event) => {
    event.preventDefault();
    try {
      if (
        username === "" ||
        email === "" ||
        password === "" ||
        address === ""
      ) {
        alert("All fields are required");
      }
      
      else{
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/signup`,{username,email,password,address} );
      console.log(response.data.message);
      navigate('/login');
      }
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-xl text-zinc-200">Sign up</p>
        <div className="mt-4">
          <div className="">
            <label htmlFor="username" className="text-zinc-400">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="username"
              name="username"
              id="username"
              required
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none "
            />
          </div>
          <div className="mt-2">
            <label htmlFor="email" className="text-zinc-400">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="email"
              name="email"
              id="email"
              required
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none "
            />
          </div>
          <div className="mt-2">
            <label htmlFor="password" className="text-zinc-400">
              Password
            </label>
            <input
             
             type="password"
             placeholder="password"
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
              name="password"
              id="password"
              required
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none "
            />
          </div>
          <div className="mt-2">
            <label htmlFor="address" className="text-zinc-400">
              Address
            </label>
            <textarea
              rows={5}
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              placeholder="address"
              name="address"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none "
              required
            />
          </div>
          <div className="mt-4">
            <button
              className="text-white bg-blue-500 w-full py-2 rounded hover:bg-blue-300"
              onClick={submit}
            >
              Sign Up
            </button>
          </div>
          <div className="text-center mt-2 text-white">Or</div>
          <div className="text-center mt-2 text-white">
            Already have an account?{" "}
            <Link to="/login" className="underline text-blue-500">
              {" "}
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
