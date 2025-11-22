import axios from "axios";
import type { SellerResponse, CreateSellerRequest } from "../../interface/SellerResponse";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllSellers = async (): Promise<SellerResponse[]> => {
    const response = await axios.get(`${API_URL}/sellers`);
    return response.data.data;
};

export const getSellerById = async (id: number): Promise<SellerResponse> => {
    const response = await axios.get(`${API_URL}/sellers/${id}`);
    return response.data.data;
};

export const createSeller = async (seller: CreateSellerRequest): Promise<SellerResponse> => {
    const response = await axios.post(`${API_URL}/sellers/create`, seller);
    return response.data.data;
};

export const updateSeller = async (id: number, seller: CreateSellerRequest): Promise<SellerResponse> => {
    const response = await axios.put(`${API_URL}/sellers/${id}`, seller);
    return response.data.data;
};

export const deleteSeller = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/sellers/${id}`);
};

export const getSellersByProduct = async (productId: number): Promise<SellerResponse[]> => {
    const response = await axios.get(`${API_URL}/sellers/by-product/${productId}`);
    return response.data.data;
};
