import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {authActions} from '../store/auth'
import {useDispatch} from 'react-redux'

function Login() {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const submit = async (event) => {
    event.preventDefault();
    try {
      if (
        username === "" ||
        password === "" 
        
      ) {
        alert("All fields are required");
      }
      
      else{
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/signin`,{username,password} );
     dispatch(authActions.login());
     dispatch(authActions.changeRole(response.data.role));
      localStorage.setItem('id',response.data.id)
      localStorage.setItem('token',response.data.token)
      localStorage.setItem('role',response.data.role)
      navigate('/profile')
      
      }
     
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className=' h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
    <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
      <p className="text-xl text-zinc-200">Login</p>
      <div className="mt-4">
        <div className="">
          <label htmlFor="username" className='text-zinc-400'>Username</label>
          <input type="text" placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)} name='username' id='username' required
          className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none ' />
        </div>
      
        <div className="mt-2">
          <label htmlFor="password" className='text-zinc-400'>Password</label>
          <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} name='password' id='password' required
          className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none ' />
        </div>
      
        <div className='mt-4'>
          <button className='text-white bg-blue-500 w-full py-2 rounded hover:bg-blue-300' onClick={submit}>Log in</button>
        </div>
        <div className='text-center mt-2 text-white'>Or</div>
        <div className='text-center mt-2 text-white'>Don't have an account? <Link to='/signup' className='underline text-blue-500'> Signup</Link></div>

      </div>
    </div>
  </div>
  )
}

export default Login
