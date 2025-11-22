export interface AccountPoolResponse {
    id: number;
    product_id: number;
    order_item_id: number;
    username: string;
    password: string;
    delivered: boolean;
    created_at: string;
    status: boolean;
};

export interface CreateAccountPoolRequest {
    product_id: number;
    username: string;
    password: string;
    status: boolean;
};
