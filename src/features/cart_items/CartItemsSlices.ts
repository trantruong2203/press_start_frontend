import { createSlice } from "@reduxjs/toolkit";
import { getAllCartItemsThunk, getCartItemsByIdThunk, createCartItemsThunk, updateCartItemsThunk, deleteCartItemsThunk } from "./CartItemsThunks";
import type { CartItemsResponse } from "../../interface/CartItemsRéponse";

interface CartItemsState {
    cartItems: CartItemsResponse[];
    cartItem: {
        id?: number;
        product_id: number;
        quantity: number;
        status: boolean;
        created_at: string;
    };
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    searchKeyword: string;
    isEditing: boolean;
}

const innerValue = {
    product_id: 0,
    quantity: 0,
    status: true,
    created_at: "",
};

const cartItemsSlice = createSlice({
    name: "cartItems",
    initialState: {
        cartItems: [],
        cartItem: innerValue,
        status: "idle",
        error: null,
        searchKeyword: "",
        isEditing: false,
    } as CartItemsState,
    reducers: {
        setSearchKeyword: (state, action) => {
            state.searchKeyword = action.payload;
        },
        handleChange: (state, action) => {
            state.cartItem = {
                ...state.cartItems,
                ...action.payload,
            };
        },
        setCartItems: (state, action) => {
            state.cartItem = {
                ...state.cartItems,
                ...action.payload,
            };
        }
    },
    extraReducers: (builder) => {
        builder
            // GET ALL CART ITEMS
            .addCase(getAllCartItemsThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllCartItemsThunk.fulfilled, (state, action) => {
                state.cartItems = action.payload as CartItemsResponse[];
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(getAllCartItemsThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || null;
            })

            // GET CART ITEMS BY ID
            .addCase(getCartItemsByIdThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getCartItemsByIdThunk.fulfilled, (state, action) => {
                state.cartItem = {
                    ...state.cartItem,
                    ...action.payload,
                };
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(getCartItemsByIdThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || null;
            })

            // CREATE CART ITEMS
            .addCase(createCartItemsThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })  
            .addCase(createCartItemsThunk.fulfilled, (state, action) => {
                state.cartItems.push(action.payload as CartItemsResponse);
                state.status = "succeeded";
                state.error = null;
                state.cartItem = innerValue;
            })
                .addCase(createCartItemsThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || null;
            })

            // UPDATE CART ITEMS
            .addCase(updateCartItemsThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateCartItemsThunk.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.map((item) => 
                    item.id === action.payload.id ? action.payload : item
                );
                state.cartItem = innerValue;
                state.isEditing = false;
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(updateCartItemsThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || null;
            })

            // DELETE CART ITEMS
            .addCase(deleteCartItemsThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteCartItemsThunk.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(deleteCartItemsThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || null;
            });
    }
});

export const { setSearchKeyword, handleChange, setCartItems } = cartItemsSlice.actions;
export default cartItemsSlice.reducer;