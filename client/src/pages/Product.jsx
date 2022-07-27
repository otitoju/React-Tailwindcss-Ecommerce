import React, { useState, useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';
import { StarIcon } from '@heroicons/react/solid';
import { useParams } from 'react-router-dom';
import { getProductById } from '../Api/api';
import { addProduct } from '../Redux/cartRedux';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export const Product = () => {
    const [selectedColor, setSelectedColor] = useState()
    const [selectedSize, setSelectedSize] = useState();
    const [product, setProduct] = useState();
    const [breadcrumbs, setBreadcrumb] = useState([]);
    const [pictures, setPictures] = useState([]);
    const [productName, setProductName] = useState();
    const [productPrice, setProductPrice] = useState()
    const [reviews, setReviews] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [details, setDetails] = useState();
    const [description, setDescription] = useState();
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [itemInStock, setItemInStock] = useState(true);

    const dispatch = useDispatch();
    const { productId } = useParams();
    const getProduct = async () => {
        const product = await getProductById(parseInt(productId));
        setProduct(product);

        setBreadcrumb(product.breadcrumbs);
        setPictures(product.images);
        setProductName(product.name);
        setProductPrice(product.price);
        setReviews(product.reviews);
        setColors(product.colors);
        setSizes(product.sizes);
        setDescription(product.description);
        setDetails(product.details);
        setItemInStock(product.inStock);
    }
    useEffect(() => {
        getProduct();
    }, []);

    const handleQuantity = (type) => {
        if (type === "decrease") {
            quantity > 1 && setQuantity(quantity - 1);
        }
        else {
            setQuantity(quantity + 1);
        }
    }

    const handleAddToCart = (e) => {
        e.preventDefault();
        if(size === "" || color === "") {
            toast.warn("Please select a size and color");
        }
        else {
            dispatch(addProduct({ ...product, quantity, productPrice, color, size }));
            toast.success(`${productName} added to cart.`);
        }
        
    }

    return (
        <div className='max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8'>
            <div className="bg-white">
                <div className="pt-6">
                    <nav aria-label="Breadcrumb">
                        <ol role="list" className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8">
                            {breadcrumbs.map((breadcrumb) => (
                                <li key={breadcrumb.id}>
                                    <div className="flex items-center">
                                        <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                                            {breadcrumb.name}
                                        </a>
                                        <svg
                                            width={16}
                                            height={20}
                                            viewBox="0 0 16 20"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                            className="w-4 h-5 text-gray-300"
                                        >
                                            <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                                        </svg>
                                    </div>
                                </li>
                            ))}
                            <li className="text-sm">
                                <a href='#' aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                    {productName}
                                </a>
                            </li>
                        </ol>
                    </nav>

                    {/* Image gallery */}
                    <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                        <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
                            <img
                                src={pictures.length > 0 ? pictures[0].src : null}
                                alt={pictures.length > 0 ? pictures[3].alt : null}
                                className="w-full h-full object-center object-cover"
                            />
                        </div>
                        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                                <img
                                    src={pictures.length > 0 ? pictures[1].src : null}
                                    alt={pictures.length > 0 ? pictures[1].alt : null}
                                    className="w-full h-full object-center object-cover"
                                />
                            </div>
                            <div className="aspect-w-3 aspect-h-2 rounded-lg overflow-hidden">
                                <img
                                    src={pictures.length > 0 ? pictures[2].src : null}
                                    alt={pictures.length > 0 ? pictures[2].alt : null}
                                    className="w-full h-full object-center object-cover"
                                />
                            </div>
                        </div>
                        <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
                            <img
                                src={pictures.length > 0 ? pictures[3].src : null}
                                alt={pictures.length > 0 ? pictures[3].alt : null}
                                className="w-full h-full object-center object-cover"
                            />
                        </div>
                    </div>

                    {/* Product info */}
                    <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
                        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">{productName}</h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:mt-0 lg:row-span-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-3xl text-gray-900">$ {productPrice}</p>

                            {/* Reviews */}
                            <div className="mt-6">
                                <h3 className="sr-only">Reviews</h3>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon
                                                key={rating}
                                                className={classNames(
                                                    reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                                    'h-5 w-5 flex-shrink-0'
                                                )}
                                                aria-hidden="true"
                                            />
                                        ))}
                                    </div>
                                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                                    <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                        {reviews.totalCount} reviews
                                    </a>
                                </div>
                            </div>

                            <form className="mt-10">
                                {/* Colors */}
                                <div>
                                    <h3 className="text-sm text-gray-900 font-medium">Color</h3>

                                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
                                        <RadioGroup.Label className="sr-only">Choose a color</RadioGroup.Label>
                                        <div className="flex items-center space-x-3">
                                            {colors.map((color) => (
                                                <RadioGroup.Option
                                                    key={color.name}
                                                    value={color}
                                                    onClick={() => {
                                                        setColor(color.name)
                                                        setSelectedColor(color.name);
                                                    }}
                                                    className={({ active, checked }) =>
                                                        classNames(
                                                            color.selectedClass,
                                                            active && checked ? 'ring ring-offset-1' : '',
                                                            !active && checked ? 'ring-2' : '',
                                                            '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none'
                                                        )
                                                    }
                                                >
                                                    <RadioGroup.Label as="span" className="sr-only">
                                                        {color.name}
                                                    </RadioGroup.Label>
                                                    <span
                                                        aria-hidden="true"
                                                        className={classNames(
                                                            color.class,
                                                            'h-8 w-8 border border-black border-opacity-10 rounded-full'
                                                        )}
                                                    />
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                {/* Quantity */}
                                <div class="flex flex-1 items-end justify-between text-sm mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm text-gray-900 font-medium">Quantity</h3>
                                    </div>
                                    <button onClick={() => handleQuantity("decrease")} type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                        <span class="sr-only">Decrease</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <p class="text-gray-500">Qty {quantity}</p>
                                    <button onClick={() => handleQuantity("increase")} type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                        <span class="sr-only">Increase</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Sizes */}
                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm text-gray-900 font-medium">Size</h3>
                                        <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                            Size guide
                                        </a>
                                    </div>

                                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                            {sizes.map((size) => (
                                                <RadioGroup.Option
                                                    key={size.name}
                                                    value={size}
                                                    onClick={() => {
                                                        setSelectedSize(size.name);
                                                        setSize(size.name)
                                                    }}
                                                    disabled={!size.inStock}
                                                    className={({ active }) =>
                                                        classNames(
                                                            size.inStock
                                                                ? 'bg-white shadow-sm text-gray-900 cursor-pointer'
                                                                : 'bg-gray-50 text-gray-200 cursor-not-allowed',
                                                            active ? 'ring-2 ring-indigo-500' : '',
                                                            'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                        )
                                                    }
                                                >
                                                    {({ active, checked }) => (
                                                        <>
                                                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                            {size.inStock ? (
                                                                <span
                                                                    className={classNames(
                                                                        active ? 'border' : 'border-2',
                                                                        checked ? 'border-indigo-500' : 'border-transparent',
                                                                        'absolute -inset-px rounded-md pointer-events-none'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />
                                                            ) : (
                                                                <span
                                                                    aria-hidden="true"
                                                                    className="absolute -inset-px rounded-md border-2 border-gray-200 pointer-events-none"
                                                                >
                                                                    <svg
                                                                        className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                                                                        viewBox="0 0 100 100"
                                                                        preserveAspectRatio="none"
                                                                        stroke="currentColor"
                                                                    >
                                                                        <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                                    </svg>
                                                                </span>
                                                            )}
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={itemInStock ? false : true}
                                    type="submit"
                                    className={itemInStock ? "mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        :
                                        "mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white cursor-not-allowed disabled:opacity-50"}
                                >
                                    {itemInStock ? "Add to cart" : "Out of stock"}
                                </button>
                                <ToastContainer autoClose={5000} />
                            </form>
                        </div>

                        <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{description}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                <div className="mt-4">
                                    <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                                        {product ? product.highlights.map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">{highlight}</span>
                                            </li>
                                        )) : null}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{details}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
