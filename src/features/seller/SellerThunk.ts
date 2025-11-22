import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleApiError } from "../../utils/errorHandler";
import type { CreateSellerRequest, SellerResponse } from "../../interface/SellerResponse";
import { getAllSellers, getSellerById, createSeller, updateSeller, deleteSeller, getSellersByProduct } from "./SellerAPi";

export const getAllSellersThunk = createAsyncThunk<SellerResponse[], void, { rejectValue: string }>(
    "sellers/getAllSellers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllSellers();
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const getSellerByIdThunk = createAsyncThunk<SellerResponse, number, { rejectValue: string }>(
    "sellers/getSellerById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await getSellerById(id);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const createSellerThunk = createAsyncThunk<SellerResponse, CreateSellerRequest, { rejectValue: string }>(
    "sellers/createSeller",
    async (seller, { rejectWithValue }) => {
        try {
            const response = await createSeller(seller);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const updateSellerThunk = createAsyncThunk<SellerResponse, { id: number, seller: CreateSellerRequest }, { rejectValue: string }>(
    "sellers/updateSeller",
    async ({ id, seller }, { rejectWithValue }) => {
        try {
            const response = await updateSeller(id, seller);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const deleteSellerThunk = createAsyncThunk<number, number, { rejectValue: string }>(
    "sellers/deleteSeller",
    async (id, { rejectWithValue }) => {
        try {
            await deleteSeller(id);
            return id;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const getSellersByProductThunk = createAsyncThunk<SellerResponse[], number, { rejectValue: string }>(
    "sellers/getSellersByProduct",
    async (productId, { rejectWithValue }) => {
        try {
            const response = await getSellersByProduct(productId);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);