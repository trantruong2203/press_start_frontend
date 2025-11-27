export interface CartItemsResponse {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    created_at: string;
}

export interface CreateCartItemsRequest {
    user_id: number;
    email: string;
    product_id: number;
    quantity: number;
}