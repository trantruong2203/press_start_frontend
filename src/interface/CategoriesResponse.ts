export interface CategoriesResponse {
    id: number;
    name: string;
    description: string;
    status: boolean;
};

export interface CategoriesCreate {
    name: string;
    description: string;
};
