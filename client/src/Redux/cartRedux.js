import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        qty: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.qty += 1;
            state.products.push(action.payload);
            state.total += action.payload.productPrice * action.payload.quantity;
        },
        increaseQuantity: (state, action) => {
            console.log(action.payload);
            state.products.filter(el => {

                if(el.id === action.payload) {
                    console.log(el)
                }
            })
        },
        removeFromCart: (state, action) => {
            const nextCartItems = state.products.filter((el) => el.id !== action.payload.id );
            state.qty -= 1;
            state.products = nextCartItems;
            state.total -= action.payload.productPrice * action.payload.quantity;
        }
    }
});

export const { addProduct, increaseQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
