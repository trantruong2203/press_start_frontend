import { createSlice } from "@reduxjs/toolkit";
import { getAllKeyPoolThunk, getKeyPoolByIdThunk, createKeyPoolThunk, updateKeyPoolThunk, deleteKeyPoolThunk } from "./KeyPoolThunks";
import type { KeyPoolResponse } from "../../interface/KeyPoolResponse";

interface KeyPoolState {
    keyPools: KeyPoolResponse[];
    keyPool: {
        id?: number;
        product_id: number;
        order_item_id: number;
        key_code: string;
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
    key_code: "",
    delivered: false,
    status: true,
    created_at: "",
};

const keyPoolSlice = createSlice({
    name: "keyPool",
    initialState: {
        keyPools: [],
        keyPool: innerValue,
        status: "idle",
        error: null,
        searchKeyword: "",
        isEditing: false,
    } as KeyPoolState,
    reducers: {
        setSearchKeyword: (state, action) => {
            state.searchKeyword = action.payload;
        },
        handleChange: (state, action) => {
            state.keyPool = {
                ...state.keyPool,
                ...action.payload,
            };
        },
        setKeyPool: (state, action) => {
            state.keyPool = {
                ...state.keyPool,
                ...action.payload,
            };
        }
    },
    extraReducers: (builder) => {
        builder
            // GET ALL KEY POOL
            .addCase(getAllKeyPoolThunk.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllKeyPoolThunk.fulfilled, (state, action) => {
                state.keyPools = action.payload as KeyPoolResponse[];
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(getAllKeyPoolThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || null;
            })

            // GET KEY POOL BY ID
            .addCase(getKeyPoolByIdThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(getKeyPoolByIdThunk.fulfilled, (state, action) => {
                state.keyPool = {
                    ...state.keyPool,
                    ...action.payload,
                };
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(getKeyPoolByIdThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || null;
            })

            // CREATE KEY POOL
            .addCase(createKeyPoolThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })  
            .addCase(createKeyPoolThunk.fulfilled, (state, action) => {
                state.keyPools.push(action.payload as KeyPoolResponse);
                state.status = "succeeded";
                state.error = null;
                state.keyPool = innerValue;
            })
            .addCase(createKeyPoolThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || null;
            })

            // UPDATE KEY POOL
            .addCase(updateKeyPoolThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateKeyPoolThunk.fulfilled, (state, action) => {
                state.keyPools = state.keyPools.map((item) => 
                    item.id === action.payload.id ? action.payload : item
                );
                state.keyPool = innerValue;
                state.isEditing = false;
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(updateKeyPoolThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || null;
            })

            // DELETE KEY POOL
            .addCase(deleteKeyPoolThunk.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(deleteKeyPoolThunk.fulfilled, (state, action) => {
                state.keyPools = state.keyPools.filter((item) => item.id !== action.payload.id);
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(deleteKeyPoolThunk.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string || null;
            });
    }
});

export const { setSearchKeyword, handleChange, setKeyPool } = keyPoolSlice.actions;
export default keyPoolSlice.reducer;