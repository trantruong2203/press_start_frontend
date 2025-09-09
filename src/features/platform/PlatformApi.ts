import axios from "axios";
import type { PlatformResponse } from "../../interface/PlatformResponse";

const API = import.meta.env.VITE_API_URL;

type ApiResponse<T> = { message?: string; data: T };

export const fetchAllPlatforms = async (): Promise<PlatformResponse[]> => {
    const res = await axios.get<ApiResponse<PlatformResponse[]>>(`${API}/platforms`, {
        withCredentials: true
    });
    return res.data.data;
};

export const getPlatformById = async (id : number) : Promise<PlatformResponse> => {
    const res = await axios.get<ApiResponse<PlatformResponse>>(`${API}/platforms/${id}`, {
        withCredentials: true
    });
    return res.data.data;
};

export const createPlatform = async (platform : import("../../interface/PlatformResponse").PlatformCreate): Promise<PlatformResponse> => {
    const res = await axios.post<ApiResponse<PlatformResponse>>(`${API}/platforms/create`, platform, {
        withCredentials: true
    });
    return res.data.data;
};

export const updatePlatform = async (id: number, platform: PlatformResponse): Promise<PlatformResponse> => {
	const payload = {
		name: platform.name,
		status: platform.status,
	};
	const res = await axios.patch(`${API}/platforms/update/${id}`, payload, {
		withCredentials: true
	});
	return (res.data && (res.data.platform ?? res.data)) as PlatformResponse;
};

export const deletePlatform = async (id: number): Promise<PlatformResponse> => {
    const res = await axios.delete<ApiResponse<PlatformResponse>>(`${API}/platforms/${id}`, {
        withCredentials: true
    });
    return res.data.data;
};
  

