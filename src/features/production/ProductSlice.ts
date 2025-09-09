import { createSlice } from "@reduxjs/toolkit";
import { getAllProductsThunk, getProductByIdThunk, createProductThunk, updateProductThunk, deleteProductThunk } from "./ProductThucks";
import type { ProductResponse } from "../../interface/ProductResponse";
import type { CategoriesResponse } from "../../interface/CategoriesResponse";

interface ProductState {
    products: ProductResponse[];
    product: {
        id?: number;
        name: string;
        description: string;
        platform_id: number;
        banner_url: string;
        trailer_url: string;
        author: number;
        status: boolean;
        createdAt: string;
        listCate: CategoriesResponse[];
        listImg: string[];
    };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    searchKeyword: string;
    isEditing: boolean;
}

const innerValue = {
    name: '',
    description: '',
    platform_id: 0,
    banner_url: '',
    trailer_url: '',
    author: 0,
    status: true,
    createdAt: '',
    listCate: [],
    listImg: [],
};

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [] as ProductResponse[],
        product: innerValue,
        status: "idle",
        error: null as string | null,
        searchKeyword: '',
        isEditing: false,
    } as ProductState,

    reducers: {
        setSearchKeyword: (state, action) => {
            state.searchKeyword = action.payload;
        },
        handleChange: (state, action) => {
            state.product = {
                ...state.product,
                ...action.payload,
            };
        },
        setProduct: (state, action) => {
            state.product = {
                ...state.product,
                ...action.payload,
            };
        },
        resetProduct: (state) => {
            state.product = innerValue;
            state.isEditing = false;
            state.error = null;
        },
        setEditingMode: (state, action) => {
            state.isEditing = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // GET ALL PRODUCTS
        builder.addCase(getAllProductsThunk.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(getAllProductsThunk.fulfilled, (state, action) => {
            state.products = action.payload;
            state.status = "succeeded";
            state.error = null;
        });
        builder.addCase(getAllProductsThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || 'Lỗi khi tải danh sách sản phẩm';
        });

        // GET PRODUCT BY ID
        builder.addCase(getProductByIdThunk.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(getProductByIdThunk.fulfilled, (state, action) => {
            state.product = {
                ...state.product,
                ...action.payload,
            };
            state.status = "succeeded";
            state.error = null;
        });
        builder.addCase(getProductByIdThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || 'Lỗi khi tải thông tin sản phẩm';
        });

        // CREATE PRODUCT
        builder.addCase(createProductThunk.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(createProductThunk.fulfilled, (state, action) => {
            state.products.push(action.payload);
            console.log(action.payload);
            state.status = "succeeded";
            state.error = null;
            state.product = innerValue; // Reset form
        });
        builder.addCase(createProductThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || 'Lỗi khi tạo sản phẩm';
        });

        // UPDATE PRODUCT
        builder.addCase(updateProductThunk.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(updateProductThunk.fulfilled, (state, action) => {
            state.products = state.products.map((item) => 
                item.id === action.payload.id ? action.payload : item
            );
            state.product = innerValue; // Reset form
            state.isEditing = false;
            state.status = "succeeded";
            state.error = null;
        });
        builder.addCase(updateProductThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || 'Lỗi khi cập nhật sản phẩm';
        });

        // DELETE PRODUCT
        builder.addCase(deleteProductThunk.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(deleteProductThunk.fulfilled, (state, action) => {
            state.products = state.products.filter((item) => item.id !== action.payload);
            state.status = "succeeded";
            state.error = null;
        });
        builder.addCase(deleteProductThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || 'Lỗi khi xóa sản phẩm';
        });
    }
});

export const { 
    setSearchKeyword, 
    handleChange, 
    setProduct, 
    resetProduct, 
    setEditingMode, 
    clearError 
} = productSlice.actions;
export default productSlice.reducer;