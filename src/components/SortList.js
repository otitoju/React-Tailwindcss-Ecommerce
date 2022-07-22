import React from 'react';
import { Link } from 'react-router-dom';

const sortOptions = [
    { name: 'Most Popular', href: '/', current: true },
    { name: 'Best Rating', href: '/', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '/', current: false },
    { name: 'Price: High to Low', href: '/', current: false },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const SortList = ({ show }) => {
    return (
        <div style={{
            display: show ? 'block' : 'none'
        }} className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
            <div className="py-1" role="none">
                {sortOptions.map((option) => (
                    <Link to={option.href} className="font-medium text-gray-900 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">
                        {option.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SortList
