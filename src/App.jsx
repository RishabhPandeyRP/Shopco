import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import toast, { Toaster } from 'react-hot-toast';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Contactus from './pages/Contactus'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import CartComp from './components/CartComp'
import Profile from './components/Profile'
import Orders from './components/Orders'
import Test from './components/Test'
import { useDispatch } from 'react-redux';
import { loginSuccess } from './features/user/authSlice';

function App() {
  const [displayedProd, setDisplayedProd] = useState([]);
  // const [myOrders , setMyOrders] = useState([]);
  // const [myProfile , setMyProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function productsData() {
    try {
      setLoading(true);
      const response = await fetch("https://backend.rishabh17704.workers.dev/api/product/getAll");
      const data = await response.json();
      console.log("data after fetch : ", data);
      setDisplayedProd([...data]);
      setLoading(false);
    } catch (error) {
      console.log("Spme error ocureed while fetching the data")
    }
  }

  async function isLoggedIn() {
    try {
      
      console.log("in app 1")
      const token = localStorage.getItem("shopCoToken");
      console.log("i am the token " , token)
      if(token == "null" || token == null){
        toast.error("Not LoggedIn")
      }
      else{
        console.log("in app 2.1")
        let url = "http://127.0.0.1:8787/api/tokenVerify";
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({token}),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        });

        const data = await response.json();

        if(data.name == "JwtTokenExpired"){
          toast.error("Not LoggedIn")
          return;
        }

        if(data.status == 201){
          if(data.verification.email == localStorage.getItem("email")){
            dispatch(loginSuccess(localStorage.getItem("userId")));
          }
          toast.success("loggedIn automatically")
        }
      }
      
    } catch (error) {
      console.log("in app 3")
      toast.error("Not loggedIn")
    }
  }

  // const fetchOrders = async()=>{
  //   try {
  //     const response = await fetch("http://127.0.0.1:8787/api/users/getById/b039cd40-e197-49dc-913f-73ff83a48c7b");
  //     const finRes = await response.json();
  //     setMyOrders(finRes.orders);
  //     console.log("your order are here :" , myOrders)
  //     let profile = {
  //       userId:finRes.userId,
  //       name:finRes.name,
  //       email:finRes.email,
  //       password:finRes.password,
  //       phone:finRes.phone,
  //       createdAt:finRes.createdAt
  //     }
  //     setMyProfile(profile);
  //     setLoading(false)
  //   } catch (error) {
  //     console.log("Some error occued while fetching the orders");
  //     setLoading(false)
  //   }
  // }

  useEffect(() => {
    
    productsData();
    isLoggedIn();
    // fetchOrders()
    
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home displayedProd={displayedProd} loading={loading} />} />
          <Route path="/products" element={<Products displayedProd={displayedProd} />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/cart" element={<Cart navVis={true} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="test" element={<Test />} />
            <Route path="orders" element={<Orders />} />
            <Route path="cart" element={<CartComp />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster></Toaster>
    </>
  )
}

export default App
