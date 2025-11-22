import axios from "axios";
import type { CreateAccountPoolRequest } from "../../interface/AccountPoolResponse";
import type { AccountPoolResponse } from "../../interface/AccountPoolResponse";
const API_URL = import.meta.env.VITE_API_URL;

export const getAllAccountPool = async (): Promise<AccountPoolResponse[]> => {
    const response = await axios.get(`${API_URL}/account-pool`);
    return response.data;
};

export const getAccountPoolById = async (id: number): Promise<AccountPoolResponse> => {
    const response = await axios.get(`${API_URL}/account-pool/${id}`);
    return response.data;
};

export const createAccountPool = async (accountPool: CreateAccountPoolRequest): Promise<AccountPoolResponse> => {
    const response = await axios.post(`${API_URL}/account-pool/create`, accountPool);
    return response.data;
};

export const updateAccountPool = async (id: number, accountPool: CreateAccountPoolRequest): Promise<AccountPoolResponse> => {
    const response = await axios.put(`${API_URL}/account-pool/${id}`, accountPool);
    return response.data;
};

export const deleteAccountPool = async (id: number): Promise<AccountPoolResponse> => {
    const response = await axios.delete(`${API_URL}/account-pool/${id}`);
    return response.data as AccountPoolResponse;
};