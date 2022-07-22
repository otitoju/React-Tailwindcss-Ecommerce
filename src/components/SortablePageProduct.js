import React, { useEffect, useState, useMemo } from 'react'
import ProductCard from './ProductCard';
import { getAllProducts } from '../Api/api';
import SortList from './SortList';
import FilterList from './FilterList';
import { FilterCategory } from './FilterCategory';
import { Pagination } from './Pagination';

const SortablePageproduct = () => {
  const [products, setProducts] = useState([]);
  const [toggleSort, setToggleList] = useState(false);
  const [toggleFilter, setToggleFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [PageSize] = useState(8)

  const getProducts = async () => {
    const products = await getAllProducts();
    setProducts(products);
  }

  const handleSortToggle = () => {
    setToggleList(!toggleSort);
  }

  const handleFilteerToggle = () => {
    setToggleFilter(!toggleFilter);
  }

  useEffect(() => {
    getProducts();
  }, []);

    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    const currentProducts = products.slice(firstPageIndex, lastPageIndex);

  return (
    <div>

      <div className="bg-white">
        <div>
            <FilterList show={toggleFilter} onClick={handleFilteerToggle} />
            {/* MAIN PAGE */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">All Products</h1>

              <div className="flex items-center">
                <div className="relative inline-block text-left">
                  <div>
                    <button onClick={handleSortToggle} type="button" className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button" aria-expanded="false" aria-haspopup="true">
                      Sort

                      <svg className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  <SortList show={toggleSort}/>
                </div>

                <button type="button" className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">View grid</span>

                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button onClick={handleFilteerToggle} type="button" className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden">
                  <span className="sr-only">Filters</span>

                  <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">Products</h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">

                <form className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul role="list" className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200">
                    <li>
                      <a href="#"> Totes </a>
                    </li>

                    <li>
                      <a href="#"> Backpacks </a>
                    </li>

                    <li>
                      <a href="#"> Travel Bags </a>
                    </li>

                    <li>
                      <a href="#"> Hip Bags </a>
                    </li>

                    <li>
                      <a href="#"> Laptop Sleeves </a>
                    </li>
                  </ul>

                 

                  
                  <FilterCategory/>
                </form>
                {/* Right span */}
                <div className="lg:col-span-3">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full">
                    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                      {/* <ProductCard products={products} /> */}
                      <ProductCard products={currentProducts} />
                    </div>
                    <Pagination 
                    currentPage={currentPage}
                    totalCount={products.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                    />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

    </div>
  )
}

export default SortablePageproduct;
