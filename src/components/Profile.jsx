import React, { useEffect, useState } from 'react';

function Profile() {

  const [myOrders, setMyOrders] = useState([]);
  const [myProfile, setMyProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [edit , setEdit] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8787/api/users/getById/b039cd40-e197-49dc-913f-73ff83a48c7b");
      const finRes = await response.json();
      
      setMyOrders(finRes.orders);
      console.log("Your orders:", myOrders);
      
      const profile = {
        userId: finRes.userId,
        name: finRes.name,
        email: finRes.email,
        password: finRes.password,
        phone: finRes.phone,
        createdAt: finRes.createdAt
      };

      setMyProfile(profile);
      console.log("This is the profile:", finRes);
      setLoading(false);
    } catch (error) {
      console.log("Some error occurred while fetching the orders");
      setLoading(false);
    }
  };

  function editHandler(){
    setEdit(!edit);
  }

  useEffect(() => {
    fetchOrders();
  }, []); // No need for async in useEffect here

  return (
    <div>
      <div className='flex justify-between px-2  border-red-200 items-baseline'>
          <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
          <button className='border rounded-lg cursor-pointer hover:scale-95 duration-75 px-6 py-1 bg-black text-white text-lg' onClick={editHandler}>
            Edit
          </button>
      </div>
      <div className=' border-red-400 w-fit h-[50%] flex gap-10 text-xl mx-auto mt-[20%]'>
        <div className='flex flex-col gap-3 font-semibold'>
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Created At</div>
          <div>Address</div>
        </div>
        <div className='flex flex-col gap-3'>
          <div>{myProfile?.name}</div>
          <div>{myProfile?.email}</div>
          <div>{myProfile?.phone}</div>
          <div>{new Date(myProfile?.createdAt).toLocaleDateString()}</div>
          {
            edit == false ? <div>{myProfile?.address}</div> 
            :
            <div className='flex flex-col gap-2 text-sm'>
              <input type="text" placeholder='addressLine1' className='border border-gray-500 rounded-md px-2 py-2'/>
              <input type="text" placeholder='addressLine2' className='border border-gray-500 rounded-md px-2 py-2'/>
              <input type="text" placeholder='city' className='border border-gray-500 rounded-md px-2 py-2'/>
              <input type="text" placeholder='state' className='border border-gray-500 rounded-md px-2 py-2'/>
              <input type="text" placeholder='postal code' className='border border-gray-500 rounded-md px-2 py-2'/>
              <input type="text" placeholder='country' className='border border-gray-500 rounded-md px-2 py-2'/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Profile;
