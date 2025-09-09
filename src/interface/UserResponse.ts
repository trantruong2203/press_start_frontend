export interface UserResponse {
    id: number;
    username: string;
    password: string;
    email: string;
    phone: string;
    avatar: string;
    role: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    phone: string;
    avatar: string;
};

