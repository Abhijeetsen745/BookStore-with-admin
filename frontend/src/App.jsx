import React, { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home'
import Footer from './components/footer/Footer'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import ViewBookDetails from './components/viewbookDetails/ViewBookDetails'
import {authActions} from './store/auth'
import {useDispatch, useSelector} from 'react-redux'
import Favourites from './components/Profile/Favourites'
import UserOrderHIstory from './components/Profile/UserOrderHIstory'
import Setting from './components/Profile/Setting'
import AllOrders from './pages/AllOrders'
import Addbook from './pages/Addbook'
import Updatebook from './pages/Updatebook'

function App() {
const dispatch = useDispatch();
const role = useSelector(state=>state.auth.role)

useEffect(()=>{
if(
  localStorage.getItem('id')&&
  localStorage.getItem('token')&&
  localStorage.getItem('role')
){
  dispatch(authActions.login());
       dispatch(authActions.changeRole(localStorage.getItem('role')));
  
}
},[])
  return (
    <div >
        <Navbar/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route  path='/all-books' element={<AllBooks/>}/>
          <Route  path='/login' element={<Login/>}/>
          <Route  path='/signup' element={<Signup/>}/>
          <Route  path='/cart' element={<Cart/>}/>
          <Route  path='/profile' element={<Profile/>}>
          {role==='user' ? <Route index element={<Favourites/>} />:<Route index element={<AllOrders/>} />}
          {role === 'admin' && <Route  path='/profile/addBook' element={<Addbook/>}/>}
          <Route  path='/profile/orderHistory' element={<UserOrderHIstory/>}/>
          <Route  path='/profile/settings' element={<Setting/>}/>
          </Route>
          <Route  path='/view-book-details/:id' element={<ViewBookDetails/>}/>
          <Route  path='/updateBook/:id' element={<Updatebook/>}/>
        </Routes>
        <Footer/>
    </div>
  )
}

export default App
