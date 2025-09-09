import axios from "axios";
import type { ProductCateResponse } from "../../interface/ProductCateResponse";

const API = import.meta.env.VITE_API_URL;

type ApiResponse<T> = { message?: string; data: T };

export const fetchAllProductCate = async (): Promise<ProductCateResponse[]> => {
    const res = await axios.get<ApiResponse<ProductCateResponse[]>>(`${API}/product-cate`, {
        withCredentials: true
    });
    return res.data.data;
};

export const getProductCateById = async (id : number) : Promise<ProductCateResponse> => {
    const res = await axios.get<ApiResponse<ProductCateResponse>>(`${API}/product-cate/${id}`, {
        withCredentials: true
    });
    return res.data.data;
};

export const createProductCate = async (productCate : ProductCateResponse): Promise<ProductCateResponse> => {
    const res = await axios.post<ApiResponse<ProductCateResponse>>(`${API}/product-cate/create`, productCate, {
        withCredentials: true
    });
    return res.data.data;
};

export const updateProductCate = async (id: number, productCate: ProductCateResponse): Promise<ProductCateResponse> => {
	const payload = {
		productId: productCate.productId,
		categoryId: productCate.categoryId,
	};
	const res = await axios.patch(`${API}/product-cate/update/${id}`, payload, {
		withCredentials: true
	});
	return (res.data && (res.data.productCate ?? res.data)) as ProductCateResponse;
};

export const deleteProductCate = async (id: number): Promise<ProductCateResponse> => {
    const res = await axios.delete<ApiResponse<ProductCateResponse>>(`${API}/product-cate/${id}`, {
        withCredentials: true
    });
    return res.data.data;
};
  
export const updateStatus = async (id: number, status: boolean): Promise<ProductCateResponse> => {
    const res = await axios.patch<ApiResponse<ProductCateResponse>>(`${API}/product-cate/update-status/${id}`, {
        status
    }, {
        withCredentials: true
    });
    return res.data.data;
};
