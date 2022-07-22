import React, { useState, useEffect } from 'react'
import { getProductByCategory } from '../Api/api';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';

const Products = () => {
    const [productCategory, setProductCategory] = useState([]);

    let { category } = useParams();
    const getCategoryProducts = async () => {
        const products = await getProductByCategory(category);
        setProductCategory(products);
    }

    useEffect(() => {
        getCategoryProducts();
    }, []);

  return (
    <div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">{category.toLocaleUpperCase()} CATEGORY</h2>
          <ProductCard products={productCategory}/>
        </div>
      </div>
    </div>
  )
}

export default Products


