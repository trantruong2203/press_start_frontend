export interface OrderResponse {
    id: number;
    buyer_id: number ;
    order_code: string;
    total: number;
    created_at: string;
    paid_at: string;
    status: boolean;
};

export interface OrderCreate {
    order_code: string;
    buyer_id: number ;
    total: number;
    status: boolean;
};