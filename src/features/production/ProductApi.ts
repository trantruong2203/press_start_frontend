import type { ProductResponse, CreateProductRequest, UpdateProductRequest } from "../../interface/ProductResponse";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

interface ApiResponse<T> {
    message: string;
    data: T;
}

const getAllProducts = async (): Promise<ProductResponse[]> => {
    const response = await axios.get<ApiResponse<ProductResponse[]>>(`${API_URL}/products`);
    return response.data.data;
}

const getProductById = async (id: number): Promise<ProductResponse> => {
    const response = await axios.get<ApiResponse<ProductResponse | ProductResponse[]>>(`${API_URL}/products/${id}`);
    const payload = response.data.data;
    return Array.isArray(payload) ? payload[0] as ProductResponse : payload;
}

const createProduct = async (product: CreateProductRequest): Promise<ProductResponse> => {
    const response = await axios.post<ApiResponse<ProductResponse>>(`${API_URL}/products/create`, product);
    return response.data.data;
}

const updateProduct = async (id: number, product: UpdateProductRequest): Promise<ProductResponse> => {
    const response = await axios.put<ApiResponse<ProductResponse>>(`${API_URL}/products/${id}`, product);
    return response.data.data;
}

const deleteProduct = async (id: number): Promise<void> => {
    await axios.delete<ApiResponse<unknown>>(`${API_URL}/products/${id}`);
}

export default { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };