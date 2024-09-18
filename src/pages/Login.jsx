import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, authFailure } from '../features/user/authSlice';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  async function loginUser(data) {
    setLoading(true);
    console.log("data is : ", data);

    try {
      let url = "http://127.0.0.1:8787/api/user/logIn";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      const finalRes = await response.json();

      if (finalRes.status == 411) {
        toast.error("invalid inputs");
        setLoading(false);
        return;
      }

      if (finalRes.status == 404) {
        toast.error("user not found");
        setLoading(false);
        return;
      }

      if (finalRes.status == 400) {
        toast.error("Incorrect password");
        setLoading(false);
        return;
      }

      if (finalRes.status === 201) {
        console.log(finalRes);
        dispatch(loginSuccess(finalRes.user.userId));
        localStorage.setItem("shopCoToken", finalRes.token)
        localStorage.setItem("userId", finalRes.user.userId)
        localStorage.setItem("email", finalRes.user.email)
        toast.success("loggedIn successfully")
        setLoading(false);
        return navigate("/")
      }
      else {
        dispatch(authFailure("signup failed"));
        toast.error("Some error occured")
      }

      setLoading(false);

    } catch (error) {
      dispatch(authFailure("signup failed"));
      console.log("some error occured", error);
      toast.error("Some error occured");
      setLoading(false);
    }
  }

  const handleSubmit = (e) => {

    e.preventDefault();

    const data = {
      email,
      password,
    }
    loginUser(data);

  };

  const signUpHandler = ()=>{
    return navigate("/signup")
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <form onSubmit={handleSubmit}>
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
            <div className="flex justify-center">
              {
                loading ? <div
                  className="w-full bg-black text-white py-2 px-4 rounded-md transition-colors text-center"
                >
                  logging in...
                </div> :
                  <button
                    type="submit"
                    className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-[#1e1e1e] transition-colors"
                  >
                    Login
                  </button>
              }
            </div>
          </form>
          <p className=' text-sm text-neutral-500 w-fit mx-auto mt-6'>not signed in? <span className=' text-blue-500 underline cursor-pointer' onClick={signUpHandler}>signup</span></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
