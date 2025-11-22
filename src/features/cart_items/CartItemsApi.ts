import axios from "axios";
import type { CartItemsResponse, CreateCartItemsRequest } from "../../interface/CartItemsRéponse";
const API_URL = import.meta.env.VITE_API_URL;

export const getAllCartItems = async (): Promise<CartItemsResponse[]> => {
    const response = await axios.get(`${API_URL}/cart-items`);
    return response.data.data;
};

export const getCartItemsById = async (id: number): Promise<CartItemsResponse> => {
    const response = await axios.get(`${API_URL}/cart-items/${id}`);
    return response.data.data;
};

export const createCartItems = async (cartItems: CreateCartItemsRequest): Promise<CartItemsResponse> => {
    const response = await axios.post(`${API_URL}/cart-items/create`, cartItems);
    return response.data.data;
};

export const updateCartItems = async (id: number, cartItems: CreateCartItemsRequest): Promise<CartItemsResponse> => {
    const response = await axios.put(`${API_URL}/cart-items/${id}`, cartItems);
    return response.data.data;
};

export const deleteCartItems = async (id: number): Promise<CartItemsResponse> => {
    const response = await axios.delete(`${API_URL}/cart-items/${id}`);
    return response.data.data as CartItemsResponse;
};