import { createSlice } from "@reduxjs/toolkit";
import { getSellerProductsThunk, createSellerThunk, updateSellerThunk, deleteSellerThunk } from "./SellerThunk";
import type { SellerResponse } from "../../interface/SellerResponse";

const initialState: {
    products: SellerResponse[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
} = {
    products: [],
    status: "idle",
    error: null,
};

const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
        resetSellerState: (state) => {
            state.products = [];
            state.status = "idle";
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getSellerProductsThunk.fulfilled, (state, action) => {
            state.products = action.payload;
            state.status = "succeeded";
        });
        builder.addCase(createSellerThunk.fulfilled, (state, action) => {
            state.products.push(action.payload);
            state.status = "succeeded";
        });
        builder.addCase(updateSellerThunk.fulfilled, (state, action) => {
            const index = state.products.findIndex((seller) => seller.id === action.payload.id);
            state[index] = action.payload;
            state.status = "succeeded";
        });
        builder.addCase(deleteSellerThunk.fulfilled, (state, action) => {
            state.products = state.products.filter((seller) => seller.id !== action.payload as number);
            state.status = "succeeded";
        });
        builder.addCase(getSellerProductsThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || null;
        });
        builder.addCase(createSellerThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || null;
        });
        builder.addCase(updateSellerThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || null;
        });
        builder.addCase(deleteSellerThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message || null;
        });
    },
});

export const { resetSellerState } = sellerSlice.actions;

export default sellerSlice.reducer;