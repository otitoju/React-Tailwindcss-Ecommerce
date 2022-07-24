import React, { useState, useEffect } from 'react'
import ItemLists from './ItemLists';
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { HeaderItem, CategoriesDropdownList } from '../Api/HeaderList_mock_data';
import CategoryList from './CategoryList';
import { MobileHamburgerMenu } from './MobileHamburgerMenu';

const Header = () => {
    const [isLoggedIn, setIsloggedIn] = useState(true);
    const [open, setOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [openCategories, setOpenCategories] = useState(false);
    const [showMenuHamburger, setShowMenuHamburger] = useState(false)


    let navigate = useNavigate();
    const cartQty = useSelector(state => state.cart.qty);
    const user = useSelector(state => state.user.currentUser);

    const handleShow = (e) => {
        e.preventDefault()
        setOpen(true);
    }

    const handleHide = (e) => {
        e.preventDefault()
        setOpen(false);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        token ? setIsloggedIn(true) : setIsloggedIn(false);
    }, []);

    const openUserProfile = () => {
        setShowProfile(!showProfile);
    }

    const handleOpenCategories = () => {
        setOpenCategories(!openCategories);
    }

    const handleMenuHamburger = () => {
        setShowMenuHamburger(!showMenuHamburger);
    }

    return (
        <div>
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                            <button onClick={handleMenuHamburger} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>

                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>

                                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex-shrink-0 flex items-center">
                                <img className="block lg:hidden h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                                <img className="hidden lg:block h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="Workflow" />
                            </div>
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    {
                                        HeaderItem.map(item => (
                                            <Link to={item.url} className="inline-flex text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" key={item.id}>{item.title}</Link>
                                        ))
                                    }

                                    <div className="relative inline-block text-left">
                                        <button onClick={handleOpenCategories} className="inline-flex text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" id="menu-button" aria-expanded="true" aria-haspopup="true">Categories
                                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </button>

                                        <CategoryList menuList={CategoriesDropdownList} show={openCategories} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                            <button onClick={handleShow} type="button" className="bg-gray-800 p-1 flex  text-gray-400 hover:text-white ">
                                <span className="sr-only">Cart</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">{cartQty}</span>
                            </button>

                            {
                                !user && <div className='flex'>
                                    <button onClick={() => {
                                        navigate('/login');
                                    }} className="hidden sm:block sm:ml-6 whitespace-nowrap text-base font-medium text-gray-400 hover:text-white">
                                        Sign in
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigate('/register');
                                        }}
                                        className="hidden sm:block sm:ml-6 ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                    >
                                        Sign up
                                    </button>

                                </div>
                            }


                            {
                                user && <div className="ml-3 relative">
                                    <div>
                                        <button onClick={openUserProfile} type="button" className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                            <span className="sr-only">Open user menu</span>
                                            <img className="h-8 w-8 rounded-full" src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" alt="" />
                                        </button>
                                    </div>


                                    <div style={{
                                        display: showProfile ? 'block' : 'none'
                                    }} className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">Your Profile</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">Settings</a>
                                        <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">Sign out</a>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                </div>

                {
                    showMenuHamburger && <div className="sm:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">

                        <MobileHamburgerMenu menu={HeaderItem}/>
                        
                        <button onClick={() => {
                            navigate('/login');
                        }} className=" whitespace-nowrap text-base font-medium text-gray-400 hover:text-white">
                            Sign in
                        </button>
                        <button
                            onClick={() => {
                                navigate('/register');
                            }}
                            className=" ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                        >
                            Sign up
                        </button>
                    </div>
                </div>
                }
                
            </nav>
            <ItemLists show={open} onClick={handleHide} />
        </div>
    )
}

export default Header
