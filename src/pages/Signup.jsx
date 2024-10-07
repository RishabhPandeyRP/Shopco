import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { signupSuccess, authFailure } from '../features/user/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading , setLoading] = useState(false);
  const signupStatus = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log("on load signup");
    console.log(signupStatus);
  },[])

  async function registerUser(data){
    setLoading(true);
    console.log("data is : " , data);
    
    try {
      let url = "https://backend.rishabh17704.workers.dev/api/users/register";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      const finalRes = await response.json();

      if(finalRes.error == "P2002"){
        toast.error("User already registered");
        setLoading(false);
        return;
      }

      if(finalRes.status == 411){
        toast.error("invalid inputs");
        setLoading(false);
        return;
      }

      if(finalRes.status === 201){
        console.log(finalRes);
        dispatch(signupSuccess(finalRes.user));
        localStorage.setItem("userId" , finalRes.user.userId)
        toast.success("submitted successfully")
        return navigate("/login")
      }
      else{
        dispatch(authFailure("signup failed"));
        toast.error("Some error occured")
      }

      setLoading(false);

    } catch (error) {
      dispatch(authFailure("signup failed"));
      console.log("some error occured" , error);
      toast.error("Some error occured");
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {
    
    e.preventDefault();
    
    const data = {
      name,
      email,
      password,
      phone
    }
    registerUser(data);
    
    
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone No.
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-center">
              {
                loading ? <div
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-[#1e1e1e] transition-colors text-center"
              >
                signing you up...
              </div> : <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-[#1e1e1e] transition-colors"
              >
                Signup
              </button>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
