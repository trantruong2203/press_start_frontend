import type { CategoriesResponse } from "./CategoriesResponse";

export interface ProductResponse {
    id: number;
    name: string;
    description: string;
    banner_url: string;
    trailer_url: string;
    author: number;
    platform_id: number;
    status: boolean;
    createdAt: string;
    listCate?: CategoriesResponse[];
    listImg?: string[];
}

export interface CreateProductRequest {
    id?: number; // Thêm id optional để hỗ trợ cả create và update
    name: string;
    description: string;
    platform_id: number;
    banner_url: string;
    trailer_url: string;
    status: boolean;
    author: number;
    createdAt: string;
    listCate: CategoriesResponse[];
    listImg: string[];
}

export interface UpdateProductRequest {
    name?: string;
    description?: string;
    platform_id?: number;
    banner_url?: string;
    trailer_url?: string;
    status?: boolean;
    author?: number;
    listCate?: number[];
    listImg?: string[];
}