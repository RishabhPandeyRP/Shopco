import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="bg-gray-800 h-full min-h-screen w-64 text-white">
        <div className="text-3xl font-bold text-gray-200 text-center my-2">
            <Link to="/">SHOPCO</Link>
        </div>
        <nav className="flex flex-col p-4">
            <NavLink
            to="/dashboard/orders"
            className={({ isActive }) => 
                isActive ? "bg-gray-700 p-2 rounded mb-2" : "p-2 rounded mb-2 hover:bg-gray-700 transition-colors"}
            >
            Orders
            </NavLink>

            {/* <NavLink
            to="/dashboard/test"
            className={({ isActive }) => 
                isActive ? "bg-gray-700 p-2 rounded mb-2" : "p-2 rounded mb-2 hover:bg-gray-700 transition-colors"}
            >
            Test
            </NavLink> */}

            <NavLink
            to="/dashboard/cart"
            className={({ isActive }) => 
                isActive ? "bg-gray-700 p-2 rounded mb-2" : "p-2 rounded mb-2 hover:bg-gray-700 transition-colors"}
            >
            Cart
            </NavLink>

            <NavLink
            to="/dashboard/profile"
            className={({ isActive }) => 
                isActive ? "bg-gray-700 p-2 rounded mb-2" : "p-2 rounded mb-2 hover:bg-gray-700 transition-colors"}
            >
            Profile
            </NavLink>

        </nav>
        </div>
    );
}

export default Sidebar;
