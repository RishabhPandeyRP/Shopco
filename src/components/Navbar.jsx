import React, { useState } from 'react';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../features/user/authSlice';
import toast from 'react-hot-toast';

function Navbar() {
    const isAuth = useSelector((state) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const logoutHandler = ()=>{
        localStorage.setItem("shopCoToken",null);
        localStorage.setItem("userId",null);
        toast.success("logged out successfully")
        dispatch(logout());
    }

    return (
        <div className="bg-gray-100 shadow-md p-4">
            <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-black">
                    <Link to="/">SHOPCO</Link>
                </div>
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="px-2 hover:font-bold transition-all">Home</Link>
                    <Link to="/products" className=" px-2 hover:font-bold transition-all">Products</Link>
                    <Link to="/contactus" className="px-2 hover:font-bold transition-all">Contact Us</Link>
                    <Link to="/dashboard" className="px-2 hover:font-bold transition-all">My Dashboard</Link>
                </div>
                <div className="hidden md:flex space-x-4 items-center">
                    {/* <Link to="/login" className="bg-black text-white py-2 px-4 rounded hover:bg-[#1e1e1e] transition-colors">
                        Login
                    </Link> */}
                    {
                        isAuth.isAuthenticated ? <button onClick={logoutHandler} className="bg-black text-white py-2 px-4 rounded hover:bg-[#1e1e1e] transition-colors">
                            Logout
                        </button> :
                            <Link to="/login" className="bg-black text-white py-2 px-4 rounded hover:bg-[#1e1e1e] transition-colors">
                                Login
                            </Link>
                    }
                    {
                        isAuth.isAuthenticated == false ? null :
                        <Link to='/cart' className="relative">
                        <FaShoppingCart className="text-gray-700 text-2xl cursor-pointer hover:text-black transition-colors" />
                        {/* Add a cart item count badge here if needed */}
                    </Link>}
                </div>
                <div className="md:hidden flex items-center">
                    <FaBars
                        className="text-2xl text-gray-700 cursor-pointer hover:text-black transition-colors"
                        onClick={handleMenuToggle}
                    />
                </div>
            </div>
            {/* Mobile menu */}
            <div className={`md:hidden mt-4 flex flex-col space-y-4 ${isMenuOpen ? 'block' : 'hidden'}`}>
                <Link to="/" className="hover:text-black transition-colors">Home</Link>
                <Link to="/products" className="hover:text-black transition-colors">Products</Link>
                <Link to="/contactus" className="hover:text-black transition-colors">Contact Us</Link>
                <Link to="/login" className="bg-black text-white py-2 px-4 rounded hover:bg-[#1e1e1e] transition-colors">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
