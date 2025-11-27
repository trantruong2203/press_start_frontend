import { createAsyncThunk } from "@reduxjs/toolkit";
import ProductApi from "./ProductApi";
import type { ProductResponse, CreateProductRequest, UpdateProductRequest } from "../../interface/ProductResponse";
import { handleApiError } from "../../utils/errorHandler";

export const getAllProductsThunk = createAsyncThunk<ProductResponse[], void, { rejectValue: string }>(
    "products/getAllProducts",
    async (_, { rejectWithValue }) => {
        try {
            const response = await ProductApi.getAllProducts();
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const getProductByIdThunk = createAsyncThunk<ProductResponse, number, { rejectValue: string }>(
    "products/getProductById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await ProductApi.getProductById(id);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const createProductThunk = createAsyncThunk<ProductResponse, CreateProductRequest, { rejectValue: string }>(
    "products/createProduct",
    async (product, { rejectWithValue }) => {
        try {
            const response = await ProductApi.createProduct(product);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const updateProductThunk = createAsyncThunk<ProductResponse, { id: number, product: UpdateProductRequest }, { rejectValue: string }>(
    "products/updateProduct",
    async ({ id, product }, { rejectWithValue }) => {
        try {
            const response = await ProductApi.updateProduct(id, product);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const deleteProductThunk = createAsyncThunk<number, number, { rejectValue: string }>(
    "products/deleteProduct",
    async (id, { rejectWithValue }) => {
        try {
            await ProductApi.deleteProduct(id);
            return id;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);