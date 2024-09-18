import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/Navbar';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../features/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';
import { addOrder } from '../features/cart/orderSlice';

function Cart({ navVis }) {

    //const cartItemsRedux = useSelector((state) => state.cart);
    const isAuth = useSelector((state) => state.auth);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshOnUpdate, setRefreshOnUpdate] = useState(true);
    const [orderLoader, setOrderLoader] = useState(false);
    const [isLogIn , setIsLogIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchCartComp = async () => {
        try {
            setLoading(true);
            const userId = localStorage.getItem("userId");
            const response = await fetch(`http://127.0.0.1:8787/api/cart/${userId}`, {
                method: 'POST',
                body: JSON.stringify({
                    email: localStorage.getItem("email"),
                    token: localStorage.getItem("shopCoToken")
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const data = await response.json();
            console.log("from cart : ", data);
            setCartItems(data.items);
            setLoading(false);
        } catch (error) {
            console.log("some error occured while fetching cart");
            setLoading(false);
        }
    }

    const callToUpdCart = async (data) => {
        try {
            let url = "http://127.0.0.1:8787/api/cart/add";
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            const finalRes = await response.json();
            console.log(finalRes);
            toast.success("updated")
            setRefreshOnUpdate(!refreshOnUpdate);
        } catch (error) {
            console.log(error);
            toast.error("error occured")
            setRefreshOnUpdate(!refreshOnUpdate);
        }
    }

    const handleUpdQuantity = (productId, quantity, str) => {
        //dispatch(addToCart(product));
        if (quantity == 1 && str == "DEC") {
            toast.error("Minimum quantity reached")
            return;
        }
        if (str == "INC") {
            quantity += 1;
        }
        else {
            quantity -= 1;
        }

        const data = {
            userId: localStorage.getItem("userId"),
            email: localStorage.getItem("email"),
            token: localStorage.getItem("shopCoToken"),
            products: [{
                productId: productId,
                quantity: quantity
            }]
        }
        //console.log("from redux cart : " , cartItemsRedux);
        callToUpdCart(data);
    };

    useEffect(() => {
        console.log("from cart state : ", cartItems)
        fetchCartComp();
    }, [refreshOnUpdate])

    const handleIncrease = (productId, quantity) => {
        //dispatch(increaseQuantity(productId));
        handleUpdQuantity(productId, quantity, "INC");
    };

    const handleDecrease = (productId, quantity) => {
        //dispatch(decreaseQuantity(productId));
        handleUpdQuantity(productId, quantity, "DEC");
    };

    const handleRemove = async (productId) => {
        dispatch(removeFromCart(productId));

        let data = {
            userId: localStorage.getItem("userId"),
            productId,
            email: localStorage.getItem("email"),
            token: localStorage.getItem("shopCoToken")
        }

        try {
            const response = await fetch("http://127.0.0.1:8787/api/cart/remove", {
                method: "DELETE",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            const finRes = await response.json();
            console.log("deleted ", finRes);
            setRefreshOnUpdate(!refreshOnUpdate)
        } catch (error) {
            console.log("some error occured while deleting from cart ", error);
            setRefreshOnUpdate(!refreshOnUpdate)
        }

    };

    const orderGeneration = async (data) => {
        try {
            let url = "http://127.0.0.1:8787/api/order/register";
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });
            const finalRes = await response.json();
            console.log("order generated response : ", finalRes);
            toast.success("order generated successfully");
            dispatch(addOrder(finalRes.order.orderId))
            setOrderLoader(false)
        } catch (error) {
            console.log("error occured while generating the order", error);
            toast.error("error occured while generating order");
            setOrderLoader(false)
        }
    }
    const handleClick = async () => {
        //console.log(cartItems);
        setOrderLoader(true);
        let product = [];
        let totalPrice = 0;

        for (let i = 0; i < cartItems.length; i++) {
            let obj = {
                productId: cartItems[i].productId,
                name:cartItems[i].product.name,
                quantity: cartItems[i].quantity,
                price: cartItems[i].product.price
            }
            totalPrice += cartItems[i].quantity * cartItems[i].product.price;
            product.push(obj);
        }

        let data = {
            userId: localStorage.getItem("userId"),
            products: product,
            totalAmount: totalPrice
        }
        console.log("from checkout btn ", data);
        await orderGeneration(data);
        return navigate("/checkout");
    }

    return (
        <div>
            
            {
                isAuth.isAuthenticated == false && navigate("/login")
            }
            {
                navVis && <Navbar />
            }
            <div className="pt-4 px-4">
                {
                    navVis && <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>
                }
                {loading && <Loading></Loading>}
                {cartItems.length === 0 && loading == false ? (
                    <p className="text-center">Your cart is empty.</p>
                ) : (
                    <div className="cart-items space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.product.productId} className="cart-item flex justify-between items-center p-4 bg-white shadow-md rounded-md">
                                <img
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    className="w-24 h-24 object-contain rounded-md"
                                />
                                <div className="cart-item-details flex-1 ml-4">
                                    <h2 className="text-xl font-bold">{item.product.name}</h2>
                                    <p className="text-gray-700">${item.product.price.toFixed(2)}</p>
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => handleDecrease(item.product.productId, item.quantity)}
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            onClick={() => handleIncrease(item.product.productId, item.quantity)}
                                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemove(item.product.productId)}
                                    className="text-red-500 hover:text-red-600 transition-colors"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}

            </div>
            <div>
                {
                    cartItems.length > 0 && (
                        <div className="flex justify-center items-center">
                            {
                                orderLoader == false ? <button onClick={handleClick} className="bg-black py-2 px-4 rounded-md m-2 my-4 hover:bg-[#1e1e1e] text-white">
                                    Proceed to Checkout
                                </button> :
                                    <div className="bg-black py-2 px-4 rounded-md m-2 my-4 hover:bg-[#1e1e1e] text-white">
                                        generating your order...
                                    </div>
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default Cart;
