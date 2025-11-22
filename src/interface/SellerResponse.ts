export interface SellerResponse {
    id: number;
    user_id: number;
    product_id: number;
    price_original: number;
    discount?: number;
    status: boolean;
    stock: number;
    created_at: Date;
}

export interface CreateSellerRequest {
    user_id: number;
    product_id: number;
    price_original: number;
    discount?: number;
    stock: number;
    status?: boolean;
}

