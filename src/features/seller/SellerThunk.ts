import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSeller, deleteSeller, getSellerProducts, updateSeller } from "./SellerAPi";
import type { SellerResponse } from "../../interface/SellerResponse";

export const getSellerProductsThunk = createAsyncThunk(
    "seller/getSellerProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getSellerProducts();
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const createSellerThunk = createAsyncThunk(
    "seller/createSeller",
    async (seller: SellerResponse, { rejectWithValue }) => {
        try {
            const response = await createSeller(seller);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const updateSellerThunk = createAsyncThunk(
    "seller/updateSeller",
    async ({ id, seller }: { id: string, seller: SellerResponse }, { rejectWithValue }) => {
        try {
            const response = await updateSeller(id, seller);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const deleteSellerThunk = createAsyncThunk(
    "seller/deleteSeller",
    async (id: string, { rejectWithValue }) => {
        try {
            await deleteSeller(id);
            return id;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);