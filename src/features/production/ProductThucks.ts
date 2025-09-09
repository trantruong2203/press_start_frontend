import { createAsyncThunk } from "@reduxjs/toolkit";
import ProductApi from "./ProductApi";
import type { ProductResponse, CreateProductRequest, UpdateProductRequest } from "../../interface/ProductResponse";
import { handleApiError } from "../../utils/errorHandler";

// Lấy tất cả sản phẩm
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

// Lấy sản phẩm theo ID
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

// Tạo sản phẩm mới
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

// Cập nhật sản phẩm
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

// Xóa sản phẩm
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