import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { addOrder } from '../features/cart/orderSlice';
import { useEffect,useState } from 'react';

function Checkout() {
  const cartItems = useSelector((state) => state.cart);
  const orderId = useSelector((state)=> state.orders);
  const [orderProd , setOrderProd] = useState([]);

  const dispatch = useDispatch();

  const calculateTotal = () => {
    let total = 0;
    // console.log(cartItems);
    // console.log(orderList);
    orderProd.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  const total = calculateTotal();
  const tax = total * 0.18;
  const finalTotal = total + tax;

  // const handleProceed = () => {
  //   dispatch(addOrder(cartItems));
  // }

  const fetchOrderDetails = async ()=>{
    try {
      let url = `http://127.0.0.1:8787/api/order/getById/${orderId.orderId}`;
      const response = await fetch(url);
      const finalRes = await response.json();
      console.log("data from order fetching : ",finalRes)
      setOrderProd(finalRes.products);
    } catch (error) {
      console.log("Some error occured while fetching order details")
    }
  }

  useEffect(()=>{
    console.log("from checkout comp : " , orderId)
    fetchOrderDetails()
  },[])

  return (
    <div>
      <Navbar />
      <div className="pt-4 px-4 justify-center items-center">
        <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
        <div className="bg-white p-6 rounded-md shadow-md max-w-lg mx-auto">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="mb-4">
            {orderProd.map((item) => (
              <div key={item.productId} className="flex justify-between mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax (18%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="justify-center items-center mt-6">
            <button className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-[#1e1e1e] transition-colors" onClick={null}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
