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
            //localStorage.setItem("cartItems", JSON.stringify(state.products.push(action.payload)));
        }
    }
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
