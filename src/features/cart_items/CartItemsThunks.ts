import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCartItems, getCartItemsById, createCartItems, updateCartItems, deleteCartItems } from "./CartItemsApi";
import { handleApiError } from "../../utils/errorHandler";
import type { CartItemsResponse, CreateCartItemsRequest } from "../../interface/CartItemsRéponse";

export const getAllCartItemsThunk = createAsyncThunk<CartItemsResponse[], void, { rejectValue: string }>(
    "cartItems/getAllCartItems",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllCartItems();
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const getCartItemsByIdThunk = createAsyncThunk<CartItemsResponse, number, { rejectValue: string }>(
    "cartItems/getCartItemsById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await getCartItemsById(id);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const createCartItemsThunk = createAsyncThunk<CartItemsResponse, CreateCartItemsRequest, { rejectValue: string }>(
    "cartItems/createCartItems",
    async (cartItems, { rejectWithValue }) => {
        try {
            const response = await createCartItems(cartItems);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const updateCartItemsThunk = createAsyncThunk<CartItemsResponse, { id: number, cartItems: CreateCartItemsRequest }, { rejectValue: string }>(
    "cartItems/updateCartItems",
    async ({ id, cartItems }, { rejectWithValue }) => {
        try {
            const response = await updateCartItems(id, cartItems);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const deleteCartItemsThunk = createAsyncThunk<CartItemsResponse, number, { rejectValue: string }>(
    "cartItems/deleteCartItems",
    async (id, { rejectWithValue }) => {
        try {
            const response = await deleteCartItems(id);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);