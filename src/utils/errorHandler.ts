import { AxiosError } from "axios";

export interface ApiErrorResponse {
    message: string;
    status?: number;
}

export const handleApiError = (err: unknown): string => {
    if (err instanceof AxiosError) {
        if (err.response?.data?.message) {
            return err.response.data.message;
        }
        if (err.response?.status) {
            switch (err.response.status) {
                case 400:
                    return 'Dữ liệu không hợp lệ';
                case 401:
                    return 'Không có quyền truy cập';
                case 403:
                    return 'Bị từ chối truy cập';
                case 404:
                    return 'Không tìm thấy dữ liệu';
                case 500:
                    return 'Lỗi server';
                default:
                    return 'Lỗi từ server';
            }
        }
        return err.message || 'Lỗi kết nối';
    }
    return 'Lỗi không xác định';
};

export const createAsyncThunkWithErrorHandling = <T, P>(
    typePrefix: string,
    asyncFunction: (arg: P) => Promise<T>
) => {
    return async (arg: P, { rejectWithValue }: { rejectWithValue: (value: string) => any }) => {
        try {
            return await asyncFunction(arg);
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    };
}; 