import React from 'react'
import { FilterCategory } from './FilterCategory'

const FilterList = ({ show, onClick }) => {
    return (
        <div style={{
            display: show ? 'block' : 'none'
        }}>
            <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-black bg-opacity-25"></div>

                <div className="fixed inset-0 flex z-40">

                    <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                        <div className="px-4 flex items-center justify-between">
                            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                            <button onClick={onClick} type="button" className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400">
                                <span className="sr-only">Close menu</span>

                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <form className="mt-4 border-t border-gray-200">
                            <h3 className="sr-only">Categories</h3>
                            <ul role="list" className="font-medium text-gray-900 px-2 py-3">
                                <li>
                                    <a href="#" className="block px-2 py-3"> Totes </a>
                                </li>

                                <li>
                                    <a href="#" className="block px-2 py-3"> Backpacks </a>
                                </li>

                                <li>
                                    <a href="#" className="block px-2 py-3"> Travel Bags </a>
                                </li>

                                <li>
                                    <a href="#" className="block px-2 py-3"> Hip Bags </a>
                                </li>

                                <li>
                                    <a href="#" className="block px-2 py-3"> Laptop Sleeves </a>
                                </li>
                            </ul>

                            <FilterCategory />
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FilterList
