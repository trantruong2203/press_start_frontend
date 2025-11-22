import axios from "axios";
import type { OrderCreate, OrderResponse } from "../../interface/OrdersRespones";

const API = import.meta.env.VITE_API_URL;

type ApiResponse<T> = { message?: string; data: T };

export const fetchAllOrders = async (): Promise<OrderResponse[]> => {
    const res = await axios.get<ApiResponse<OrderResponse[]>>(`${API}/orders`, {
        withCredentials: true
    });
    return res.data.data;
};

export const getOrderById = async (id : number) : Promise<OrderResponse> => {
    const res = await axios.get<ApiResponse<OrderResponse>>(`${API}/orders/${id}`, {
        withCredentials: true
    });
    return res.data.data;
};

export const createOrder = async (order : OrderCreate): Promise<OrderResponse> => {
    const res = await axios.post<ApiResponse<OrderResponse>>(`${API}/orders/create`, order, {
        withCredentials: true
    });
    return res.data.data;
};

export const updateOrder = async (id: number, order: OrderResponse): Promise<OrderResponse> => {
	const payload = {
		order_code: order.order_code,
		total: order.total,
		status: order.status
	};
	const res = await axios.patch(`${API}/orders/update/${id}`, payload, {
		withCredentials: true
	});
	return (res.data && (res.data.order ?? res.data)) as OrderResponse;
};

export const deleteOrder = async (id: number): Promise<OrderResponse> => {
    const res = await axios.delete<ApiResponse<OrderResponse>>(`${API}/orders/${id}`, {
        withCredentials: true
    });
    return res.data.data;
};
  

