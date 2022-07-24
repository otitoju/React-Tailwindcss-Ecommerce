import React from 'react';
import { Link, useNavigate } from 'react-router-dom';



const CategoryList = ({ menuList, show, onClick, handleClick }) => {
    const navigate = useNavigate();

    handleClick = (url) => {
        navigate(url);
    }
    return (
        <div style={{
            display: show ? 'block' : 'none'
        }} className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
            {
                menuList.map(item => (
                    <div className="py-1" role="none" key={item.id}>
                        <a href={item.url} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">{item.menu}</a>
                    </div>
                ))
            }
        </div>
    )
}

export default CategoryList
