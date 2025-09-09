export interface PlatformResponse {
    id: number;
    name: string;
    status: boolean;
}

export interface PlatformCreate {
    name: string;
    status: boolean;
}