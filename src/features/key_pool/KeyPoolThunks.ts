import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllKeyPool, getKeyPoolById, createKeyPool, updateKeyPool, deleteKeyPool } from "./KeyPoolApi";
import type { CreateKeyPoolRequest, KeyPoolResponse } from "../../interface/KeyPoolResponse";
import { handleApiError } from "../../utils/errorHandler";

export const getAllKeyPoolThunk = createAsyncThunk<KeyPoolResponse[], void, { rejectValue: string }>(
    "keyPool/getAllKeyPool",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllKeyPool();
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const getKeyPoolByIdThunk = createAsyncThunk<KeyPoolResponse, number, { rejectValue: string }>(
    "keyPool/getKeyPoolById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await getKeyPoolById(id);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const createKeyPoolThunk = createAsyncThunk<KeyPoolResponse, CreateKeyPoolRequest, { rejectValue: string }>(
    "keyPool/createKeyPool",
    async (keyPool, { rejectWithValue }) => {
        try {
            const response = await createKeyPool(keyPool);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const updateKeyPoolThunk = createAsyncThunk<KeyPoolResponse, { id: number, keyPool: CreateKeyPoolRequest }, { rejectValue: string }>(
    "keyPool/updateKeyPool",
    async ({ id, keyPool }, { rejectWithValue }) => {
        try {
            const response = await updateKeyPool(id, keyPool);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const deleteKeyPoolThunk = createAsyncThunk<KeyPoolResponse, number, { rejectValue: string }>(
    "keyPool/deleteKeyPool",
    async (id, { rejectWithValue }) => {
        try {
            const response = await deleteKeyPool(id);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);