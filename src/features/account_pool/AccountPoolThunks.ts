import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllAccountPool, getAccountPoolById, createAccountPool, updateAccountPool, deleteAccountPool } from "./AccountPoolApi";
import type { CreateAccountPoolRequest, AccountPoolResponse } from "../../interface/AccountPoolResponse";
import { handleApiError } from "../../utils/errorHandler";

export const getAllAccountPoolThunk = createAsyncThunk<AccountPoolResponse[], void, { rejectValue: string }>(
    "accountPool/getAllAccountPool",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllAccountPool();
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const getAccountPoolByIdThunk = createAsyncThunk<AccountPoolResponse, number, { rejectValue: string }>(
    "accountPool/getAccountPoolById",
    async (id, { rejectWithValue }) => {
        try {
            const response = await getAccountPoolById(id);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const createAccountPoolThunk = createAsyncThunk<AccountPoolResponse, CreateAccountPoolRequest, { rejectValue: string }>(
    "accountPool/createAccountPool",
    async (accountPool, { rejectWithValue }) => {
        try {
            const response = await createAccountPool(accountPool);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const updateAccountPoolThunk = createAsyncThunk<AccountPoolResponse, { id: number, accountPool: CreateAccountPoolRequest }, { rejectValue: string }>(
    "accountPool/updateAccountPool",
    async ({ id, accountPool }, { rejectWithValue }) => {
        try {
            const response = await updateAccountPool(id, accountPool);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);

export const deleteAccountPoolThunk = createAsyncThunk<AccountPoolResponse, number, { rejectValue: string }>(
    "accountPool/deleteAccountPool",
    async (id, { rejectWithValue }) => {
        try {
            const response = await deleteAccountPool(id);
            return response;
        } catch (err: unknown) {
            return rejectWithValue(handleApiError(err));
        }
    }
);