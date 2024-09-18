import React from 'react';
import ProductCard from './../components/ProductCard';
import Navbar from '../components/Navbar';

function Products({displayedProd}) {
    displayedProd
    return (
        <div>
            <Navbar/>
            <div className="pt-4 px-4 justify-center align-middle">
                <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
                <div className="product-listing grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedProd.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;
