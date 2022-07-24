import React from 'react'

export const MobileHamburgerMenu = ({ menu }) => {
    return (
        <>
            {
                menu.map((list) => (
                    <a href={list.url} className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{list.title}</a>
                ))
            }
        </>
    )
}
