import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function Profile() {

  const [myOrders, setMyOrders] = useState([]);
  const [myProfile, setMyProfile] = useState(null);
  const [myAddress , setMyAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [addLine1, setAddLine1] = useState();
  const [addLine2, setAddLine2] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [postal, setPostal] = useState();
  const [country, setCountry] = useState();


  const fetchOrders = async () => {
    try {
      setLoading(true);
      const userid = localStorage.getItem("userId");
      const response = await fetch(`https://backend.rishabh17704.workers.dev/api/users/getById/${userid}`);
      const finRes = await response.json();

      setMyOrders(finRes.orders);
      console.log("Your orders:", myOrders);

      const profile = {
        userId: finRes.userId,
        name: finRes.name,
        email: finRes.email,
        password: finRes.password,
        phone: finRes.phone,
        createdAt: finRes.createdAt,
        
      };

      setMyProfile(profile);
      setMyAddress(finRes.address);
      console.log("This is the profile:", finRes);
      setLoading(false);
    } catch (error) {
      console.log("Some error occurred while fetching the orders");
      setLoading(false);
    }
  };

  function editHandler() {
    setEdit(!edit);
  }

  async function addHandler() {
    try {
      setLoading(true);
      const add = {
        addressLine1: addLine1,
        addressLine2: addLine2,
        city: city,
        state: state,
        postalCode: postal,
        country: country,
        userId: localStorage.getItem("userId")
      }

      console.log("here is the address : ", add);

      //  http://127.0.0.1:8787/api/address/register

      let url = "https://backend.rishabh17704.workers.dev/api/address/register";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(add),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      const finalRes = await response.json();
      toast.success("Address saved successfully")
      console.log("address saved successfully : " , finalRes);
      setLoading(false);
    } catch (error) {
      console.log("Some error occured occured while fetching the address" , error);
      toast.error("Error while saving address");
      setLoading(false);
    }
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
            edit == false ? <div>
              {
                myAddress?.map((item)=>(
                  <div className='flex flex-col gap-2'>
                      <span>{item.addressLine1
                      }</span>
                      <span>{item.addressLine2}</span>
                      <span>{item.city}</span>
                      <span>{item.country}</span>
                      <span>{item.postalCode}</span>
                      <span>{item.state}</span>
                  </div>
                ))
              }
            </div>
              :
              <div className='flex flex-col gap-2 text-sm'>
                <input type="text" placeholder='addressLine1' className='border border-gray-500 rounded-md px-2 py-2' value={addLine1} onChange={(event) => { setAddLine1(event.target.value) }} />
                <input type="text" placeholder='addressLine2' className='border border-gray-500 rounded-md px-2 py-2' value={addLine2} onChange={(event) => { setAddLine2(event.target.value) }} />
                <input type="text" placeholder='city' className='border border-gray-500 rounded-md px-2 py-2' value={city} onChange={(event) => { setCity(event.target.value) }} />
                <input type="text" placeholder='state' className='border border-gray-500 rounded-md px-2 py-2' value={state} onChange={(event) => { setState(event.target.value) }} />
                <input type="text" placeholder='postal code' className='border border-gray-500 rounded-md px-2 py-2' value={postal} onChange={(event) => { setPostal(event.target.value) }} />
                <input type="text" placeholder='country' className='border border-gray-500 rounded-md px-2 py-2' value={country} onChange={(event) => { setCountry(event.target.value) }} />
              </div>
          }

          {loading ? <button className='border border-black text-white bg-black rounded-md py-2 text-md'>
            saving address
          </button> : <div>
            {
              edit ? <button className='border border-black text-white bg-black rounded-md py-2 text-md hover:scale-[95%] duration-150 px-8' onClick={addHandler}>
              save address
            </button> : null
            }
          </div> }
        </div>
      </div>
    </div>
  );
}

export default Profile;
