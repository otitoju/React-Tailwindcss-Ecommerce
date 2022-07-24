import React, { useState, useRef } from 'react';
import Alert from '../components/Alert';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/apiCalls';


const Login = () => {   
    const [loggedIn, setLoggedIn] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState();
    const [title, setTitle] = useState();
    const dispatch = useDispatch();
    const { isFetching, error } = useSelector(state => state.user);
    let navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();

    const handleLogin = async (e) => {
        e.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        console.log(isFetching);
        if(enteredEmail === "" || enteredPassword === "") {
            setTitle("Empty fields!");
            setMessage("Please fill in all empty fields.");
            setShowAlert(true);
        }
        else {
            setLoggedIn(true);
            // implement this when API is ready
            setTimeout(() => {
                login(dispatch, enteredEmail, enteredPassword );
                setLoggedIn(false);
            }, 5000);

            // if(user.length === 1) {
            //     setShowAlert(false);
            //     setLoggedIn(true);
            //     navigate('/products')
            //     window.localStorage.setItem("token", "userLoggedIn");
            // }
            // else {
            //     setShowAlert(true);
            //     setLoggedIn(false);
            //     setTitle("Login Exception");
            //     setMessage("Wrong email or password. Please check and try again.");
            // }
        }
    }

    const handleHide = (e) => {
        e.preventDefault()
        setShowAlert(false);
    }

    return (
        <div>
            <Alert 
            show={showAlert} 
            onClick={handleHide}
            title={title}
            message={message}
            />
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                        
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label for="email-address" className="sr-only">Email address</label>
                                <input id="email-address" name="email" type="email" autocomplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" ref={emailRef} />
                            </div>
                            <div>
                                <label for="password" className="sr-only">Password</label>
                                <input id="password" name="password" type="password" autocomplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" ref={passwordRef} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                <label for="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
                            </div>
                        </div>

                        <div>
                            <button disabled={loggedIn ? true : false} onClick={handleLogin} type="submit" className={
                                !loggedIn ? 
                                "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                :
                                "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-not-allowed disabled:opacity-50"
                            }
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                                    </svg>
                                </span>
                                {!loggedIn ? "Sign in" : "Logging in"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Login
