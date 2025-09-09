import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getProductsImage = createAsyncThunk(
    'products_image/getProductsImage',
    async () => {
        const response = await axios.get(`${API_URL}/products_image`);
        return response.data;
    }
);

export const getProductsImageById = createAsyncThunk(
    'products_image/getProductsImageById',
    async (id: number) => {
        const response = await axios.get(`${API_URL}/products_image/${id}`);
        return response.data;
    }
);
