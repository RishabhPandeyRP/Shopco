import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(()=>{
    return navigate("/dashboard/profile")
  },[])

  return (
    <div className="flex  border-green-600">
      <Sidebar />
      <div className="flex-1 p-6  border-red-600 overflow-y-scroll h-[100vh]">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
