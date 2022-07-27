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
            const itemIndex = state.products.findIndex(cartItem => cartItem.id === action.payload);
            state.products[itemIndex].quantity += 1;
            state.total += state.products[itemIndex].price;
        },
        decreaseQuantity: (state, action) => {
            const itemIndex = state.products.findIndex(cartItem => cartItem.id === action.payload);

            if (state.products[itemIndex].quantity > 1) {
                state.products[itemIndex].quantity -= 1;
                state.total -= state.products[itemIndex].price;
            }
        },
        removeFromCart: (state, action) => {
            const nextCartItems = state.products.filter((el) => el.id !== action.payload.id);
            state.qty -= 1;
            state.products = nextCartItems;
            state.total -= action.payload.productPrice * action.payload.quantity;
        }
    }
});

export const { addProduct, increaseQuantity, removeFromCart, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
