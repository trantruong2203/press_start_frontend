export interface KeyPoolResponse {
    id: number;
    product_id: number;
    order_item_id: number;
    key_code: string;
    delivered: boolean;
    status: boolean;
    created_at: string;
};

export interface CreateKeyPoolRequest {
    product_id: number;
    key_code: string;
    status: boolean;
    created_at: string;
};