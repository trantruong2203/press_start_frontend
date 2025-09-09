import axios from "axios";
import type { CategoriesResponse, CategoriesCreate } from "../../interface/CategoriesResponse";

const API = import.meta.env.VITE_API_URL;

type ApiResponse<T> = { message?: string; data: T };

export const fetchAllCategories = async (): Promise<CategoriesResponse[]> => {
    const res = await axios.get<ApiResponse<CategoriesResponse[]>>(`${API}/categories`, {
        withCredentials: true
    });
    return res.data.data;
};

export const getCategoryById = async (id : number) : Promise<CategoriesResponse> => {
    const res = await axios.get<ApiResponse<CategoriesResponse>>(`${API}/categories/${id}`, {
        withCredentials: true
    });
    return res.data.data;
};

export const createCategory = async (category : CategoriesCreate): Promise<CategoriesResponse> => {
    const res = await axios.post<ApiResponse<CategoriesResponse>>(`${API}/categories/create`, category, {
        withCredentials: true
    });
    return res.data.data;
};

export const updateCategory = async (id: number, category: CategoriesCreate): Promise<CategoriesResponse> => {
	const payload = {
		name: category.name,
		description: category.description,
		status: true
	};
	const res = await axios.patch(`${API}/categories/update/${id}`, payload, {
		withCredentials: true
	});
	return (res.data && (res.data.category ?? res.data)) as CategoriesResponse;
};

export const deleteCategory = async (id: number): Promise<CategoriesResponse> => {
    const res = await axios.delete<ApiResponse<CategoriesResponse>>(`${API}/categories/${id}`, {
        withCredentials: true
    });
    return res.data.data;
};
  