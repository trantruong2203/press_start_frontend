import { createSlice } from "@reduxjs/toolkit";
import { getAllAccountPoolThunk, getAccountPoolByIdThunk, createAccountPoolThunk, updateAccountPoolThunk, deleteAccountPoolThunk } from "./AccountPoolThunks";
import type { AccountPoolResponse } from "../../interface/AccountPoolResponse";

interface AccountPoolState {
    accountPools: AccountPoolResponse[];
    accountPool: {
        id?: number;
        product_id: number;
        order_item_id: number;
        username: string;
        password: string;
        delivered: boolean;
        status: boolean;
        created_at: string;
    };
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    searchKeyword: string;
    isEditing: boolean;
}

const innerValue = {
    product_id: 0,
    order_item_id: 0,
    username: "",
    password: "",
    delivered: false,
    status: true,
    created_at: "",
};

const accountPoolSlice = createSlice({
    name: "accountPool",
    initialState: {
        accountPools: [],
        accountPool: innerValue,
        status: "idle",
        error: null,
        searchKeyword: "",
        isEditing: false,
    } as AccountPoolState,
    reducers: {
        setSearchKeyword: (state, action) => {
            state.searchKeyword = action.payload;
        },
        handleChange: (state, action) => {
            state.accountPool = {
                ...state.accountPool,
                ...action.payload,
            };
        },
        setAccountPool: (state, action) => {
            state.accountPool = {
                ...state.accountPool,
                ...action.payload,
            };
        }
    },
    extraReducers: (builder) => {
        builder
            // GET ALL ACCOUNT POOL
            .addCase(getAllAccountPoolThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllAccountPoolThunk.fulfilled, (state, action) => {
                state.accountPools = action.payload as AccountPoolResponse[];
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(getAllAccountPoolThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || null;
            })

            // GET KEY POOL BY ID
            .addCase(getAccountPoolByIdThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getAccountPoolByIdThunk.fulfilled, (state, action) => {
                state.accountPool = {
                    ...state.accountPool,
                    ...action.payload,
                };
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(getAccountPoolByIdThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || null;
            })

            // CREATE KEY POOL
            .addCase(createAccountPoolThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })  
            .addCase(createAccountPoolThunk.fulfilled, (state, action) => {
                state.accountPools.push(action.payload as AccountPoolResponse);
                state.status = "succeeded";
                state.error = null;
                state.accountPool = innerValue;
            })
            .addCase(createAccountPoolThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || null;
            })

            // UPDATE KEY POOL
            .addCase(updateAccountPoolThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateAccountPoolThunk.fulfilled, (state, action) => {
                state.accountPools = state.accountPools.map((item) => 
                    item.id === action.payload.id ? action.payload : item
                );
                state.accountPool = innerValue;
                state.isEditing = false;
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(updateAccountPoolThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || null;
            })

            // DELETE KEY POOL
            .addCase(deleteAccountPoolThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteAccountPoolThunk.fulfilled, (state, action) => {
                state.accountPools = state.accountPools.filter((item) => item.id !== action.payload.id);
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(deleteAccountPoolThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || null;
            });
    }
});

export const { setSearchKeyword, handleChange, setAccountPool } = accountPoolSlice.actions;
export default accountPoolSlice.reducer;