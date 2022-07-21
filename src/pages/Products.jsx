import React from 'react'

const products = [
    {
      id: 1,
      name: 'Basic Tee',
      href: '#',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
        id: 2,
        name: 'Wool shirt',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhpbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60',
        imageAlt: "Chelsea wool",
        price: '$65',
        color: 'Milk',
      },
      {
        id: 3,
        name: 'Round Polo Shirt',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dCUyMHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
        imageAlt: "Round Shirt",
        price: '$20',
        color: 'Red, Black, Yellow, White',
      },
      {
        id: 4,
        name: 'Round Polo',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dCUyMHNoaXJ0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
        imageAlt: "Round Shirt",
        price: '$25',
        color: 'Black',
      },
      {
        id: 5,
        name: 'White sweat shirt',
        href: '#',
        imageSrc: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dCUyMHNoaXJ0JTIwbW9ja3VwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
        imageAlt: "White sweat shirt",
        price: '$85',
        color: 'White and Black',
      },
      {
          id: 6,
          name: 'Moscow Shirt',
          href: '#',
          imageSrc: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8c2xlZXZlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=400&q=60',
          imageAlt: "Moscow shirt",
          price: '$69',
          color: 'Gray',
        },
        {
          id: 7,
          name: 'Round Long Polo',
          href: '#',
          imageSrc: 'https://images.unsplash.com/photo-1557315360-6a350ab4eccd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNsZWV2ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
          imageAlt: "Round Shirt",
          price: '$70',
          color: 'Red',
        },
        {
          id: 8,
          name: 'Sleeves',
          href: '#',
          imageSrc: 'https://images.unsplash.com/photo-1572112686652-3b8957ffc299?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHNsZWV2ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60',
          imageAlt: "Round Shirt",
          price: '$15',
          color: 'White',
        },
  ]

const Products = () => {
  return (
    <div>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">High demand</h2>
  
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products


