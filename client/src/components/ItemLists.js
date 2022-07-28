import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import config from '../config';
import { increaseQuantity, removeFromCart, decreaseQuantity } from '../Redux/cartRedux';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const KEY = config.REACT_STRIPE_KEY

const ItemLists = ({ show, onClick }) => {
    const [quantity, setQuantity] = useState();
    const [carts, setCart] = useState([]);
    const [stripeToken, setStripeToken] = useState(null);
    const cartItems = useSelector(state => state.cart);
    const user = useSelector(state => state.user.currentUser);
    const dispatch = useDispatch();

    const onToken = (token) => {
        setStripeToken(token);
    };

    const handleQuantity = (id) => {
        console.log(typeof (id));
        console.log(cartItems.products)
        dispatch(increaseQuantity(id));
    }

    const handleCheckout = async () => {
        const products = cartItems.products;
        await axios.post('http://localhost:5000/api/v1/payment/create-checkout-session', {
            products,
            userId: user.id
        }).then( (res) => {
            if(res.data.url) {
                window.location.href = res.data.url
            }
        }).catch((err) => console.error);

    }

    const getAllCarts = () => {
        setCart([])
    }

    const removeItemFromCart = (id, productPrice, quantity) => {
        dispatch(removeFromCart({ id, productPrice, quantity }));
    }

    const decreaseItemQuantity = (id) => {
        dispatch(decreaseQuantity(id));
    }

    useEffect(() => {
        getAllCarts();
    }, []);

    return (
        <div style={{
            display: show ? 'block' : 'none'
        }}>
            <ToastContainer autoClose={5000} />
            <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <div className="pointer-events-auto w-screen max-w-md">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button onClick={onClick} type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                                    <span className="sr-only">Close panel</span>
                                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" aria-hidden="true">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    {
                                                        cartItems.products ? cartItems.products.map((cart) => (
                                                            <li className="flex py-6" key={cart.id}>
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img src={cart.preview_img} alt={cart.name} className="h-full w-full object-cover object-center" />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <a href="#"> {cart.name} </a>
                                                                            </h3>
                                                                            <p className="ml-4">$ {cart.price * cart.quantity}</p>
                                                                        </div>
                                                                        <p className="mt-1 text-sm text-gray-500">{cart.color}</p>
                                                                        <p className="mt-1 text-sm text-gray-500">{cart.size}</p>
                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <button onClick={() => decreaseItemQuantity(cart.id)} type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                                                            <span className="sr-only">Decrease</span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                                                                            </svg>
                                                                        </button>
                                                                        <p className="text-gray-500">Qty {cart.quantity}</p>
                                                                        <button onClick={() => handleQuantity(cart.id)} type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                                                            <span className="sr-only">Increase</span>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                                                            </svg>
                                                                        </button>

                                                                        <div className="flex">
                                                                            <button onClick={() => removeItemFromCart(cart.id, cart.price, cart.quantity)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))
                                                            : (

                                                                <p className="mt-0.5 text-sm text-gray-500">Your cart is empty. Start shopping.</p>
                                                            )
                                                    }


                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${cartItems.total}</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                        <div className="mt-6">
                                            {/* <StripeCheckout
                                                name="Otitoju Shopping Mall"
                                                image="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                                                billingAddress
                                                shippingAddress
                                                description={`Your total is $${cartItems.total}`}
                                                amount={cartItems.total * 100}
                                                token={onToken}
                                                stripeKey={KEY}
                                            >
                                                <button disabled={cartItems.qty === 0 ? true : false} className={cartItems.qty === 0 ?
                                                    "flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-not-allowed disabled:opacity-50"
                                                    : "flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"}
                                                >Checkout</button>
                                            </StripeCheckout> */}
                                            <button onClick={handleCheckout} disabled={cartItems.qty === 0 ? true : false} className={cartItems.qty === 0 ?
                                                "flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-not-allowed disabled:opacity-50"
                                                : "flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"}
                                            >Checkout</button>

                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Continue Shopping<span aria-hidden="true"> &rarr;</span></button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ItemLists
