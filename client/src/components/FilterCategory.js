import React, { useState } from 'react';

const filters = [
    {
        id: 1,
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
        ],
    },
    {
        id: 2,
        name: 'Category',
        options: [
            { value: 'new-arrivals', label: 'New Arrivals', checked: false },
            { value: 'sale', label: 'Sale', checked: false },
            { value: 'travel', label: 'Travel', checked: true },
            { value: 'organization', label: 'Organization', checked: false },
            { value: 'accessories', label: 'Accessories', checked: false },
        ],
    },
    {
        id: 3,
        name: 'Size',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
        ],
    },
]

export const FilterCategory = () => {
    const [open, setOpen] = useState(false);

    const toggleOpenAndClose = () => {
        setOpen(!open);
    }
    return (
        <div>
            {
                filters.map((option) => (
                    <div className="border-t border-gray-200 px-4 py-6" key={option.id}>
                        <h3 className="-mx-2 -my-3 flow-root">

                            <button type="button" className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500" aria-controls="filter-section-mobile-0" aria-expanded="false">
                                <span className="font-medium text-gray-900"> {option.name} </span>
                                <span className="ml-6 flex items-center">
                                    {
                                        open ? <svg onClick={toggleOpenAndClose} className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd" />
                                        </svg>
                                            :
                                            <svg onClick={toggleOpenAndClose} className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                                            </svg>
                                    }



                                </span>
                            </button>
                        </h3>

                        {
                            open && <div className="pt-6" id="filter-section-mobile-0">
                                <div className="space-y-6">
                                    {
                                        option.options.map((subOption) => (
                                            <div className="flex items-center">
                                                <input id="filter-mobile-color-0" name="color[]" defaultValue={subOption.value} defaultChecked={subOption.checked} type="checkbox" className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
                                                <label for="filter-mobile-color-0" className="ml-3 min-w-0 flex-1 text-gray-500"> {subOption.label} </label>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        }

                    </div>
                ))
            }
        </div>
    )
}
