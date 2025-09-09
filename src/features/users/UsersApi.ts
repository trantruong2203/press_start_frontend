import axios from "axios";
import type { LoginRequest, LoginResponse, UserResponse } from "../../interface/UserResponse";

const API = import.meta.env.VITE_API_URL;

type ApiResponse<T> = { message?: string; data: T };

export const fetchAllUsers = async (): Promise<UserResponse[]> => {
    const res = await axios.get<ApiResponse<UserResponse[]>>(`${API}/users`, {
        withCredentials: true
    });
    return res.data.data;
};

export const getUserByAccount = async (email : string) : Promise<UserResponse> => {
    const res = await axios.get<ApiResponse<UserResponse>>(`${API}/users/${email}`, {
        withCredentials: true
    });
    return res.data.data;
};

export const login = async (account : LoginRequest): Promise<LoginResponse> => {
    const res = await axios.post<ApiResponse<LoginResponse>>(`${API}/users/login`, account, {
        withCredentials: true
    });
    return res.data.data;
};

export const register = async (account: UserResponse): Promise<UserResponse> => {
	const payload = {
		username: account.username,
		password: account.password,
		email: account.email,
		phone: account.phone ?? '',
		avatar: account.avatar ?? ''
	};
	const res = await axios.post(`${API}/users/create`, payload, {
		withCredentials: true
	});
	return (res.data && (res.data.user ?? res.data)) as UserResponse;
};

export const updateUser = async (email: string, phone: string, avatar: string): Promise<UserResponse> => {
    const res = await axios.patch<ApiResponse<UserResponse>>(`${API}/users/update/${email}`, {
        phone,
        avatar
    }, {
        withCredentials: true
    });
    return res.data.data;
};
  
export const updatePassword = async (email: string, password: string): Promise<UserResponse> => {
    const res = await axios.put<ApiResponse<UserResponse>>(`${API}/users/update-password/${email}`, {
        password
    }, {
        withCredentials: true
    });
    return res.data.data;
};
