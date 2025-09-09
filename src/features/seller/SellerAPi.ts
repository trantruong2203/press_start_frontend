import axios from "axios";
import type { SellerResponse } from "../../interface/SellerResponse";

const API_URL = import.meta.env.VITE_API_URL;

export const getSellerProducts = async (): Promise<SellerResponse[]> => {
    const response = await axios.get(`${API_URL}/seller/products`);
    return response.data;
};

export const createSeller = async (seller: SellerResponse): Promise<SellerResponse> => {
    const response = await axios.post(`${API_URL}/seller`, seller);
    return response.data;
};

export const updateSeller = async (id: string, seller: SellerResponse): Promise<SellerResponse> => {
    const response = await axios.put(`${API_URL}/seller/${id}`, seller);
    return response.data;
};

export const deleteSeller = async (id: string): Promise<void> => {
    const response = await axios.delete(`${API_URL}/seller/${id}`);
    return response.data;
};
