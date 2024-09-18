import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import { useSelector } from 'react-redux';


function Home({displayedProd , loading}) {
  const isAuth = useSelector((state) => state.auth);
  displayedProd = displayedProd.slice(0,6);

  useEffect(()=>{
    console.log("from home page : " , isAuth);
  },[])

  return (
    <div> 
      <Navbar />
      <div className="pt-4 px-4 justify-center align-middle mb-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
        {
          loading ? <Loading></Loading> : <div className="product-listing grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProd.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
        }
        <div className="text-center mt-6">
          <Link to="/products" className="bg-black text-white py-2 px-4 rounded hover:bg-[#1e1e1e] transition-colors">
            View All
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
