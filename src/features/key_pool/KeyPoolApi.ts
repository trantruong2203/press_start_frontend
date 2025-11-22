import axios from "axios";
import type { CreateKeyPoolRequest } from "../../interface/KeyPoolResponse";
import type { KeyPoolResponse } from "../../interface/KeyPoolResponse";
const API_URL = import.meta.env.VITE_API_URL;

export const getAllKeyPool = async (): Promise<KeyPoolResponse[]> => {
    const response = await axios.get(`${API_URL}/key-pool`);
    return response.data;
};

export const getKeyPoolById = async (id: number): Promise<KeyPoolResponse> => {
    const response = await axios.get(`${API_URL}/key-pool/${id}`);
    return response.data;
};

export const createKeyPool = async (keyPool: CreateKeyPoolRequest): Promise<KeyPoolResponse> => {
    const response = await axios.post(`${API_URL}/key-pool/create`, keyPool);
    return response.data;
};

export const updateKeyPool = async (id: number, keyPool: CreateKeyPoolRequest): Promise<KeyPoolResponse> => {
    const response = await axios.put(`${API_URL}/key-pool/${id}`, keyPool);
    return response.data;
};

export const deleteKeyPool = async (id: number): Promise<KeyPoolResponse> => {
    const response = await axios.delete(`${API_URL}/key-pool/${id}`);
    return response.data as KeyPoolResponse;
};