import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { addProduct } from '../Redux/cartRedux';
import { useDispatch } from 'react-redux';

const ProductCard = ({ products, addToCart }) => {
    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();
    const handleAddToCart = (id, price) => {
        // e.preventDefault();
        const product = products.filter(el => {
            return el.id === id;
        });
        let productPrice = product[0].price
        dispatch(addProduct({...product, quantity, productPrice}))
    }
    return (
        <div>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                    <div key={product.id} className="group relative">
                        <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                            <img
                                src={product.preview_img}
                                alt={product.name}
                                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                            />
                        </div>
                        {/* <button onClick={() => handleAddToCart(product.id, product.price)} className='relative z-10 w-full bg-white bg-opacity-75 py-2 px-4 rounded-md text-sm text-gray-900 opacity-0 group-hover:opacity-100 focus:opacity-100'>Add to cart</button> */}
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                    <Link to={`/product/${product.id}`}>
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {product.name}
                                    </Link>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductCard
