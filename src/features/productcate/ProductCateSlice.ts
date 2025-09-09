import { createSlice } from '@reduxjs/toolkit';
import { createProductCateThunk, getProductCateByIdThunk, updateProductCateThunk, getProductCateThunk } from './ProductCateThunks';
import type { ProductCateResponse } from '../../interface/ProductCateResponse';


interface ProductCateState {
    productCates: ProductCateResponse[];
    productCate: {
        productId: number;
        categoryId: number;
    };
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    searchKeyword: string;
}

const innerValue = {
    productId: 0,
    categoryId: 0,
};

const productCateSlice = createSlice({
    name: 'product-cate',
    initialState: {
        productCates: [] as ProductCateResponse[],
        productCate: innerValue,
        status: 'idle',
        error: null as string | null,
        searchKeyword: '',
    } as ProductCateState,
    reducers: {
        setSearchKeyword: (state, action) => {
            state.searchKeyword = action.payload;
        },
        handleChange: (state, action) => {
            state.productCate = action.payload;
        },
        setProductCate: (state, action) => {
            state.productCate = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // GET
            .addCase(getProductCateThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getProductCateThunk.fulfilled, (state, action) => {
                state.productCates = action.payload as ProductCateResponse[];
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(getProductCateThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string || null;
            })

            // CREATE
            .addCase(createProductCateThunk.fulfilled, (state, action) => {
                if (action.payload) {
                    state.productCates.push(action.payload as ProductCateResponse);
                }
                state.error = null;
            })
            .addCase(createProductCateThunk.rejected, (state, action) => {
                state.error = action.payload as string || null;
            })

            // GET BY ID
            .addCase(getProductCateByIdThunk.fulfilled, (state, action) => {
                state.productCate = action.payload as unknown as { productId: number, categoryId: number };
                state.error = null;
            })
            .addCase(getProductCateByIdThunk.rejected, (state, action) => {
                state.error = action.payload as string || null;
            })

            // UPDATE
            .addCase(updateProductCateThunk.fulfilled, (state, action) => {
                const index = state.productCates.findIndex(
                    (productCate) => productCate.id === action.payload.id
                );
                if (index !== -1) {
                    state.productCates[index] = action.payload;
                }
                state.error = null;
            })

            .addCase(updateProductCateThunk.rejected, (state, action) => {
                state.error = action.payload as string || null;
            })

    },
});

export const { setSearchKeyword, handleChange, setProductCate } = productCateSlice.actions;
export default productCateSlice.reducer;       