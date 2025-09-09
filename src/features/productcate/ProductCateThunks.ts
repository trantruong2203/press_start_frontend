import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProductCateById, createProductCate, updateProductCate, deleteProductCate, updateStatus } from "./ProductCateApi";
import { AxiosError } from "axios";
import type { ProductCateResponse } from "../../interface/ProductCateResponse";
import { fetchAllProductCate } from "./ProductCateApi";


export const getProductCateThunk = createAsyncThunk<ProductCateResponse[], void, { rejectValue: string }>(
  'product-cate/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAllProductCate();
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data) {
        return rejectWithValue(err.response.data.message || 'Lỗi từ server');
      }
      return rejectWithValue('Lỗi không xác định');
    }
  }
);

export const getProductCateByIdThunk = createAsyncThunk<ProductCateResponse, number, { rejectValue: string }>(
  'product-cate/getById',
  async (id, { rejectWithValue }) => {
    try {
      return await getProductCateById(id);
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data) {
        return rejectWithValue(err.response.data.message || 'Lỗi từ server');
      }
      return rejectWithValue('Lỗi không xác định');
    }
  }
);


export const createProductCateThunk = createAsyncThunk<ProductCateResponse, ProductCateResponse, { rejectValue: string }>(
  'product-cate/create',
  async (productCate, { rejectWithValue }) => {
    try {
      return await createProductCate(productCate);
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data) {
        return rejectWithValue(err.response.data.message || 'Lỗi từ server');
      }
      return rejectWithValue('Lỗi không xác định');
    }
  }
);

    export const updateProductCateThunk = createAsyncThunk<ProductCateResponse, {id: number, productCate: ProductCateResponse}, { rejectValue: string }>(
  'product-cate/update',
  async ({id, productCate}, { rejectWithValue }) => {
    try {
      const response = await updateProductCate(id, productCate);
      return response;
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data) {
        return rejectWithValue(err.response.data.message || 'Lỗi từ server');
      }
      return rejectWithValue('Lỗi không xác định');
    }
  }
);

export const updateStatusThunk = createAsyncThunk<ProductCateResponse, {id: number, status: boolean}, { rejectValue: string }>(
  'product-cate/updateStatus',
  async ({id, status}, { rejectWithValue }) => {
    try {
      return await updateStatus(id, status);
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data) {
        return rejectWithValue(err.response.data.message || 'Lỗi từ server');
      }
      return rejectWithValue('Lỗi không xác định');
    }
  }
);
export const deleteProductCateThunk = createAsyncThunk<ProductCateResponse, number, { rejectValue: string }>(
  'product-cate/delete',
  async (id, { rejectWithValue }) => {
    try {
      return await deleteProductCate(id);
    } catch (err: unknown) {
      if (err instanceof AxiosError && err.response?.data) {
        return rejectWithValue(err.response.data.message || 'Lỗi từ server');
      }
      return rejectWithValue('Lỗi không xác định');
    }
  }
);
