import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../features/cart/cartSlice';
import Cart from '../pages/Cart';

function CartComp() {
  // const cartItems = useSelector((state) => state.cart);

  // const dispatch = useDispatch();

    

  //   const handleIncrease = (productId) => {
  //       dispatch(increaseQuantity(productId));
  //   };

  //   const handleDecrease = (productId) => {
  //       dispatch(decreaseQuantity(productId));
  //   };

  //   const handleRemove = (productId) => {
  //       dispatch(removeFromCart(productId));
  //   };

  

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {/* Cart details will go here */}
      {/* {
        console.log(cartItems)
      } */}

      {/* {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="cart-items space-y-5">
          {cartItems.map((item) => (
            <div key={item.productId} className="border border-gray-200 cart-item flex justify-between items-center p-4 bg-white shadow-lg rounded-md">
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="cart-item-details flex-1 ml-4">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-700">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleDecrease(item.productId)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item.productId)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.productId)}
                className="text-red-500 hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )} */}

      <Cart navVis={false}></Cart>

    </div>
  );
}

export default CartComp;
