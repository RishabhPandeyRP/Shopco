import React, { useEffect , useState} from 'react';
import { useSelector } from 'react-redux';
import Loading from './Loading';

function Orders() {
  // Assuming orders are stored in the Redux state under the key 'orders'
  //const orders = useSelector((state) => state.orders);

  // if (!Array.isArray(orders)) {
  //   console.error('Orders state is not an array:', orders);
  //   return null;
  // }

  const [myOrders , setMyOrders] = useState([]);
  const [loading , setLoading] = useState(false);

  // Function to handle the 'View Details' button click
  function handleViewDetails(orderId) {
    // Redirect to an order details page or show a modal with order details
    // Implement the desired behavior here
    console.log('View details for order:', orderId);
  }

  const fetchOrders = async()=>{
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`http://127.0.0.1:8787/api/users/getById/${userId}`);
      const finRes = await response.json();
      setMyOrders(finRes.orders);
      console.log("your order are here :" , myOrders)
      setLoading(false)
    } catch (error) {
      console.log("Some error occued while fetching the orders");
      setLoading(false)
    }
  }

  useEffect(()=>{
    setLoading(true)
    fetchOrders();
  },[])

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {
        loading && <Loading></Loading>
      }

      {myOrders.length === 0 && loading == false? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="overflow-y-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-2 px-4 border-b-2 border-gray-200 text-left text-sm leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='h-[1000px] overflow-y-auto'>
                {console.log(myOrders)}
              {myOrders.map((order) => (
                <tr key={order.orderId}>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {order.orderId}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    ${order.totalAmount.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered'
                          ? 'bg-green-200 text-green-800'
                          : order.status === 'Pending'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    <button
                      className="text-blue-600 hover:text-blue-900 focus:outline-none focus:underline"
                      onClick={() => handleViewDetails(order.orderId)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  
}

export default Orders;
