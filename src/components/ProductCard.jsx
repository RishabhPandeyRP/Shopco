import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

function ProductCard({ product }) {
  const isAuth = useSelector((state) => state.auth);
  const cartIems = useSelector((state)=> state.cart)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const [prodArr , setProdArr] = useState();

  const callToAddCart = async (data)=>{
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
      toast.success("added")
    } catch (error) {
      console.log(error);
      toast.error("error occured")
    }
  }

  const handleAddToCart = () => {

    if(isAuth.isAuthenticated){
      dispatch(addToCart(product));
    
      const data = {
        userId : localStorage.getItem("userId"),
        email : localStorage.getItem("email"),
        token : localStorage.getItem("shopCoToken"),
        products : [{
          productId : product.productId,
          quantity : 1
        }]
      }
      callToAddCart(data);
    }
    else{
      return navigate("/login");
    }

    
  };

  return (
    <div className="product-card p-4 bg-white shadow-md rounded-md">
      <div className="flex justify-center items-center h-48">
        {product.images && product.images.length > 0 && (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-fit h-48 object-cover rounded-md"
          />
        )}
      </div>
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-semibold mb-4">${product.price.toFixed(2)}</p>
      {
        cartIems.find((item) => item.productId === product.productId) ? (
          <button className="w-full bg-gray-300 text-gray-700 py-2 px-4 rounded-md cursor-not-allowed" disabled>
            Added to cart
          </button>
        ) : (
          <button onClick={handleAddToCart} className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-[#1e1e1e] transition-colors">
            Add to cart
          </button>
        )
      }
    </div>
  );
}

export default ProductCard;
