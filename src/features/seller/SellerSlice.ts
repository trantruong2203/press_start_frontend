import { createSlice } from "@reduxjs/toolkit";
import { getSellerByIdThunk, getAllSellersThunk, getSellersByProductThunk } from "./SellerThunk";
import type { SellerResponse } from "../../interface/SellerResponse";
import { createSellerThunk, deleteSellerThunk, updateSellerThunk } from "./SellerThunk";

interface SellerState {
    sellers: SellerResponse[];
    seller: {
        id?: number;
        user_id: number | null;
        product_id: number | null;
        price_original: number | null;
        discount?: number | null;
        status: boolean;
        stock: number | null;
    };
    
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    searchKeyword: string;
    isEditing: boolean;
}

const innerValue = {
    user_id: null,
    product_id: null,
    price_original: null,
    discount: null,
    stock: null,
    status: true,
};

const sellerSlice = createSlice({
    name: 'seller',
    initialState: {
        sellers: [] as SellerResponse[],
        seller: innerValue,
        status: "idle",
        error: null as string | null,
        searchKeyword: '',
        isEditing: false,
    } as SellerState,

    reducers: {
        setSearchKeyword: (state, action) => {
            state.searchKeyword = action.payload;
        },
        handleChange: (state, action) => {
            state.seller = {
                ...state.seller,
                ...action.payload,
            };
        },
        setSeller: (state, action) => {
            state.seller = {
                ...state.seller,
                ...action.payload,
            };
        },
        resetSeller: (state) => {
            state.seller = innerValue;
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
        // GET ALL SELLERS
        builder.addCase(getAllSellersThunk.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(getAllSellersThunk.fulfilled, (state, action) => {
            state.sellers = action.payload as SellerResponse[];
            state.status = "succeeded";
            state.error = null;
        });
        builder.addCase(getAllSellersThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || 'Lỗi khi tải danh sách Sellers';
        });

        // GET SELLER BY ID
        builder.addCase(getSellerByIdThunk.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(getSellerByIdThunk.fulfilled, (state, action) => {
            state.seller = {
                ...state.seller,
                ...(action.payload as SellerResponse),
            };
            state.status = "succeeded";
            state.error = null;
        });
        builder.addCase(getSellerByIdThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || 'Lỗi khi tải thông tin Sellers';
        });

        // CREATE SELLER
        builder.addCase(createSellerThunk.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(createSellerThunk.fulfilled, (state, action) => {
            state.sellers.push(action.payload as SellerResponse);
            console.log(action.payload);
            state.status = "succeeded";
            state.error = null;
            state.seller = innerValue; // Reset form
        });
        builder.addCase(createSellerThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || 'Lỗi khi tạo Sellers';
        });

        // UPDATE SELLER
        builder.addCase(updateSellerThunk.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(updateSellerThunk.fulfilled, (state, action) => {
            const updated = action.payload as SellerResponse;
            state.sellers = state.sellers.map((item) => 
                item.id === updated.id ? updated : item
            );
            state.seller = innerValue; // Reset form
            state.isEditing = false;
            state.status = "succeeded";
            state.error = null;
        });
        builder.addCase(updateSellerThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || 'Lỗi khi cập nhật Sellers';
        });

        // DELETE Seller
        builder.addCase(deleteSellerThunk.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(deleteSellerThunk.fulfilled, (state, action) => {
            state.sellers = state.sellers.filter((item) => item.id !== (action.payload as number));
            state.status = "succeeded";
            state.error = null;
        });
        builder.addCase(deleteSellerThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || 'Lỗi khi xóa Sellers';
        });

        // GET Sellers BY PRODUCT
        builder.addCase(getSellersByProductThunk.pending, (state) => {
            state.status = "loading";
            state.error = null;
        });
        builder.addCase(getSellersByProductThunk.fulfilled, (state, action) => {
            state.sellers = action.payload as SellerResponse[];
            state.status = "succeeded";
            state.error = null;
        });
        builder.addCase(getSellersByProductThunk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload || 'Lỗi khi tải danh sách Sellers';
        });
    }
});

export const { 
    setSearchKeyword, 
    handleChange, 
    setSeller, 
    resetSeller, 
    setEditingMode, 
    clearError 
} = sellerSlice.actions;
export default sellerSlice.reducer;